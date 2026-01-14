import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";

const Shop = () => {
    const { addToCart, addToWishlist } = useShop();

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground">
                            All Products
                        </h1>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-card rounded-2xl p-4 hover:shadow-product transition-all duration-300 border border-border/50"
                            >
                                {/* Image Container */}
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

                                    {/* Wishlist Button */}
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

                                {/* Content */}
                                <div className="space-y-2">
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>

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
            </main>
            <Footer />
        </div>
    );
};

export default Shop;
