import { Apple, Carrot, Milk, Beef, Croissant, Fish, Coffee, Candy } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Fruits", icon: Apple, color: "bg-tomato/10 text-tomato", count: "120+" },
  { name: "Vegetables", icon: Carrot, color: "bg-citrus/10 text-citrus", count: "85+" },
  { name: "Dairy", icon: Milk, color: "bg-primary/10 text-primary", count: "45+" },
  { name: "Meat", icon: Beef, color: "bg-tomato/10 text-tomato", count: "60+" },
  { name: "Bakery", icon: Croissant, color: "bg-lemon/10 text-lemon", count: "35+" },
  { name: "Seafood", icon: Fish, color: "bg-primary/10 text-primary", count: "40+" },
  { name: "Beverages", icon: Coffee, color: "bg-foreground/10 text-foreground", count: "90+" },
  { name: "Snacks", icon: Candy, color: "bg-berry/10 text-berry", count: "75+" },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Browse by Category
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of fresh products organized by category for easy shopping
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="group bg-card rounded-2xl p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <span className="text-xs text-muted-foreground">{category.count} items</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
