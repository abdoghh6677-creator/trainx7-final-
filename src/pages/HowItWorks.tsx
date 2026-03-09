import Layout from "@/components/Layout";
import { UserPlus, Target, Calendar, CreditCard, ClipboardList, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Sign Up & Choose Gender", desc: "Create your account and select your gender for a tailored experience." },
  { icon: Target, title: "Set Your Goal", desc: "Lose weight, build muscle, or get fit — we'll customize your plan." },
  { icon: Calendar, title: "Choose Training Days", desc: "Pick how many days per week you can train — 3, 4, 5, or 6." },
  { icon: CreditCard, title: "Pick Your Plan", desc: "Select from monthly to annual plans that fit your budget." },
  { icon: ClipboardList, title: "Get Your Program", desc: "Receive your personalized workout and nutrition plan instantly." },
  { icon: TrendingUp, title: "Track Progress Daily", desc: "Log workouts, meals, and measurements to see your transformation." },
];

const HowItWorks = () => (
  <Layout>
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
          How It <span className="text-neon">Works</span>
        </h1>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          From sign-up to your first workout in just a few simple steps.
        </p>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-neon/10 border-2 border-neon flex items-center justify-center">
                  <step.icon className="text-neon" size={24} />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mx-auto mt-2" />
                )}
              </div>
              <div className="pt-2">
                <div className="text-xs font-bold text-neon mb-1">Step {i + 1}</div>
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default HowItWorks;
