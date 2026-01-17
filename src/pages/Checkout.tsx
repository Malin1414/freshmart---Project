import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Banknote } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart, addOrder, currentUser } = useShop();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

    const subtotal = getCartTotal();
    const shipping = 250;
    const total = subtotal + shipping;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
    });

    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (paymentMethod === "card") {
            if (!cardData.cardNumber || !cardData.cardName || !cardData.expiry || !cardData.cvv) {
                toast.error("Please fill in all card details");
                return;
            }
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newOrder = {
                id: `#ORD-${Math.floor(Math.random() * 10000)}`,
                userId: currentUser?.id || "guest",
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                total: total,
                status: "Processing" as const,
                items: cartItems.map(item => item.name),
                address: `${formData.address}, ${formData.city}`,
                payment: paymentMethod === "cod" ? "Cash on Delivery" : `Credit Card (**** ${cardData.cardNumber.slice(-4)})`
            };

            addOrder(newOrder);
            setLoading(false);
            clearCart();
            toast.success("Order placed successfully!");
            navigate("/my-orders");
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                    <p className="text-gray-500">Add some items to your cart to proceed with checkout.</p>
                    <Link to="/">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/cart">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-display font-bold text-gray-900">
                        Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-8">
                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">

                            {/* Shipping Address */}
                            <div>
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-sm">1</span>
                                    Shipping Address
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="123 Main St, Apartment 4B"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">ZIP Code</Label>
                                        <Input
                                            id="zipCode"
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="400001"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Payment Method */}
                            <div>
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-sm">2</span>
                                    Payment Method
                                </h2>

                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={(value: "cod" | "card") => setPaymentMethod(value)}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                                >
                                    <div>
                                        <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                                        <Label
                                            htmlFor="cod"
                                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-500 peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:text-green-900"
                                        >
                                            <Banknote className="w-5 h-5" />
                                            <span className="font-medium">Cash on Delivery</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                        <Label
                                            htmlFor="card"
                                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-500 peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:text-green-900"
                                        >
                                            <CreditCard className="w-5 h-5" />
                                            <span className="font-medium">Card Payment</span>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {paymentMethod === "card" && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 animate-fade-down">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName">Card Holder Name</Label>
                                            <Input
                                                id="cardName"
                                                name="cardName"
                                                placeholder="John Doe"
                                                value={cardData.cardName}
                                                onChange={handleCardInputChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="0000 0000 0000 0000"
                                                maxLength={16}
                                                value={cardData.cardNumber}
                                                onChange={handleCardInputChange}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input
                                                    id="expiry"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    value={cardData.expiry}
                                                    onChange={handleCardInputChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input
                                                    id="cvv"
                                                    name="cvv"
                                                    placeholder="123"
                                                    maxLength={3}
                                                    type="password"
                                                    value={cardData.cvv}
                                                    onChange={handleCardInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-8">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
                                            {item.image}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                            <div className="text-green-600 font-bold text-sm">
                                                Rs. {(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Rs. {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>Rs. {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </Button>

                            <p className="mt-4 text-xs text-center text-gray-500">
                                By placing this order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
