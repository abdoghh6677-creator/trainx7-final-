import { useState, useEffect, useCallback } from "react";
import { Dumbbell, BookOpen, Apple, TrendingUp, ClipboardList, LogOut, Menu, Search, Check, Plus, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchExercises, fetchByBodyPart, searchExercises, getMockExercises, type Exercise } from "@/lib/exerciseDB";
import { searchFood, calcMacros, getAllCommonFoods, type FoodItem } from "@/lib/nutrition";
import { generatePlan, planMonthsMap, type WorkoutExercise } from "@/lib/workoutPlans";

const tabs = [
  { id: "workout",   label: "Today's Workout", icon: Dumbbell },
  { id: "library",  label: "Exercise Library", icon: BookOpen },
  { id: "nutrition",label: "Nutrition",        icon: Apple },
  { id: "progress", label: "Progress",         icon: TrendingUp },
  { id: "plan",     label: "My Plan",          icon: ClipboardList },
];

const bodyParts = ["all", "chest", "back", "shoulders", "upper arms", "upper legs", "waist", "cardio"];

// Get user data from localStorage (set during onboarding)
const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("trainx7_user") || "{}");
  } catch { return {}; }
};

const Dashboard = () => {
  const [activeTab, setActiveTab]       = useState("workout");
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const user = getUserData();

  // ── Workout Tab
  const [exercises, setExercises]       = useState<(WorkoutExercise & { completed: boolean; gifUrl?: string })[]>([]);
  const [expandedEx, setExpandedEx]     = useState<number | null>(null);

  // ── Library Tab
  const [libExercises, setLibExercises] = useState<Exercise[]>([]);
  const [libLoading, setLibLoading]     = useState(false);
  const [libSearch, setLibSearch]       = useState("");
  const [libFilter, setLibFilter]       = useState("all");
  const [selectedEx, setSelectedEx]     = useState<Exercise | null>(null);

  // ── Nutrition Tab
  const [mealSearch, setMealSearch]     = useState("");
  const [foodResults, setFoodResults]   = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [grams, setGrams]               = useState("");
  const [meals, setMeals]               = useState<{ name: string; grams: number; cal: number; protein: number; carbs: number; fat: number }[]>([]);
  const [searching, setSearching]       = useState(false);
  const targets = { cal: user.goal === "lose" ? 1800 : user.goal === "build" ? 3000 : 2200, protein: user.goal === "build" ? 180 : 130, carbs: user.goal === "lose" ? 150 : 280, fat: 70 };

  // ── Progress Tab
  const [progressTab, setProgressTab]   = useState("daily");
  const [dailyLog, setDailyLog]         = useState({ weight: "", chest: "", waist: "", arms: "" });
  const [progressHistory, setProgressHistory] = useState<{ date: string; weight: number }[]>(() => {
    const saved = localStorage.getItem("trainx7_progress");
    if (saved) return JSON.parse(saved);
    return Array.from({ length: 14 }, (_, i) => ({ date: `Day ${i + 1}`, weight: 82 - i * 0.15 + Math.random() * 0.3 }));
  });

  // ── Plan Tab
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);

  // Generate today's workout on mount
  useEffect(() => {
    const goal = user.goal || "fit";
    const days = parseInt(user.days) || 3;
    const plan = generatePlan(goal, days, 1);
    const dayIndex = new Date().getDay() % days;
    const todayDay = plan[0]?.days[dayIndex];
    if (todayDay) {
      setExercises(todayDay.exercises.map(ex => ({ ...ex, completed: false })));
    }
  }, []);

  // Load exercise library
  useEffect(() => {
    if (activeTab !== "library") return;
    setLibLoading(true);
    fetchExercises(24).then(data => { setLibExercises(data); setLibLoading(false); }).catch(() => { setLibExercises(getMockExercises()); setLibLoading(false); });
  }, [activeTab]);

  // Filter library by body part
  const handleLibFilter = async (part: string) => {
    setLibFilter(part);
    setLibLoading(true);
    const data = await fetchByBodyPart(part);
    setLibExercises(data);
    setLibLoading(false);
  };

  // Search library
  const handleLibSearch = useCallback(async (q: string) => {
    setLibSearch(q);
    if (!q) { fetchExercises(24).then(setLibExercises); return; }
    setLibLoading(true);
    const data = await searchExercises(q);
    setLibExercises(data);
    setLibLoading(false);
  }, []);

  // Search food
  const handleFoodSearch = async () => {
    if (!mealSearch) return;
    setSearching(true);
    const results = await searchFood(mealSearch);
    setFoodResults(results.length ? results : getAllCommonFoods().filter(f => f.name.toLowerCase().includes(mealSearch.toLowerCase())));
    setSearching(false);
  };

  const addMeal = () => {
    if (!selectedFood || !grams) return;
    const g = parseFloat(grams);
    const macros = calcMacros(selectedFood, g);
    setMeals(prev => [...prev, { name: selectedFood.name, grams: g, ...macros }]);
    setSelectedFood(null); setGrams(""); setMealSearch(""); setFoodResults([]);
  };

  const totalMacros = meals.reduce((a, m) => ({ cal: a.cal + m.cal, protein: a.protein + m.protein, carbs: a.carbs + m.carbs, fat: a.fat + m.fat }), { cal: 0, protein: 0, carbs: 0, fat: 0 });

  // Save progress
  const saveProgress = () => {
    if (!dailyLog.weight) return;
    const entry = { date: new Date().toLocaleDateString(), weight: parseFloat(dailyLog.weight) };
    const updated = [...progressHistory, entry];
    setProgressHistory(updated);
    localStorage.setItem("trainx7_progress", JSON.stringify(updated));
    setDailyLog({ weight: "", chest: "", waist: "", arms: "" });
  };

  const weeklyData  = progressHistory.slice(-7).map((p, i) => ({ day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i] || `D${i+1}`, weight: p.weight }));
  const monthlyData = progressHistory.slice(-30).map((p, i) => ({ day: i + 1, weight: p.weight }));

  const completed = exercises.filter(e => e.completed).length;

  // Generate full plan
  const fullPlan = generatePlan(user.goal || "fit", parseInt(user.days) || 3, planMonthsMap[user.plan] || 1);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="text-2xl font-black text-neon glow-text">TrainX7</Link>
          {user.name && <p className="text-xs text-muted-foreground mt-1">Welcome, {user.name}</p>}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-neon/10 text-neon border border-neon/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              <tab.icon size={18} />{tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link to="/"><Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground"><LogOut size={18} className="mr-3" />Log Out</Button></Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-background/80 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b border-border flex items-center px-4 lg:px-8 bg-card sticky top-0 z-30">
          <button className="lg:hidden mr-4 text-foreground" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
          <h1 className="text-lg font-bold text-foreground">{tabs.find(t => t.id === activeTab)?.label}</h1>
          {activeTab === "workout" && (
            <span className="ml-auto text-sm text-neon font-semibold">{completed}/{exercises.length} done</span>
          )}
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-auto">

          {/* ══ TODAY'S WORKOUT ══ */}
          {activeTab === "workout" && (
            <div className="space-y-4 max-w-2xl">
              <div className="surface-1 border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Today's Progress</span>
                  <span className="text-sm text-neon font-semibold">{completed}/{exercises.length} exercises</span>
                </div>
                <Progress value={exercises.length ? (completed / exercises.length) * 100 : 0} className="h-2 bg-muted [&>div]:bg-neon" />
              </div>

              {exercises.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Dumbbell size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No workout scheduled. Complete onboarding to get your plan.</p>
                  <Link to="/onboarding"><Button className="mt-4 bg-neon text-primary-foreground">Start Onboarding</Button></Link>
                </div>
              )}

              {exercises.map((ex, i) => (
                <div key={i} className={`surface-1 border rounded-lg overflow-hidden transition-all ${ex.completed ? "border-neon/40 bg-neon/5" : "border-border"}`}>
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {ex.gifUrl ? (
                        <img src={ex.gifUrl} alt={ex.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <Dumbbell size={24} className="text-neon mx-auto mb-1" />
                          <span className="text-xs text-muted-foreground">GIF</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${ex.completed ? "text-neon" : "text-foreground"}`}>{ex.name}</h3>
                      <p className="text-sm text-muted-foreground">{ex.sets} sets × {ex.reps} reps · Rest {ex.rest}</p>
                      <p className="text-xs text-neon/60 capitalize">{ex.bodyPart}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setExpandedEx(expandedEx === i ? null : i)} className="text-muted-foreground hover:text-foreground">
                        {expandedEx === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <Button size="sm" onClick={() => { const u = [...exercises]; u[i].completed = !u[i].completed; setExercises(u); }}
                        className={ex.completed ? "bg-neon text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
                        {ex.completed ? <><Check size={14} className="mr-1" />Done</> : "Mark Done"}
                      </Button>
                    </div>
                  </div>
                  {expandedEx === i && (
                    <div className="px-4 pb-4 border-t border-border/50 pt-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">HOW TO DO IT:</p>
                      <ol className="space-y-1">
                        {["Position yourself correctly", "Control the movement", "Breathe out on exertion", "Complete all reps with good form"].map((s, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex gap-2"><span className="text-neon font-bold">{j + 1}.</span>{s}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}

              {completed === exercises.length && exercises.length > 0 && (
                <div className="surface-1 border border-neon/30 rounded-lg p-6 text-center glow">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-neon mb-2">Workout Complete!</h3>
                  <p className="text-sm text-muted-foreground">Great job! You crushed today's session.</p>
                </div>
              )}
            </div>
          )}

          {/* ══ EXERCISE LIBRARY ══ */}
          {activeTab === "library" && (
            <div>
              {selectedEx ? (
                <div className="max-w-2xl">
                  <button onClick={() => setSelectedEx(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
                    <X size={16} /> Back to library
                  </button>
                  <div className="surface-1 border border-border rounded-xl overflow-hidden">
                    <div className="h-64 bg-muted flex items-center justify-center">
                      {selectedEx.gifUrl && selectedEx.gifUrl.includes('http') ? (
                        <img src={selectedEx.gifUrl} alt={selectedEx.name} className="h-full object-contain" />
                      ) : (
                        <div className="text-center"><Dumbbell size={64} className="text-neon mx-auto mb-2" /><p className="text-muted-foreground text-sm">Exercise Demo</p></div>
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2 capitalize">{selectedEx.name}</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-neon/10 text-neon px-3 py-1 rounded-full capitalize">{selectedEx.bodyPart}</span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full capitalize">{selectedEx.equipment}</span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full capitalize">Target: {selectedEx.target}</span>
                      </div>
                      {selectedEx.secondaryMuscles?.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">SECONDARY MUSCLES</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedEx.secondaryMuscles.map(m => <span key={m} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded capitalize">{m}</span>)}
                          </div>
                        </div>
                      )}
                      {selectedEx.instructions?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-3">INSTRUCTIONS</p>
                          <ol className="space-y-2">
                            {selectedEx.instructions.map((inst, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                <span className="text-neon font-bold flex-shrink-0">{i + 1}.</span>{inst}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1 max-w-sm">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search exercises..." value={libSearch}
                        onChange={e => handleLibSearch(e.target.value)}
                        className="pl-9 bg-card border-border text-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {bodyParts.map(bp => (
                      <button key={bp} onClick={() => handleLibFilter(bp)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${libFilter === bp ? "bg-neon text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-neon/20 hover:text-neon"}`}>
                        {bp}
                      </button>
                    ))}
                  </div>
                  {libLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {Array.from({ length: 8 }).map((_, i) => <div key={i} className="surface-1 border border-border rounded-lg h-52 animate-pulse" />)}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {libExercises.map(ex => (
                        <button key={ex.id} onClick={() => setSelectedEx(ex)}
                          className="surface-1 border border-border rounded-lg overflow-hidden hover:border-neon/50 transition-all text-left group">
                          <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                            {ex.gifUrl && ex.gifUrl.includes('http') ? (
                              <img src={ex.gifUrl} alt={ex.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            ) : (
                              <div className="text-center"><Dumbbell size={32} className="text-neon mx-auto mb-2" /><p className="text-xs text-muted-foreground">View Exercise</p></div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-semibold text-foreground text-sm capitalize leading-tight mb-1">{ex.name}</h3>
                            <p className="text-xs text-neon capitalize">{ex.bodyPart}</p>
                            <p className="text-xs text-muted-foreground capitalize">{ex.equipment}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {libExercises.length === 0 && !libLoading && (
                    <div className="text-center py-12 text-muted-foreground"><Search size={48} className="mx-auto mb-4 opacity-30" /><p>No exercises found. Try a different search.</p></div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ NUTRITION TRACKER ══ */}
          {activeTab === "nutrition" && (
            <div className="max-w-2xl space-y-6">
              {/* Macro targets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Calories", value: totalMacros.cal, target: targets.cal, unit: "kcal" },
                  { label: "Protein",  value: totalMacros.protein, target: targets.protein, unit: "g" },
                  { label: "Carbs",    value: totalMacros.carbs,   target: targets.carbs,   unit: "g" },
                  { label: "Fat",      value: totalMacros.fat,     target: targets.fat,     unit: "g" },
                ].map(m => (
                  <div key={m.label} className="surface-1 border border-border rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
                    <div className="text-xl font-bold text-foreground">{m.value}<span className="text-xs text-muted-foreground ml-1">{m.unit}</span></div>
                    <div className="text-xs text-muted-foreground mb-2">/ {m.target}{m.unit}</div>
                    <Progress value={Math.min((m.value / m.target) * 100, 100)} className="h-1 bg-muted [&>div]:bg-neon" />
                  </div>
                ))}
              </div>

              {/* Food search */}
              <div className="surface-1 border border-border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Add Food</h3>
                <div className="flex gap-2">
                  <Input placeholder="Search food (e.g. chicken breast)" value={mealSearch}
                    onChange={e => setMealSearch(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleFoodSearch()}
                    className="bg-card border-border text-foreground flex-1" />
                  <Button onClick={handleFoodSearch} className="bg-neon text-primary-foreground hover:bg-neon/90" disabled={searching}>
                    {searching ? "..." : <Search size={16} />}
                  </Button>
                </div>

                {foodResults.length > 0 && !selectedFood && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {foodResults.map((f, i) => (
                      <button key={i} onClick={() => setSelectedFood(f)}
                        className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-neon/10 hover:border-neon border border-transparent transition-all">
                        <div className="font-medium text-foreground text-sm">{f.name}</div>
                        <div className="text-xs text-muted-foreground">{f.calories_per_100g} kcal · {f.protein_per_100g}p · {f.carbs_per_100g}c · {f.fat_per_100g}f per 100g</div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedFood && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-neon/10 border border-neon/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground text-sm">{selectedFood.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedFood.calories_per_100g} kcal per 100g</p>
                      </div>
                      <button onClick={() => setSelectedFood(null)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
                    </div>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Grams" value={grams} onChange={e => setGrams(e.target.value)}
                        className="bg-card border-border text-foreground w-32" />
                      {grams && (
                        <div className="flex-1 text-xs text-muted-foreground flex items-center gap-3">
                          {(() => { const m = calcMacros(selectedFood, parseFloat(grams)); return (<><span className="text-neon">{m.calories} kcal</span><span>{m.protein}p</span><span>{m.carbs}c</span><span>{m.fat}f</span></>); })()}
                        </div>
                      )}
                    </div>
                    <Button onClick={addMeal} className="bg-neon text-primary-foreground hover:bg-neon/90 w-full" disabled={!grams}>
                      <Plus size={16} className="mr-2" /> Add to Log
                    </Button>
                  </div>
                )}
              </div>

              {/* Meal log */}
              {meals.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Today's Meals</h3>
                  {meals.map((m, i) => (
                    <div key={i} className="surface-1 border border-border rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <span className="text-foreground font-medium text-sm">{m.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{m.grams}g</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="text-neon font-semibold">{m.cal} kcal</span>
                        <span>{m.protein}p</span><span>{m.carbs}c</span><span>{m.fat}f</span>
                        <button onClick={() => setMeals(meals.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-400"><X size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ PROGRESS TRACKER ══ */}
          {activeTab === "progress" && (
            <div className="max-w-3xl space-y-6">
              <div className="flex gap-2 flex-wrap">
                {["daily", "weekly", "monthly"].map(t => (
                  <Button key={t} size="sm" onClick={() => setProgressTab(t)}
                    className={progressTab === t ? "bg-neon text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Button>
                ))}
              </div>

              {progressTab === "daily" && (
                <div className="surface-1 border border-border rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Log Today's Measurements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Weight (kg)", key: "weight" },
                      { label: "Chest (cm)",  key: "chest" },
                      { label: "Waist (cm)",  key: "waist" },
                      { label: "Arms (cm)",   key: "arms" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                        <Input type="number" value={dailyLog[f.key as keyof typeof dailyLog]}
                          onChange={e => setDailyLog(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="bg-card border-border text-foreground" />
                      </div>
                    ))}
                  </div>
                  <Button onClick={saveProgress} className="bg-neon text-primary-foreground hover:bg-neon/90 font-semibold">Save Progress</Button>
                  {progressHistory.length > 0 && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground mb-2">Latest: {progressHistory[progressHistory.length - 1]?.weight} kg</p>
                      {progressHistory.length > 1 && (
                        <p className="text-xs text-neon">
                          {progressHistory[progressHistory.length - 1].weight < progressHistory[0].weight ? "📉 " : "📈 "}
                          {Math.abs(progressHistory[progressHistory.length - 1].weight - progressHistory[0].weight).toFixed(1)} kg since start
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {progressTab === "weekly" && (
                <div className="surface-1 border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Weekly Weight</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
                      <XAxis dataKey="day" stroke="hsl(0 0% 64%)" />
                      <YAxis stroke="hsl(0 0% 64%)" domain={["dataMin - 1", "dataMax + 1"]} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 7%)", border: "1px solid hsl(0 0% 18%)", color: "#fff" }} />
                      <Bar dataKey="weight" fill="hsl(153 100% 50%)" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {progressTab === "monthly" && (
                <div className="surface-1 border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Monthly Progress</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
                      <XAxis dataKey="day" stroke="hsl(0 0% 64%)" />
                      <YAxis stroke="hsl(0 0% 64%)" domain={["dataMin - 1", "dataMax + 1"]} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 7%)", border: "1px solid hsl(0 0% 18%)", color: "#fff" }} />
                      <Line type="monotone" dataKey="weight" stroke="hsl(153 100% 50%)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}

          {/* ══ MY PLAN ══ */}
          {activeTab === "plan" && (
            <div className="max-w-2xl space-y-4">
              <div className="surface-1 border border-neon/30 rounded-lg p-6 glow">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {user.plan === "1m" ? "Basic" : user.plan === "2m" ? "Standard" : user.plan === "3m" ? "Advanced" : "Elite"} Plan
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      Goal: {user.goal === "lose" ? "Lose Weight" : user.goal === "build" ? "Build Muscle" : "Stay Fit"} · {user.days} days/week
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-neon">
                      {user.plan === "1m" ? "$49" : user.plan === "2m" ? "$89" : user.plan === "3m" ? "$119" : "$399"}
                    </div>
                    <div className="text-xs text-muted-foreground">{planMonthsMap[user.plan] || 1} month(s)</div>
                  </div>
                </div>
              </div>

              {fullPlan.map((week, wi) => (
                <div key={wi} className="surface-1 border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedWeek(expandedWeek === wi ? null : wi)}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                    <h4 className="font-semibold text-foreground">Week {week.week}</h4>
                    {expandedWeek === wi ? <ChevronUp size={16} className="text-neon" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                  </button>
                  {expandedWeek === wi && (
                    <div className="px-4 pb-4 space-y-3 border-t border-border">
                      {week.days.map((day, di) => (
                        <div key={di} className="rounded-lg bg-secondary/30 p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground text-sm">{day.day}</span>
                            <span className="text-xs text-neon">{day.focus}</span>
                          </div>
                          <div className="space-y-1">
                            {day.exercises.map((ex, ei) => (
                              <div key={ei} className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{ex.name}</span>
                                <span className="text-foreground">{ex.sets}×{ex.reps}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
