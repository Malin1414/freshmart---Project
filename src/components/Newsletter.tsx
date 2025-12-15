import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Get Fresh Deals in Your Inbox
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Subscribe to our newsletter and receive exclusive offers, new product updates, and healthy recipes every week!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 h-auto">
              Subscribe
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm mt-4">
            No spam, unsubscribe anytime. Read our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
