import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-groceries.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient pt-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Free delivery on orders over Rs. 5000
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Fresh Groceries
              <br />
              <span className="text-primary">Delivered</span> to
              <br />
              Your Door
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Shop from thousands of fresh products and get them delivered to your doorstep within hours. Quality guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <a href="#FeaturedProducts">
                <Button variant="hero" size="xl">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#categories">
                <Button variant="outline" size="xl">
                  View Categories
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Fast Delivery</span>
                <span className="text-xs text-muted-foreground">Within 2 hours</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Secure Payment</span>
                <span className="text-xs text-muted-foreground">100% Protected</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">24/7 Support</span>
                <span className="text-xs text-muted-foreground">Always here</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Fresh organic groceries in a wooden crate"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-product animate-float"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute top-8 -left-4 bg-card rounded-2xl p-4 shadow-elevated animate-bounce-gentle z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">%</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">20% OFF</p>
                  <p className="text-xs text-muted-foreground">First Order</p>
                </div>
              </div>
            </div>

            {/* Stats badge */}
            <div className="absolute bottom-8 -right-4 bg-card rounded-2xl p-4 shadow-elevated z-20">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-xs text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
