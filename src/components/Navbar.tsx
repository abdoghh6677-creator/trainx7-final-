import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Dumbbell } from "lucide-react";
import { isLoggedIn, clearUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const links = [
  { label: "Home",            to: "/" },
  { label: "About",           to: "/about" },
  { label: "Plans",           to: "/plans" },
  { label: "How It Works",    to: "/how-it-works" },
  { label: "Transformations", to: "/transformations" },
  { label: "Blog",            to: "/blog" },
  { label: "FAQ",             to: "/faq" },
  { label: "Contact",         to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  const handleLogout = () => {
    clearUser();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-sm border-b border-border shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Dumbbell size={22} className="text-neon group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-black text-neon glow-text tracking-tight">TrainX7</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${location.pathname === l.to ? "text-neon bg-neon/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {loggedIn ? (
            <>
              <Link to="/dashboard">
                <Button size="sm" className="bg-neon text-primary-foreground hover:bg-neon/90 glow font-bold">Dashboard</Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">Log Out</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground font-medium">Log In</Button></Link>
              <Link to="/signup"><Button size="sm" className="bg-neon text-primary-foreground hover:bg-neon/90 glow font-bold">Get Started</Button></Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-foreground p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-4">
          <div className="flex flex-col gap-1 py-2">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${location.pathname === l.to ? "text-neon bg-neon/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {loggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}><Button className="w-full bg-neon text-primary-foreground font-bold">Dashboard</Button></Link>
                <Button variant="ghost" onClick={() => { handleLogout(); setOpen(false); }} className="w-full text-muted-foreground">Log Out</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full text-muted-foreground">Log In</Button></Link>
                <Link to="/signup" onClick={() => setOpen(false)}><Button className="w-full bg-neon text-primary-foreground glow font-bold">Get Started Free</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
