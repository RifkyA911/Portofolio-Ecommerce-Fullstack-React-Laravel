import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Header = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(wishlist);
  }, [wishlist]);

  return (
    <header className="w-full py-4 sticky top-0 bg-white h-full z-[5]">
      <div className="max-w-screen-xl mx-auto">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="px-8 flex items-center justify-between">
          {isOpen ? (
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
          )}
          <div className="flex justify-between items-center gap-8">
            <div className="relative">
              <button className="w-full">
                <HeartIcon className="h-6 w-6 hover:fill-red-500 hover:text-red-600" />
              </button>
              <span className="absolute -top-1 -right-4 text-center w-4 h-4 rounded-full bg-yellow-200 text-xs cursor-default">
                {wishlist?.length}
              </span>
            </div>
            <button>
              <ShoppingBagIcon className="h-6 w-6 hover:fill-yellow-200" />
            </button>
            <button>
              <UserIcon className="h-6 w-6 hover:fill-black" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
