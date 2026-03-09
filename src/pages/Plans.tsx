import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  { name: "Basic", duration: "1 Month", price: "$49", badge: null, features: { plan: true, gifs: true, nutrition: false, progress: false, whatsapp: false } },
  { name: "Standard", duration: "2 Months", price: "$89", badge: "Popular", features: { plan: true, gifs: true, nutrition: true, progress: false, whatsapp: false } },
  { name: "Advanced", duration: "3 Months", price: "$119", badge: null, features: { plan: true, gifs: true, nutrition: true, progress: true, whatsapp: false } },
  { name: "Elite", duration: "12 Months", price: "$399", badge: "Best Value", features: { plan: true, gifs: true, nutrition: true, progress: true, whatsapp: true } },
];

const featureLabels = [
  { key: "plan", label: "Personalized Plan" },
  { key: "gifs", label: "GIF Library" },
  { key: "nutrition", label: "Nutrition Tracker" },
  { key: "progress", label: "Progress Tracking" },
  { key: "whatsapp", label: "WhatsApp Support" },
];

const Plans = () => (
  <Layout>
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
          Choose Your <span className="text-neon">Plan</span>
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Invest in yourself. Every plan includes access to your personalized program.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`surface-1 border rounded-xl p-6 relative flex flex-col ${
                plan.badge ? "border-neon glow" : "border-border"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.duration}</p>
              <div className="text-3xl font-black text-neon mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8 flex-1">
                {featureLabels.map((f) => (
                  <li key={f.key} className="flex items-center gap-2 text-sm">
                    {plan.features[f.key as keyof typeof plan.features] ? (
                      <Check className="text-neon" size={16} />
                    ) : (
                      <X className="text-muted-foreground/30" size={16} />
                    )}
                    <span className={plan.features[f.key as keyof typeof plan.features] ? "text-foreground" : "text-muted-foreground/50"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button className={`w-full font-semibold ${plan.badge ? "bg-neon text-primary-foreground hover:bg-neon/90 glow" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <h2 className="text-2xl font-bold text-center mb-8">Plan Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                {plans.map((p) => (
                  <th key={p.name} className="text-center py-3 px-4 text-foreground font-semibold">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map((f) => (
                <tr key={f.key} className="border-b border-border/50">
                  <td className="py-3 px-4 text-muted-foreground">{f.label}</td>
                  {plans.map((p) => (
                    <td key={p.name} className="text-center py-3 px-4">
                      {p.features[f.key as keyof typeof p.features] ? (
                        <Check className="text-neon mx-auto" size={16} />
                      ) : (
                        <X className="text-muted-foreground/30 mx-auto" size={16} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </Layout>
);

export default Plans;
