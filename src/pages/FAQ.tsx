import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is TrainX7?", a: "TrainX7 is a premium online fitness platform by Coach Mahmoud offering personalized workout plans, exercise GIF libraries, nutrition tracking, and progress analytics." },
  { q: "How do I choose the right plan?", a: "We recommend starting with the Standard (2-month) plan to get familiar with the system. For long-term commitment, the Elite (12-month) plan offers the best value." },
  { q: "Are the workouts suitable for beginners?", a: "Absolutely! All plans are customized to your fitness level. Whether you're a beginner or advanced lifter, your program will match your capabilities." },
  { q: "How does the nutrition tracker work?", a: "Simply input your meals and we auto-calculate your macros (calories, protein, carbs, fat) using our food database. You can track daily intake and compare against your targets." },
  { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime. Your access will remain active until the end of your billing period." },
  { q: "Do I need gym equipment?", a: "We offer both gym-based and home workout programs. During onboarding, we'll ask about your setup and customize accordingly." },
  { q: "How do I contact Coach Mahmoud?", a: "Elite plan subscribers get direct WhatsApp access. All users can reach us through the Contact page or email." },
];

const FAQ = () => (
  <Layout>
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
          Frequently Asked <span className="text-neon">Questions</span>
        </h1>
        <p className="text-muted-foreground text-center mb-12">Got questions? We've got answers.</p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="surface-1 border border-border rounded-lg px-6">
              <AccordionTrigger className="text-foreground font-semibold hover:text-neon">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </Layout>
);

export default FAQ;
