import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Heart, Filter, Search, Star } from "lucide-react";
import { products } from "@/lib/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import { useSearchParams } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Products = () => {
    const { addToCart, addToWishlist } = useShop();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("category") || "");

    const categories = [
        "Fruits", "Vegetables", "Dairy", "Meat",
        "Bakery", "Seafood", "Beverages", "Snacks"
    ];

    useEffect(() => {
        const category = searchParams.get("category");
        if (category) {
            setSearchQuery(category);
        }
    }, [searchParams]);

    // Update URL when filtering via dropdown or clearing
    const handleCategorySelect = (category: string) => {
        setSearchQuery(category);
        if (category) {
            setSearchParams({ category });
        } else {
            setSearchParams({});
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground">
                            Shop All Products
                        </h1>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2 whitespace-nowrap">
                                        <Filter className="w-4 h-4" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => handleCategorySelect("")}>
                                        All Categories
                                    </DropdownMenuItem>
                                    {categories.map((category) => (
                                        <DropdownMenuItem
                                            key={category}
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
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

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                                                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                                            </div>
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                Available: {product.availableQuantity}
                                            </span>
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
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-lg text-muted-foreground">No products found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Products;
