import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const rules = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!rules.length || !rules.upper || !rules.number) e.password = "Password doesn't meet requirements";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    localStorage.setItem("trainx7_signup_temp", JSON.stringify({ id: crypto.randomUUID(), name: form.name, email: form.email }));
    setTimeout(() => { setLoading(false); navigate("/onboarding"); }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="text-3xl font-black text-neon glow-text block text-center mb-8">TrainX7</Link>
        <div className="surface-1 border border-border rounded-xl p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Create Your Account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Start your transformation today</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className={`bg-card border-border text-foreground ${errors.name ? "border-red-500" : ""}`} />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className={`bg-card border-border text-foreground ${errors.email ? "border-red-500" : ""}`} />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <Input placeholder="Password" type={showPw ? "text" : "password"} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className={`bg-card border-border text-foreground pr-10 ${errors.password ? "border-red-500" : ""}`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 space-y-1">
                  {[{ ok: rules.length, text: "At least 8 characters" }, { ok: rules.upper, text: "One uppercase letter" }, { ok: rules.number, text: "One number" }].map(r => (
                    <div key={r.text} className={`flex items-center gap-2 text-xs ${r.ok ? "text-neon" : "text-muted-foreground"}`}>
                      {r.ok ? <CheckCircle2 size={12} /> : <XCircle size={12} />} {r.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Input placeholder="Confirm Password" type="password" value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className={`bg-card border-border text-foreground ${errors.confirm ? "border-red-500" : ""}`} />
              {errors.confirm && <p className="text-xs text-red-400 mt-1">{errors.confirm}</p>}
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-neon text-primary-foreground hover:bg-neon/90 glow font-bold py-6 text-base">
              {loading ? "Creating account..." : "Create Account →"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">By signing up you agree to our Terms of Service</p>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Already have an account? <Link to="/login" className="text-neon hover:underline font-semibold">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
