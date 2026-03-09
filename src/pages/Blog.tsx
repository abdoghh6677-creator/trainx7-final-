import Layout from "@/components/Layout";
import { useState } from "react";
import { Clock, Tag } from "lucide-react";

const posts = [
  {
    title: "5 Nutrition Hacks for Faster Fat Loss",
    category: "Nutrition", readTime: "5 min", date: "Mar 5, 2025",
    excerpt: "Discover the top nutrition strategies that will accelerate your fat loss journey without starving yourself or sacrificing muscle mass.",
    color: "from-orange-500/20 to-red-500/10",
    icon: "🥗",
  },
  {
    title: "The Ultimate Push-Pull-Legs Split",
    category: "Training", readTime: "8 min", date: "Feb 28, 2025",
    excerpt: "Learn why PPL is the most effective training split for building muscle and how to structure your week for maximum gains.",
    color: "from-neon/20 to-emerald-500/10",
    icon: "💪",
  },
  {
    title: "Mindset: The Missing Piece in Your Journey",
    category: "Mindset", readTime: "4 min", date: "Feb 20, 2025",
    excerpt: "Why your mental game matters more than your workout plan — and how to build unshakeable discipline that lasts.",
    color: "from-purple-500/20 to-blue-500/10",
    icon: "🧠",
  },
  {
    title: "How to Track Macros Without Going Crazy",
    category: "Nutrition", readTime: "6 min", date: "Feb 15, 2025",
    excerpt: "A practical guide to macro tracking that's flexible, realistic, and actually sustainable for real people with real lives.",
    color: "from-yellow-500/20 to-orange-500/10",
    icon: "📊",
  },
  {
    title: "Progressive Overload: The Key to Muscle Growth",
    category: "Training", readTime: "7 min", date: "Feb 8, 2025",
    excerpt: "If you're not getting stronger, you're not growing. Here's exactly how to apply progressive overload to every session.",
    color: "from-neon/20 to-teal-500/10",
    icon: "📈",
  },
  {
    title: "Sleep & Recovery: The Underrated Muscle Builder",
    category: "Mindset", readTime: "5 min", date: "Jan 30, 2025",
    excerpt: "You don't grow in the gym — you grow when you sleep. Here's why recovery is your secret weapon.",
    color: "from-blue-500/20 to-indigo-500/10",
    icon: "😴",
  },
];

const categories = ["All", "Nutrition", "Training", "Mindset"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
            TrainX7 <span className="text-neon">Blog</span>
          </h1>
          <p className="text-muted-foreground text-center mb-10">Tips, guides, and insights to fuel your journey.</p>

          {/* Category filter */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === c ? "bg-neon text-primary-foreground glow" : "bg-secondary text-secondary-foreground hover:bg-neon/20 hover:text-neon"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <article key={post.title} className="surface-1 border border-border rounded-xl overflow-hidden group hover:border-neon/50 transition-all hover:-translate-y-1">
                <div className={`h-44 bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                  <span className="text-6xl">{post.icon}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-xs font-bold text-neon uppercase">
                      <Tag size={10} />{post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={10} />{post.readTime} read
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-neon transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                  <button className="text-sm text-neon font-semibold hover:underline flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Blog;
