import { Leaf, Timer, BadgeCheck, Headphones, Percent, RefreshCw } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Fresh & Organic",
    description: "All products sourced directly from local farms and verified suppliers",
  },
  {
    icon: Timer,
    title: "Express Delivery",
    description: "Get your groceries delivered within 2 hours of placing your order",
  },
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    description: "100% satisfaction guarantee on every product we deliver",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer service team is always ready to help you",
  },
  {
    icon: Percent,
    title: "Best Prices",
    description: "Competitive pricing and exclusive deals for our members",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free returns if you're not satisfied with your order",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefits of Shopping With Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the best online grocery shopping with our premium features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
