import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

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
  const navigate = useNavigate();

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        // Show backend message if available
        toast({
          title: "Sign in failed",
          description: data?.error || "Invalid credentials",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Save user (or token in real app)
      localStorage.setItem("user", JSON.stringify(data.data));

      toast({
        title: "Signed in",
        description: "Welcome back!",
      });

      setIsLoading(false);
      navigate("/");
    } catch (err) {
      toast({
        title: "Network error",
        description: "Unable to reach server. Try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Fresh<span className="text-primary">Mart</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Sign in to your account
            </h1>
            <p className="text-muted-foreground">Enter your email and password to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`h-12 bg-card border-2 ${errors.email ? "border-destructive" : "border-border"} focus:border-primary transition-colors`}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
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
                  className={`h-12 bg-card border-2 pr-12 ${errors.password ? "border-destructive" : "border-border"} focus:border-primary transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            {/* Forgot password (dialog) */}
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset your password</DialogTitle>
                    <DialogDescription>
                      Enter your account email and we'll send a password reset link if the account exists.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // validate
                      const email = (e.currentTarget.elements.namedItem("resetEmail") as HTMLInputElement).value;
                      const schema = z.object({ email: z.string().trim().email("Please enter a valid email address").max(255) });
                      const res = schema.safeParse({ email });
                      if (!res.success) {
                        // show error toast
                        toast({ title: "Invalid email", description: res.error.errors[0].message, variant: "destructive" });
                        return;
                      }

                      try {
                        // show optimistic message
                        const resp = await fetch("/api/auth/forgot", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email }),
                        });

                        if (!resp.ok) {
                          const data = await resp.json().catch(() => ({}));
                          toast({ title: "Error", description: data?.error || "Unable to send reset email", variant: "destructive" });
                          return;
                        }

                        toast({ title: "Check your inbox", description: "If an account exists, you will receive an email with a reset link." });
                      } catch (err) {
                        toast({ title: "Network error", description: "Unable to reach server. Try again.", variant: "destructive" });
                      }
                    }}
                    className="mt-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail" className="text-foreground font-medium">
                        Email
                      </Label>
                      <Input id="resetEmail" name="resetEmail" type="email" placeholder="your@email.com" className="h-12 bg-card border-2 border-border focus:border-primary transition-colors" />
                    </div>

                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <button type="button" className="mr-2 rounded-md bg-muted px-4 py-2 text-sm">Cancel</button>
                      </DialogClose>
                      <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Send reset link</button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Welcome back</h2>
          <p className="text-primary-foreground/80 text-lg mb-10">Sign in to continue shopping with FreshMart.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
