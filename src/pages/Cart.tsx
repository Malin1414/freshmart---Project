import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
    const {
        cartItems,
        wishlistItems,
        removeFromCart,
        updateQuantity,
        addToCart,
        removeFromWishlist,
        getCartTotal,
    } = useShop();

    const subtotal = getCartTotal();
    const shipping = 250;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-gray-900">
                        Shopping Cart
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-green-600" />
                                Cart Items ({cartItems.length})
                            </h2>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Looks like you haven't added anything yet.
                                    </p>

                                    <Link to="/shop">

                                        <Button>Start Shopping</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-4 border-b border-gray-100 last:border-0"
                                        >
                                            {/* Product Image */}
                                            <div className="w-24 h-24 rounded-xl bg-gray-50 flex items-center justify-center text-4xl flex-shrink-0">
                                                {item.image}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="font-semibold text-gray-900">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-1">
                                                    {item.category}
                                                </p>
                                                <div className="text-green-600 font-bold">
                                                    Rs. {item.price.toFixed(2)}
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-white hover:shadow-sm"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:bg-white hover:shadow-sm"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right min-w-[80px] font-semibold">
                                                Rs. {(item.price * item.quantity).toFixed(2)}
                                            </div>

                                            {/* Remove Button */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400 hover:text-red-500"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Wishlist Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6">Wishlist</h2>
                            {wishlistItems.length === 0 ? (
                                <p className="text-gray-500 text-center py-6">
                                    Your wishlist is empty
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {wishlistItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                                        >
                                            <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
                                                {item.image}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate">
                                                    {item.name}
                                                </h4>
                                                <div className="text-green-600 font-bold text-sm">
                                                    Rs. {item.price.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 text-xs bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200"
                                                    onClick={() => addToCart(item)}
                                                >
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 text-xs text-gray-400 hover:text-red-500"
                                                    onClick={() => removeFromWishlist(item.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:sticky lg:top-8">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Fee</span>
                                    <span>Rs. {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax Estimate</span>
                                    <span>Rs. 0.00</span>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Order Total</span>
                                    <span>Rs. {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="w-full">
                                <Button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
                                    Checkout
                                </Button>
                            </Link>
                           

                            <div className="mt-4 text-center text-sm text-gray-500">
                                Do you already have an account?{" "}
                                <Link to="/signup" className="text-primary hover:underline font-medium">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
