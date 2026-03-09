import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const items = [
  { name: "Ahmed K.", age: 28, goal: "Lost 15 kg", duration: "2 months", category: "weight-loss", emoji: "🔥", stars: 5, quote: "Best decision of my life. The program was perfect." },
  { name: "Sara M.", age: 24, goal: "Gained 8 kg muscle", duration: "3 months", category: "muscle-gain", emoji: "💪", stars: 5, quote: "Finally got the body I always wanted. Thank you Coach!" },
  { name: "Omar R.", age: 35, goal: "Lost 22 kg", duration: "12 months", category: "weight-loss", emoji: "🔥", stars: 5, quote: "Life-changing. I'm a different person now." },
  { name: "Nour A.", age: 22, goal: "Gained 6 kg muscle", duration: "3 months", category: "muscle-gain", emoji: "💪", stars: 5, quote: "The nutrition tracker made everything so easy." },
  { name: "Layla H.", age: 30, goal: "Lost 12 kg", duration: "2 months", category: "weight-loss", emoji: "🔥", stars: 5, quote: "Never thought I could do it. TrainX7 proved me wrong." },
  { name: "Khaled S.", age: 27, goal: "Gained 10 kg muscle", duration: "6 months", category: "muscle-gain", emoji: "💪", stars: 5, quote: "Coach Mahmoud's program is elite-level coaching." },
];

const stats = [
  { value: "1000+", label: "Transformations" },
  { value: "98%", label: "Success Rate" },
  { value: "15 kg", label: "Avg. Fat Lost" },
  { value: "8 kg", label: "Avg. Muscle Gained" },
];

const filters = ["All", "Weight Loss", "Muscle Gain"];

const Transformations = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? items : items.filter(i =>
    filter === "Weight Loss" ? i.category === "weight-loss" : i.category === "muscle-gain"
  );

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
            Real <span className="text-neon">Results</span>
          </h1>
          <p className="text-muted-foreground text-center mb-10">These are real athletes, real programs, real transformations.</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {stats.map(s => (
              <div key={s.label} className="surface-1 border border-border rounded-lg p-5 text-center">
                <div className="text-3xl font-black text-neon mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {filters.map(f => (
              <Button key={f} size="sm" onClick={() => setFilter(f)}
                className={filter === f ? "bg-neon text-primary-foreground glow" : "bg-secondary text-secondary-foreground"}>
                {f}
              </Button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div key={item.name} className="surface-1 border border-border rounded-xl overflow-hidden hover:border-neon/40 transition-all group">
                {/* Before / After */}
                <div className="grid grid-cols-2 h-52 relative">
                  <div className="bg-muted/80 flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl opacity-40">👤</div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Before</span>
                  </div>
                  <div className="bg-neon/5 border-l border-neon/20 flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl">{item.emoji}</div>
                    <span className="text-xs font-bold text-neon uppercase tracking-wider">After</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center text-primary-foreground font-black text-sm shadow-lg glow">→</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Age {item.age} · {item.duration}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.stars }).map((_, i) => <Star key={i} size={12} className="text-neon fill-neon" />)}
                    </div>
                  </div>
                  <p className="text-neon font-bold text-sm mb-2">{item.goal}</p>
                  <p className="text-xs text-muted-foreground italic">"{item.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Transformations;
