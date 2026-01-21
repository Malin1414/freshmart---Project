import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { products } from "@/lib/products";
import { useShop } from "@/context/ShopContext";

const FeaturedProducts = () => {
  const { addToCart, addToWishlist } = useShop();

  return (
    <section id="FeaturedProducts" className="py-20 bg-secondary/30">
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
          <Link to="/products">
            <Button variant="outline" className="self-start md:self-auto">
              View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl p-4 hover:shadow-product transition-all duration-300 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative bg-muted rounded-xl p-6 mb-4 overflow-hidden">
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${product.badge === "Sale"
                    ? "bg-tomato text-primary-foreground"
                    : product.badge === "New"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                    }`}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-3 right-3 w-8 h-8 bg-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tomato hover:text-primary-foreground"
                >
                  <Heart className="w-4 h-4" />
                </button>
                <div className="text-6xl text-center group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1 mb-1">
                  Available: {product.availableQuantity}
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">Rs. {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="cart"
                    size="icon"
                    onClick={() => addToCart(product)}
                  >
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
