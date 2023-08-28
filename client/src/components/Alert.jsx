import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePrevious from "./hooks/UsePrevious";

const Alert = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state) => state.cart.cart);
  const prevWishlistCount = usePrevious(wishlist.length || 0);
  const [showAlert, setShowAlert] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const show = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
    return () => clearTimeout();
  };

  useEffect(() => {
    setAlertMsg("wishlist");
    if (prevWishlistCount < wishlist.length) {
      setIsAdding(true);
      show();
    } else if (prevWishlistCount > wishlist.length) {
      setIsAdding(false);
      show();
    }
  }, [wishlist, prevWishlistCount]);

  useEffect(() => {
    setShowAlert(true);
    setAlertMsg("cart");
    setIsAdding(true);
    show();
  }, [cart]);

  return (
    <div
      className={`fixed w-full left-0 bottom-0 duration-300 ease-out p-4 flex justify-center items-center ${
        isAdding ? "bg-green-200" : "bg-red-200"
      }
        } ${showAlert ? "translate-y-0" : "translate-y-full"}`}
    >
      <p className={`${isAdding ? "text-green-600" : "text-red-500"}`}>
        {isAdding
          ? `Success added to ${alertMsg}!`
          : `Removed from ${alertMsg}!`}
      </p>
    </div>
  );
};

export default Alert;
