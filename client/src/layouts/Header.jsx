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
import PageHeader from "./PageHeader";

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
          {location.pathname === "/" ? (
            <div className="flex justify-between items-center gap-8">
              <IconHeader data={wishlist} route="/wishlist" indicator={true}>
                <HeartIcon className="h-6 w-6 hover:fill-red-500 hover:text-red-500" />
              </IconHeader>
              <IconHeader data={cart} route="/cart" indicator={true}>
                <ShoppingBagIcon className="h-6 w-6 hover:fill-yellow-300" />
              </IconHeader>
              <IconHeader route="/profile">
                <UserIcon className="h-6 w-6 hover:fill-black" />
              </IconHeader>
            </div>
          ) : location.pathname === "/cart" ? (
            <PageHeader data={cart} title={"CART"} indicator={true}>
              <ShoppingBagIcon className="h-6 w-6 hover:fill-yellow-300" />
            </PageHeader>
          ) : location.pathname === "/wishlist" ? (
            <PageHeader data={wishlist} title={"WISHLIST"} indicator={true}>
              <HeartIcon className="h-6 w-6 hover:fill-yellow-300" />
            </PageHeader>
          ) : (
            <PageHeader title={"PROFILE"} indicator={false}>
              <UserIcon className="h-6 w-6 hover:fill-yellow-300" />
            </PageHeader>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
