import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Products from "./pages/Products";
import MyOrders from "./pages/MyOrders";

import Checkout from "./pages/Checkout";


import { ShopProvider } from "./context/ShopContext";

const queryClient = new QueryClient();

import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Products />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  </QueryClientProvider>
);

export default App;
