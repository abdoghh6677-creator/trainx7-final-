import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Globe, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Clients" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Globe, value: "3", label: "Countries" },
  { icon: TrendingUp, value: "1000+", label: "Transformations" },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="py-20 surface-1">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-muted rounded-2xl h-96 flex items-center justify-center text-muted-foreground">
            Coach Photo Placeholder
          </div>
          <div>
            <p className="text-neon font-semibold mb-2">Meet Your Coach</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">Coach Mahmoud</h1>
            <p className="text-muted-foreground mb-4">
              With over 5 years of experience in personal training and online coaching, Coach Mahmoud has helped hundreds of clients across the Middle East and beyond achieve their dream physiques.
            </p>
            <p className="text-muted-foreground mb-6">
              Certified in sports nutrition and strength training, Mahmoud combines science-backed programming with real-world coaching to deliver results that last.
            </p>
            <Link to="/plans">
              <Button className="bg-neon text-primary-foreground hover:bg-neon/90 glow font-semibold">
                Train With Mahmoud
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Vision */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-8">My <span className="text-neon">Vision</span></h2>
        <blockquote className="text-xl md:text-2xl text-muted-foreground italic border-l-4 border-neon pl-6 text-left">
          "I believe everyone deserves access to elite-level coaching. TrainX7 is my way of reaching those who are serious about changing their lives — no excuses, no shortcuts, just hard work and smart training."
        </blockquote>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 surface-1">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="text-neon mx-auto mb-3" size={32} />
              <div className="text-3xl font-black text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Gallery */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted rounded-lg h-64 flex items-center justify-center text-muted-foreground">
              Photo {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
