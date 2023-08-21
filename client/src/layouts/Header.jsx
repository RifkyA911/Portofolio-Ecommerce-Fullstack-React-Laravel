import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full py-4 sticky top-0 bg-white h-full z-[5]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="mx-8 flex items-center justify-between">
        {isOpen ? (
          <button className="text-white z-10" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        ) : (
          <button onClick={() => setIsOpen((clicked) => !clicked)}>
            <Bars3Icon className="h-6 w-6" />
          </button>
        )}
        <div className="flex justify-between items-center gap-4">
          <button>
            <HeartIcon className="h-6 w-6 hover:fill-red-500 hover:text-red-600" />
          </button>
          <button>
            <ShoppingBagIcon className="h-6 w-6 hover:fill-yellow-200" />
          </button>
          <button>
            <UserIcon className="h-6 w-6 hover:fill-black" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
