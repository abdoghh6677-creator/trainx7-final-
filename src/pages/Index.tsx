import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import { Dumbbell, Video, Apple, BarChart3, Target, ClipboardList, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { icon: ClipboardList, title: "Personalized Plans", desc: "Custom workout programs tailored to your goals and fitness level." },
  { icon: Video, title: "GIF Exercise Library", desc: "Visual guides for every exercise with proper form demonstrations." },
  { icon: Apple, title: "Nutrition Tracker", desc: "Track your meals and macros with our smart food database." },
  { icon: BarChart3, title: "Progress Analytics", desc: "Charts and insights to keep you on track and motivated." },
];

const steps = [
  { icon: Target, title: "Choose Your Goal", desc: "Weight loss, muscle gain, or general fitness." },
  { icon: ClipboardList, title: "Pick Your Plan", desc: "Select from 1, 2, 3, or 12-month plans." },
  { icon: Zap, title: "Start Training", desc: "Get your personalized program and begin immediately." },
];

const transformations = [
  { name: "Ahmed K.", result: "Lost 15 kg", before: "Before", after: "After" },
  { name: "Sara M.", result: "Gained 8 kg muscle", before: "Before", after: "After" },
  { name: "Omar R.", result: "Lost 22 kg", before: "Before", after: "After" },
];

const testimonials = [
  { name: "Yousef A.", text: "TrainX7 changed my life. I lost 20kg in 4 months with Coach Mahmoud's guidance.", stars: 5 },
  { name: "Layla H.", text: "The workout GIFs and nutrition tracker make it so easy to stay consistent.", stars: 5 },
  { name: "Khaled S.", text: "Best investment I've made. The personalized plans are worth every penny.", stars: 5 },
];

const Index = () => (
  <Layout>
    <HeroSlider />

    {/* Features */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Everything You Need to <span className="text-neon">Transform</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A complete fitness ecosystem designed for real results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="surface-1 border border-border rounded-lg p-6 hover:border-neon/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center mb-4 group-hover:bg-neon/20 transition-colors">
                <f.icon className="text-neon" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-20 surface-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It <span className="text-neon">Works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-neon/10 border-2 border-neon flex items-center justify-center mx-auto mb-4">
                <s.icon className="text-neon" size={28} />
              </div>
              <div className="text-sm font-bold text-neon mb-2">Step {i + 1}</div>
              <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Transformations */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Real <span className="text-neon">Transformations</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transformations.map((t) => (
            <div key={t.name} className="surface-1 border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 h-48">
                <div className="bg-muted flex items-center justify-center text-muted-foreground text-sm">{t.before}</div>
                <div className="bg-secondary flex items-center justify-center text-muted-foreground text-sm">{t.after}</div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground">{t.name}</h4>
                <p className="text-neon text-sm font-medium">{t.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 surface-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Athletes <span className="text-neon">Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-lg p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="text-neon fill-neon" size={16} />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-4">"{t.text}"</p>
              <p className="font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="surface-1 border border-neon/30 rounded-2xl p-12 glow">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of athletes who transformed their bodies with TrainX7.
          </p>
          <Link to="/plans">
            <Button size="lg" className="bg-neon text-primary-foreground hover:bg-neon/90 font-bold text-lg px-10 py-6 glow">
              Subscribe Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
