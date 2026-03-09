import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    image: heroSlide1,
    headline: "No Excuses. Only Results.",
    subtext: "Push your limits with plans built for serious athletes.",
    cta: "Start Training Now",
    link: "/plans",
  },
  {
    image: heroSlide2,
    headline: "Your Coach. In Your Pocket.",
    subtext: "Follow your daily workouts anywhere — gym or home.",
    cta: "See How It Works",
    link: "/how-it-works",
  },
  {
    image: heroSlide3,
    headline: "Built for Those Who Are Serious.",
    subtext: "Join TrainX7 and train with purpose, track with precision.",
    cta: "Join TrainX7",
    link: "/signup",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
              {slides[current].headline.split(".").map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-neon">.</span>}
                  {part}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {slides[current].subtext}
            </p>
            <Link to={slides[current].link}>
              <Button size="lg" className="bg-neon text-primary-foreground hover:bg-neon/90 glow font-bold text-lg px-8 py-6">
                {slides[current].cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors">
        <ChevronLeft className="text-foreground" size={24} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors">
        <ChevronRight className="text-foreground" size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-neon glow w-8" : "bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
