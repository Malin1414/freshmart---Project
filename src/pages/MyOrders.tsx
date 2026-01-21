import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Clock, Truck, CheckCircle, Star, MapPin, CreditCard, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { toast } from "sonner";

import { useShop } from "@/context/ShopContext";

const MyOrders = () => {
    const { orders: allOrders, currentUser } = useShop();

    // Filter orders for current user or show empty if not logged in
    const orders = currentUser
        ? allOrders.filter(order => order.userId === currentUser.id)
        : [];

    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const openRatingDialog = (order: any) => {
        setSelectedOrder(order);
        // Initialize ratings for this order's items
        const initialRatings: { [key: string]: number } = {};
        order.items.forEach((item: string) => {
            initialRatings[item] = 0;
        });
        setRatings(initialRatings);
        setIsRatingOpen(true);
    };

    const openOrderDetails = (order: any) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const handleRating = (item: string, rating: number) => {
        setRatings(prev => ({
            ...prev,
            [item]: rating
        }));
    };

    const submitReviews = () => {
        toast.success("Reviews submitted successfully!");
        setIsRatingOpen(false);
    };

    const OrderList = ({ statusFilter }: { statusFilter?: string }) => {
        const filteredOrders = statusFilter
            ? orders.filter(order => order.status === statusFilter)
            : orders;

        if (filteredOrders.length === 0) {
            return (
                <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-1">No orders found</h3>
                    <p className="text-muted-foreground">You don't have any orders in this status.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                order.status === 'In Transit' ? 'bg-blue-100 text-blue-600' :
                                    'bg-yellow-100 text-yellow-600'
                                }`}>
                                {order.status === 'Delivered' ? <CheckCircle className="w-6 h-6" /> :
                                    order.status === 'In Transit' ? <Truck className="w-6 h-6" /> :
                                        <Clock className="w-6 h-6" />}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{order.id}</h3>
                                <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full md:w-auto md:px-8">
                            <div className="text-sm text-muted-foreground mb-1">Items</div>
                            <p className="font-medium text-foreground text-sm truncate max-w-md">
                                {order.items.join(", ")}
                            </p>
                        </div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-8">
                            <div>
                                <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                                <p className="font-bold text-primary">Rs. {order.total}</p>
                            </div>

                            <div className="flex flex-col gap-2 items-end">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                    order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {order.status === 'In Transit' ? 'To Receive' : order.status}
                                </div>

                                {order.status === 'Delivered' && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs gap-1"
                                        onClick={() => openRatingDialog(order)}
                                    >
                                        <Star className="w-3 h-3" />
                                        Rate Products
                                    </Button>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden md:flex"
                                onClick={() => openOrderDetails(order)}
                            >
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-4xl font-bold text-foreground mb-8">My Orders</h1>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-8 w-full md:w-auto grid grid-cols-4 md:inline-flex">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="processing">Processing</TabsTrigger>
                            <TabsTrigger value="transit">To Receive</TabsTrigger>
                            <TabsTrigger value="delivered">Delivered</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <OrderList />
                        </TabsContent>
                        <TabsContent value="processing" className="mt-0">
                            <OrderList statusFilter="Processing" />
                        </TabsContent>
                        <TabsContent value="transit" className="mt-0">
                            <OrderList statusFilter="In Transit" />
                        </TabsContent>
                        <TabsContent value="delivered" className="mt-0">
                            <OrderList statusFilter="Delivered" />
                        </TabsContent>
                    </Tabs>

                    {!currentUser ? (
                        <div className="text-center py-12">
                            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Please Log In</h3>
                            <p className="text-muted-foreground mb-6">Log in to view your order history.</p>
                            <Link to="/signup">
                                <Button>Log In / Sign Up</Button>
                            </Link>
                        </div>
                    ) : orders.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                            <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                            <Link to="/products">
                                <Button>Start Shopping</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />

            <Dialog open={isRatingOpen} onOpenChange={setIsRatingOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Rate Products</DialogTitle>
                        <DialogDescription>
                            How was the quality of the items in order {selectedOrder?.id}?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto px-1">
                        {selectedOrder?.items.map((item: string) => (
                            <div key={item} className="bg-muted/30 p-3 rounded-lg flex items-center justify-between">
                                <span className="font-medium text-sm">{item}</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleRating(item, star)}
                                            className={`transition-all hover:scale-110 focus:outline-none ${(ratings[item] || 0) >= star
                                                ? "text-yellow-400 fill-current"
                                                : "text-muted-foreground/30"
                                                }`}
                                        >
                                            <Star className={`w-5 h-5 ${(ratings[item] || 0) >= star ? "fill-yellow-400" : ""}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRatingOpen(false)}>Cancel</Button>
                        <Button onClick={submitReviews}>Submit Reviews</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="flex items-center justify-between">
                            <span>Order Details</span>
                            <span className="text-sm font-normal text-muted-foreground">{selectedOrder?.id}</span>
                        </SheetTitle>
                        <SheetDescription>
                            View details of your order placed on {selectedOrder?.date}
                        </SheetDescription>
                    </SheetHeader>

                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Status */}
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <div className={`p-2 rounded-full ${selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                    selectedOrder.status === 'In Transit' ? 'bg-blue-100 text-blue-600' :
                                        'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {selectedOrder.status === 'Delivered' ? <CheckCircle className="w-5 h-5" /> :
                                        selectedOrder.status === 'In Transit' ? <Truck className="w-5 h-5" /> :
                                            <Clock className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Order Status</p>
                                    <p className="font-bold text-base">{selectedOrder.status}</p>
                                </div>
                            </div>

                            {/* Items List */}
                            <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4" /> Items
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item: string, index: number) => (
                                        <div key={index} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                                            <span>{item}</span>
                                            <span className="text-muted-foreground">Qty: 1</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Details */}
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Shipping Address
                                    </h3>
                                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                                        {selectedOrder.address || "123 Green Street, Colombo 03, Sri Lanka"}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" /> Payment Method
                                    </h3>
                                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                                        {selectedOrder.payment || "Credit Card (**** 4242)"}
                                    </p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-muted p-4 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>Rs. {selectedOrder.total - 250}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping Fee</span>
                                    <span>Rs. 250</span>
                                </div>
                                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">Rs. {selectedOrder.total}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MyOrders;
