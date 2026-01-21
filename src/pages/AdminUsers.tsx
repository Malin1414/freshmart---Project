import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader,
  ArrowLeft,
  Search,
  Eye,
  Mail,
  Calendar,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UserDetails {
  user: User;
  orders: any[];
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (userId: string) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user details");

      const data = await response.json();
      setSelectedUser(data.data);
      setShowDetails(true);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load user details",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showDetails && selectedUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(false)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">User ID</p>
                <p className="text-lg text-gray-800 mt-2">{selectedUser.user._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="text-lg text-gray-800 mt-2">{selectedUser.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Role</p>
                <p className="text-lg text-gray-800 mt-2 capitalize">
                  {selectedUser.user.role}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined
                </p>
                <p className="text-lg text-gray-800 mt-2">
                  {new Date(selectedUser.user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Orders ({selectedUser.orders.length})
            </h2>

            {selectedUser.orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders found</p>
            ) : (
              <div className="space-y-4">
                {selectedUser.orders.map((order) => (
                  <div
                    key={order._id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Order: {order._id}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-gray-800">
                          ${order.total.toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "In Transit"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by email or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {user._id.substring(0, 12)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(user._id)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
