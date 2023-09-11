import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import { useEffect } from "react";
import { fetchProducts } from "./api/api";
import { setProducts } from "./components/redux/productSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts((status, data) => {
      status ? dispatch(setProducts(data.products)) : console.log(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
