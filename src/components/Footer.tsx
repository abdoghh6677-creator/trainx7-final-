import { Link } from "react-router-dom";
import { Dumbbell, Instagram, Youtube, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell size={20} className="text-neon" />
            <span className="text-xl font-black text-neon glow-text">TrainX7</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Train Smarter. Live Better. Your transformation starts here.</p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all">
              <Youtube size={16} />
            </a>
            <a href="https://wa.me/1234567890" className="w-9 h-9 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-green-400 hover:border-green-400/50 transition-all">
              <MessageCircle size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all text-xs font-bold">TT</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2">
            {[{ to: "/plans", label: "Plans & Pricing" }, { to: "/how-it-works", label: "How It Works" }, { to: "/transformations", label: "Transformations" }, { to: "/blog", label: "Blog" }].map(l => (
              <li key={l.to}><Link to={l.to} className="text-sm text-muted-foreground hover:text-neon transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Coach */}
        <div>
          <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Coach</h4>
          <ul className="space-y-2">
            {[{ to: "/about", label: "About Coach Mahmoud" }, { to: "/contact", label: "Contact" }, { to: "/faq", label: "FAQ" }].map(l => (
              <li key={l.to}><Link to={l.to} className="text-sm text-muted-foreground hover:text-neon transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Account</h4>
          <ul className="space-y-2">
            {[{ to: "/signup", label: "Get Started" }, { to: "/login", label: "Log In" }, { to: "/dashboard", label: "Dashboard" }].map(l => (
              <li key={l.to}><Link to={l.to} className="text-sm text-muted-foreground hover:text-neon transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-muted-foreground">© 2025 TrainX7. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-muted-foreground hover:text-neon transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-neon transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-neon transition-colors">Refund Policy</a>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
