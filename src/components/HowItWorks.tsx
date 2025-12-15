import { Search, ShoppingCart, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Products",
    description: "Explore thousands of fresh groceries and find exactly what you need",
    step: "01",
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Add your favorite items to the cart with just a single click",
    step: "02",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description: "Complete your purchase with our safe and secure payment options",
    step: "03",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Sit back and relax while we deliver fresh groceries to your door",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting fresh groceries delivered to your home has never been easier
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              {/* Step Number */}
              <span className="inline-block text-6xl font-display font-bold text-muted/50 mb-4">
                {step.step}
              </span>

              {/* Icon */}
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
