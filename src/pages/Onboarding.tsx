import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Target, Calendar, CreditCard, Check, Flame, Dumbbell, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveUser, addMonths, getPlanMonths, type AuthUser } from "@/lib/auth";

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ gender: "", goal: "", days: "", plan: "" });
  const navigate = useNavigate();
  const totalSteps = 5;

  const Card = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick}
      className={`p-5 rounded-xl border-2 transition-all text-center w-full ${selected ? "border-neon bg-neon/10 glow scale-105" : "border-border surface-1 hover:border-neon/50 hover:scale-102"}`}>
      {children}
    </button>
  );

  const finish = () => {
    const temp = JSON.parse(localStorage.getItem("trainx7_signup_temp") || "{}");
    const now = new Date();
    const months = getPlanMonths(data.plan);
    const user: AuthUser = {
      id: temp.id || crypto.randomUUID(),
      name: temp.name || "Athlete",
      email: temp.email || "user@trainx7.com",
      gender: data.gender as "male" | "female",
      goal: data.goal as "lose" | "build" | "fit",
      days: data.days,
      plan: data.plan as "1m" | "2m" | "3m" | "12m",
      planStart: now.toISOString(),
      planEnd: addMonths(now, months).toISOString(),
    };
    saveUser(user);
    localStorage.removeItem("trainx7_signup_temp");
    navigate("/dashboard");
  };

  const plans = [
    { value: "1m", label: "1 Month", price: "$49", badge: null, desc: "Try it out" },
    { value: "2m", label: "2 Months", price: "$89", badge: "Popular", desc: "Most chosen" },
    { value: "3m", label: "3 Months", price: "$119", badge: null, desc: "Great value" },
    { value: "12m", label: "12 Months", price: "$399", badge: "Best Value", desc: "Save 33%" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <span className="text-3xl font-black text-neon glow-text">TrainX7</span>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{Math.round(((step + 1) / totalSteps) * 100)}% complete</span>
            </div>
            <Progress value={((step + 1) / totalSteps) * 100} className="h-2 bg-muted [&>div]:bg-neon" />
          </div>
        </div>

        {/* Step 0 — Gender */}
        {step === 0 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">What's your gender?</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">We'll tailor your program accordingly</p>
            <div className="grid grid-cols-2 gap-4">
              <Card selected={data.gender === "male"} onClick={() => setData({ ...data, gender: "male" })}>
                <div className="text-4xl mb-3">👨</div>
                <div className={`font-bold text-lg ${data.gender === "male" ? "text-neon" : "text-foreground"}`}>Male</div>
              </Card>
              <Card selected={data.gender === "female"} onClick={() => setData({ ...data, gender: "female" })}>
                <div className="text-4xl mb-3">👩</div>
                <div className={`font-bold text-lg ${data.gender === "female" ? "text-neon" : "text-foreground"}`}>Female</div>
              </Card>
            </div>
          </div>
        )}

        {/* Step 1 — Goal */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">What's your goal?</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Your plan will be fully customized around this</p>
            <div className="space-y-3">
              {[
                { value: "lose", label: "Lose Weight", subtext: "Burn fat, improve cardio & body composition", icon: Flame, emoji: "🔥" },
                { value: "build", label: "Build Muscle", subtext: "Hypertrophy-focused strength training", icon: Dumbbell, emoji: "💪" },
                { value: "fit", label: "Stay Fit", subtext: "Balanced fitness, energy & health", icon: Zap, emoji: "⚡" },
              ].map(g => (
                <Card key={g.value} selected={data.goal === g.value} onClick={() => setData({ ...data, goal: g.value })}>
                  <div className="flex items-center gap-4 text-left">
                    <div className="text-3xl">{g.emoji}</div>
                    <div>
                      <div className={`font-bold ${data.goal === g.value ? "text-neon" : "text-foreground"}`}>{g.label}</div>
                      <div className="text-xs text-muted-foreground">{g.subtext}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Training Days */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">How many days per week?</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Be realistic — consistency beats intensity</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { v: "3", label: "3 Days", sub: "Beginner" },
                { v: "4", label: "4 Days", sub: "Intermediate" },
                { v: "5", label: "5 Days", sub: "Advanced" },
                { v: "6", label: "6 Days", sub: "Athlete" },
              ].map(d => (
                <Card key={d.v} selected={data.days === d.v} onClick={() => setData({ ...data, days: d.v })}>
                  <div className={`text-3xl font-black ${data.days === d.v ? "text-neon" : "text-foreground"}`}>{d.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{d.sub}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Plan */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Choose your plan</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Longer plans = better results & more savings</p>
            <div className="grid grid-cols-2 gap-3">
              {plans.map(p => (
                <div key={p.value} className="relative">
                  {p.badge && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-neon text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full z-10">
                      {p.badge}
                    </div>
                  )}
                  <Card selected={data.plan === p.value} onClick={() => setData({ ...data, plan: p.value })}>
                    <div className={`font-bold ${data.plan === p.value ? "text-neon" : "text-foreground"}`}>{p.label}</div>
                    <div className={`text-2xl font-black mt-1 ${data.plan === p.value ? "text-neon" : "text-muted-foreground"}`}>{p.price}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Payment */}
        {step === 4 && (
          <div className="animate-fade-in-up text-center">
            <div className="w-20 h-20 rounded-full bg-neon/10 border-2 border-neon flex items-center justify-center mx-auto mb-6">
              <CreditCard className="text-neon" size={36} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete Payment</h2>
            <p className="text-muted-foreground mb-6 text-sm">Stripe integration — secure checkout</p>
            <div className="surface-1 border border-border rounded-lg p-5 text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan</span><span className="text-foreground font-semibold">{plans.find(p => p.value === data.plan)?.label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Goal</span><span className="text-foreground font-semibold capitalize">{data.goal === "lose" ? "Lose Weight" : data.goal === "build" ? "Build Muscle" : "Stay Fit"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Training days</span><span className="text-foreground font-semibold">{data.days}x/week</span></div>
              <div className="border-t border-border pt-3 flex justify-between"><span className="font-bold text-foreground">Total</span><span className="font-black text-neon text-lg">{plans.find(p => p.value === data.plan)?.price}</span></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center"><Check size={12} className="text-neon" />256-bit SSL encryption</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center"><Check size={12} className="text-neon" />Cancel anytime</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 gap-4">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-muted-foreground hover:text-foreground">← Back</Button>
          ) : <div />}
          <Button
            onClick={() => step < totalSteps - 1 ? setStep(step + 1) : finish()}
            className="bg-neon text-primary-foreground hover:bg-neon/90 glow font-bold px-8"
            disabled={(step === 0 && !data.gender) || (step === 1 && !data.goal) || (step === 2 && !data.days) || (step === 3 && !data.plan)}
          >
            {step < totalSteps - 1 ? "Continue →" : "Start Training 🚀"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Onboarding;
