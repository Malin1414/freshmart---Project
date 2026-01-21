import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Leaf, User, LogOut } from "lucide-react";

import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, currentUser, logout } = useShop();
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/#FeaturedProducts" },
    { name: "Categories", href: "/#categories" },
    { name: "Shop All Product", href: "/products" },
    { name: "How it Works", href: "/#how-it-works" },
    { name: "Contact", href: "/#footer" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/" && location.hash === "") {
      return true;
    }
    if (path.includes("#")) {
      return location.pathname + location.hash === path;
    }
    if (path !== "/" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Fresh<span className="text-primary">Mart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                <Link to="/my-orders">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <Link to="/signup">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>
            {currentUser ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium">Hi, {currentUser.name}</span>
                <Button size="sm" variant="outline" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/signup">
                <Button className="hidden md:flex" size="sm">
                  Sign Up
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive(link.href)
                      ? "text-primary bg-muted/50"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="mt-4 mx-4">Sign Up</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
