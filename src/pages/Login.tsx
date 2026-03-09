import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { getUser } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    // Demo login — in production connect to Supabase Auth
    setTimeout(() => {
      const user = getUser();
      if (user && user.email === email) {
        navigate("/dashboard");
      } else {
        // Create demo session
        const demoUser = { id: "demo", name: "Athlete", email, gender: "male" as const, goal: "build" as const, days: "4", plan: "2m" as const, planStart: new Date().toISOString(), planEnd: new Date(Date.now() + 60 * 86400000).toISOString() };
        localStorage.setItem("trainx7_user", JSON.stringify(demoUser));
        navigate("/dashboard");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="text-3xl font-black text-neon glow-text block text-center mb-8">TrainX7</Link>
        <div className="surface-1 border border-border rounded-xl p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Welcome Back</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Log in to continue your journey</p>
          {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-sm text-red-400">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="bg-card border-border text-foreground" />
            <div className="relative">
              <Input placeholder="Password" type={showPw ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)} className="bg-card border-border text-foreground pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="text-right">
              <button type="button" className="text-xs text-neon hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-neon text-primary-foreground hover:bg-neon/90 glow font-bold py-6 text-base">
              {loading ? "Logging in..." : "Log In →"}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs text-muted-foreground bg-card px-2 w-fit mx-auto">or</div>
          </div>
          <Button variant="secondary" onClick={() => { const d = { id: "demo", name: "Demo User", email: "demo@trainx7.com", gender: "male" as const, goal: "build" as const, days: "4", plan: "2m" as const, planStart: new Date().toISOString(), planEnd: "" }; localStorage.setItem("trainx7_user", JSON.stringify(d)); navigate("/dashboard"); }}
            className="w-full font-semibold">
            Try Demo Dashboard
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-neon hover:underline font-semibold">Sign Up Free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
