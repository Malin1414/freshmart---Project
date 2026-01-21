import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  Edit2,
  Plus,
  ArrowLeft,
  Search,
  X,
  Loader,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  availableQuantity: number;
  rating: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    availableQuantity: "",
    originalPrice: "",
    rating: "5",
    description: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProducts(token);
  }, [navigate]);

  const fetchProducts = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const url = editingId
        ? `http://localhost:5000/api/admin/products/${editingId}`
        : "http://localhost:5000/api/admin/products";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          availableQuantity: parseInt(formData.availableQuantity),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          rating: parseFloat(formData.rating),
        }),
      });

      if (!response.ok) throw new Error("Failed to save product");

      toast({
        title: "Success",
        description: editingId ? "Product updated" : "Product created",
      });

      setShowAddForm(false);
      setEditingId(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        availableQuantity: "",
        originalPrice: "",
        rating: "5",
        description: "",
      });

      fetchProducts(token);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast({
        title: "Success",
        description: "Product deleted",
      });

      fetchProducts(token);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      availableQuantity: product.availableQuantity.toString(),
      originalPrice: "",
      rating: product.rating.toString(),
      description: "",
    });
    setShowAddForm(true);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
          </div>
          <Button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingId(null);
              setFormData({
                name: "",
                category: "",
                price: "",
                availableQuantity: "",
                originalPrice: "",
                rating: "5",
                description: "",
              });
            }}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowAddForm(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Available Quantity</Label>
                <Input
                  name="availableQuantity"
                  type="number"
                  value={formData.availableQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Original Price</Label>
                <Input
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Rating</Label>
                <Input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-2">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  {editingId ? "Update Product" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.availableQuantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ⭐ {product.rating}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="w-4 h-4" />
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

export default AdminProducts;
