import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="w-full py-4">
      <div className="mx-8 flex items-center justify-between">
        <button>
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="flex justify-between items-center gap-4">
          <button>
            <ShoppingBagIcon className="h-6 w-6" />
          </button>
          <button>
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
