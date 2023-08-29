import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useState } from "react";
import IconHeader from "../components/IconHeader";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state) => state.cart.cart);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 sticky top-0 bg-white h-full z-[5]">
      <div className="max-w-screen-xl mx-auto">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="px-8 flex items-center justify-between">
          {location.pathname === "/" ? (
            isOpen ? (
              <button
                className="text-white z-10"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            ) : (
              <button onClick={() => setIsOpen((clicked) => !clicked)}>
                <Bars3Icon className="h-6 w-6" />
              </button>
            )
          ) : (
            <button onClick={() => navigate("/")}>
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          )}
          <div className="flex justify-between items-center gap-8">
            <IconHeader data={wishlist} route="/wishlist">
              <HeartIcon className="h-6 w-6 hover:fill-red-500 hover:text-red-500" />
            </IconHeader>
            <IconHeader data={cart} route="/cart">
              <ShoppingBagIcon className="h-6 w-6 hover:fill-yellow-300" />
            </IconHeader>
            <button onClick={() => navigate("/profile")}>
              <UserIcon className="h-6 w-6 hover:fill-black" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
