import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Shield, Lock, CheckCircle2, Sparkles, Leaf } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = schema.safeParse({ email });
    if (!result.success) {
      setErrors({ email: result.error.errors[0].message });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({ 
        title: "✓ Check your inbox", 
        description: "If an account exists, you will receive a reset link." 
      });
      
      setEmailSent(true);
      setIsLoading(false);
    } catch (err) {
      toast({ 
        title: "Network error", 
        description: "Unable to reach server. Try again.", 
        variant: "destructive" 
      });
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // In real app: navigate("/login")
    console.log("Navigate to login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8 group cursor-pointer" onClick={handleBackToLogin}>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Fresh<span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Mart</span>
          </span>
        </div>

        {!emailSent ? (
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden">
            {/* Decorative Top Bar */}
            <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
            
            <CardHeader className="pb-6 pt-8 px-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl">
                  <Lock className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-center text-base text-gray-600 mt-3">
                No worries! Enter your email and we'll send you reset instructions.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" /> 
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({});
                    }}
                    className={`h-12 bg-white border-2 rounded-xl px-4 transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                        : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Button 
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span>Send Reset Link</span>
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleBackToLogin}
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> 
                    Back to Login
                  </Button>
                </div>
              </form>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-green-700">Secure Process:</span> For your security, we'll only send the reset link if an account exists with this email.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Success State
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
            
            <CardContent className="px-8 py-10">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping"></div>
                    <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 p-5 rounded-2xl">
                      <CheckCircle2 className="w-16 h-16 text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Check Your Email
                    </h2>
                    <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    We've sent password reset instructions to
                  </p>
                  <p className="text-green-600 font-semibold text-lg">
                    {email}
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="space-y-3 text-left">
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      Next Steps:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span>Check your email inbox (and spam folder)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span>Click the reset link in the email</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span>Create a new secure password</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleBackToLogin}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Login
                  </Button>

                  <button
                    onClick={() => {
                      setEmailSent(false);
                      setEmail("");
                    }}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Didn't receive the email? Try again
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? <button className="text-green-600 font-semibold hover:underline">Contact Support</button>
        </p>
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
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;