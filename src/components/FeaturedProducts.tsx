import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Bananas",
    category: "Fruits",
    price: 2.99,
    originalPrice: 3.99,
    rating: 4.8,
    reviews: 234,
    image: "🍌",
    badge: "Sale",
  },
  {
    id: 2,
    name: "Fresh Avocados",
    category: "Fruits",
    price: 4.49,
    rating: 4.9,
    reviews: 189,
    image: "🥑",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Farm Eggs (12pc)",
    category: "Dairy",
    price: 5.99,
    rating: 4.7,
    reviews: 312,
    image: "🥚",
  },
  {
    id: 4,
    name: "Organic Milk",
    category: "Dairy",
    price: 3.49,
    rating: 4.6,
    reviews: 156,
    image: "🥛",
  },
  {
    id: 5,
    name: "Fresh Salmon",
    category: "Seafood",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.9,
    reviews: 98,
    image: "🐟",
    badge: "Sale",
  },
  {
    id: 6,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 4.29,
    rating: 4.5,
    reviews: 245,
    image: "🍞",
  },
  {
    id: 7,
    name: "Red Apples (6pc)",
    category: "Fruits",
    price: 5.99,
    rating: 4.7,
    reviews: 178,
    image: "🍎",
    badge: "New",
  },
  {
    id: 8,
    name: "Greek Yogurt",
    category: "Dairy",
    price: 6.49,
    rating: 4.8,
    reviews: 203,
    image: "🥄",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our Products
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl p-4 hover:shadow-product transition-all duration-300 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image Container */}
              <div className="relative bg-muted rounded-xl p-6 mb-4 overflow-hidden">
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                    product.badge === "Sale" 
                      ? "bg-tomato text-primary-foreground" 
                      : product.badge === "New"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}>
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tomato hover:text-primary-foreground">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="text-6xl text-center group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-lemon text-lemon" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button variant="cart" size="icon">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
