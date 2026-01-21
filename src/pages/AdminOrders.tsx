import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader,
  ArrowLeft,
  Search,
  ChevronDown,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  _id: string;
  userId: string;
  date: string;
  total: number;
  status: "Processing" | "In Transit" | "Delivered" | "Cancelled";
  items: string[];
  address: string;
  payment: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const statusColors: Record<string, string> = {
    Processing: "bg-yellow-100 text-yellow-800",
    "In Transit": "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    Processing: <Clock className="w-4 h-4" />,
    "In Transit": <Truck className="w-4 h-4" />,
    Delivered: <CheckCircle className="w-4 h-4" />,
    Cancelled: <Clock className="w-4 h-4" />,
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchOrders(token);
  }, [navigate]);

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    setUpdatingStatus(orderId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update order");

      toast({
        title: "Success",
        description: "Order status updated",
      });

      fetchOrders(token);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by Order ID or User ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() =>
                    setExpandedOrderId(
                      expandedOrderId === order._id ? null : order._id
                    )
                  }
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            Order ID: {order._id}
                          </p>
                          <p className="text-sm text-gray-600">
                            User: {order.userId}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                            statusColors[order.status]
                          }`}
                        >
                          {statusIcons[order.status]}
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-gray-800">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 mt-2 transition ${
                          expandedOrderId === order._id ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrderId === order._id && (
                  <div className="border-t px-6 py-4 bg-gray-50 space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">
                        Delivery Address
                      </Label>
                      <p className="text-gray-600 mt-1">{order.address}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-700">
                        Payment Method
                      </Label>
                      <p className="text-gray-600 mt-1">{order.payment}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-700">
                        Items ({order.items.length})
                      </Label>
                      <ul className="mt-2 space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-gray-600 text-sm">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Update Status
                      </Label>
                      <div className="flex gap-2 flex-wrap">
                        {["Processing", "In Transit", "Delivered", "Cancelled"].map(
                          (status) => (
                            <Button
                              key={status}
                              variant={order.status === status ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleStatusChange(order._id, status)}
                              disabled={updatingStatus === order._id}
                              className={
                                order.status === status
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : ""
                              }
                            >
                              {updatingStatus === order._id ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                status
                              )}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
