import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    availableQuantity: number;
}

export interface CartItem extends Product {
    quantity: number;
}

interface ShopContextType {
    cartItems: CartItem[];
    wishlistItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    getCartTotal: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    // Initial cart state
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Initial wishlist state
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                toast.info("Item quantity updated in cart");
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success("Added to cart");
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
        toast.error("Removed from cart");
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const addToWishlist = (product: Product) => {
        setWishlistItems((prev) => {
            if (prev.some(item => item.id === product.id)) {
                toast.info("Already in wishlist");
                return prev;
            }
            toast.success("Added to wishlist");
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
        toast.success("Removed from wishlist");
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                wishlistItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                addToWishlist,
                removeFromWishlist,
                getCartTotal,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
};
