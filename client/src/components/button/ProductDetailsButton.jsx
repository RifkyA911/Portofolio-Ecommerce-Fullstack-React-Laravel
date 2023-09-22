/* eslint-disable react/prop-types */
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

const ProductDetailsButton = ({ product }) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const isWishlisted = wishlist.find((item) => item.id === product.id);

  const addToWishlistHandle = (id) => {
    //cek wishlist contain product or not
    isWishlisted
      ? dispatch(removeFromWishlist({ id }))
      : dispatch(addToWishlist({ id }));
  };

  return (
    <div className="sticky bottom-4 left-0 mx-8 mt-auto flex gap-2">
      <button
        className="w-1/5 bg-red-500 py-4 rounded-3xl text-white flex justify-center"
        onClick={() => addToWishlistHandle(product?.id)}
      >
        <span className="hidden md:block">
          {isWishlisted ? "Wishlisted" : "Wishlist"}
        </span>
        <HeartIcon
          className={"md:ml-1 w-6 h-6 " + (isWishlisted && "fill-white")}
        />
      </button>
      <button
        className="w-4/5 bg-black py-4 rounded-3xl text-white flex justify-center"
        onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}
      >
        Add to Cart <ShoppingCartIcon className="ml-1 w-6 h-6" />
      </button>
    </div>
  );
};

export default ProductDetailsButton;
