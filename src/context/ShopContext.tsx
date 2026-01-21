import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

export interface Order {
    id: string;
    userId: string;
    date: string;
    total: number;
    status: "Processing" | "In Transit" | "Delivered" | "Cancelled";
    items: string[];
    address: string;
    payment: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
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

    clearCart: () => void;
    orders: Order[];
    addOrder: (order: Order) => void;
    cancelOrder: (orderId: string) => void;

    currentUser: User | null;
    signup: (user: Omit<User, "id">) => void;
    login: (email: string) => boolean;
    logout: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    // Initial cart state
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : [];
    });

    // Initial wishlist state
    const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
        const saved = localStorage.getItem("wishlistItems");
        return saved ? JSON.parse(saved) : [];
    });

    // Order state
    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem("orders");
        return saved ? JSON.parse(saved) : [];
    });

    // User state
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("currentUser");
        return saved ? JSON.parse(saved) : null;
    });

    // Persist states
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);


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


    const clearCart = () => {
        setCartItems([]);
    };

    const addOrder = (order: Order) => {
        setOrders((prev) => [order, ...prev]);
    };

    const cancelOrder = (orderId: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status: "Cancelled" } : order
            )
        );
        toast.success("Order cancelled");
    };

    const signup = (userData: Omit<User, "id">) => {
        const usersProp = localStorage.getItem("users");
        const users: User[] = usersProp ? JSON.parse(usersProp) : [];

        if (users.some(u => u.email === userData.email)) {
            toast.error("Email already exists");
            return;
        }

        const newUser = { ...userData, id: crypto.randomUUID() };
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setCurrentUser(newUser);
        toast.success("Account created successfully!");
    };

    const login = (email: string) => {
        const usersProp = localStorage.getItem("users");
        const users: User[] = usersProp ? JSON.parse(usersProp) : [];
        const foundUser = users.find(u => u.email === email);

        if (foundUser) {
            setCurrentUser(foundUser);
            toast.success("Welcome back!");
            return true;
        } else {
            // For prototype convenience, if not found, we could auto-create or fail.
            // Let's fail but provide a hint.
            toast.error("User not found. Please sign up.");
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        toast.success("Logged out");
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

                clearCart,
                orders,
                addOrder,
                cancelOrder,

                currentUser,
                signup,
                login,
                logout
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
