import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const adminLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = adminLoginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid admin credentials",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Store admin token
      localStorage.setItem("adminToken", data.data.token);
      localStorage.setItem("adminEmail", data.data.email);

      toast({
        title: "✓ Welcome Admin!",
        description: "You've successfully logged in to Admin Panel",
      });

      navigate("/admin/dashboard");
    } catch (err) {
      toast({
        title: "Connection Error",
        description: "Unable to reach server. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="text-gray-600 text-sm mt-2">Restricted Access - Authorized Personnel Only</p>
          </div>

          {/* Warning Banner */}
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">Admin credentials are required to access this panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Admin Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@freshmart.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`h-12 px-4 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`h-12 px-4 pr-12 bg-gray-50 border-2 rounded-lg focus:outline-none focus:bg-white transition ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Access Admin Panel"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-xs mt-6">
            This access is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};


export default AdminLogin;
