import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight, Leaf, ShoppingBag, Heart, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in memory (not localStorage as per restrictions)
      const userData = { email: formData.email, loggedIn: true };
      
      toast({
        title: "✓ Welcome Back!",
        description: "You've successfully signed in to FreshMart",
      });

      setIsLoading(false);
      // In real app: navigate("/")
      console.log("Login successful:", userData);
    } catch (err) {
      toast({
        title: "Sign in failed",
        description: "Unable to reach server. Try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl"></div>

      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md">
         

          {/* Welcome Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h1 className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-gray-600 text-base">Sign in to continue your fresh shopping journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold text-sm">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-12 bg-white border-2 rounded-xl pl-4 pr-4 transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                        : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-semibold text-sm">
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
                    className={`h-12 bg-white border-2 rounded-xl pl-4 pr-12 transition-all duration-300 ${
                      errors.password 
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                        : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign in</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              {/* Sign Up Link */}
              <p className="text-sm text-gray-600 text-center pt-2">
                Don't have an account?{' '}
                <Link to="/signup" className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors">
                  Create account
                </Link>
              </p>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Protected Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Feature Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <h2 className="font-bold text-4xl text-white mb-4 leading-tight">
              Your Fresh Groceries,
              <br />
              <span className="text-white/90">Just a Click Away</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Join thousands of happy customers enjoying farm-fresh produce delivered to their doorstep.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:translate-x-2">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Wide Selection</h3>
                  <p className="text-white/70 text-sm">Over 5,000+ fresh products available daily</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:translate-x-2 delay-75">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Quality Guaranteed</h3>
                  <p className="text-white/70 text-sm">100% satisfaction or your money back</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:translate-x-2 delay-150">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Fast Delivery</h3>
                  <p className="text-white/70 text-sm">Same-day delivery available in your area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-white/70 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5K+</div>
              <div className="text-white/70 text-sm">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9</div>
              <div className="text-white/70 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .delay-75 {
          animation-delay: 75ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
      </div>
      <Footer />
    </>
  );
};

export default Login;