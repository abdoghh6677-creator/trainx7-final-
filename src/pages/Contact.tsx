import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
            Get In <span className="text-neon">Touch</span>
          </h1>
          <p className="text-muted-foreground text-center mb-12">We'd love to hear from you.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-card border-border text-foreground"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-card border-border text-foreground"
                />
                <Textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-card border-border text-foreground min-h-[120px]"
                />
                <Button className="bg-neon text-primary-foreground hover:bg-neon/90 glow font-semibold w-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 surface-1 border border-border rounded-lg p-4 hover:border-neon/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="text-green-500" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">Chat with us directly</div>
                </div>
              </a>

              <div className="flex items-center gap-4 surface-1 border border-border rounded-lg p-4">
                <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center">
                  <Mail className="text-neon" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">support@trainx7.com</div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <a href="#" className="w-12 h-12 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all">
                  <Youtube size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full surface-1 border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.63a8.22 8.22 0 0 0 4.76 1.52V6.69h-1z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
