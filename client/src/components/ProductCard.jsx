/* eslint-disable react/prop-types */
import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, setWishlist } from "./redux/wishlistSlice";

const ProductCard = ({ product }) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const addToWishlistHandle = (id) => {
    //cek wishlist contain product or not
    const isWishlisted = wishlist.find((item) => item.id === product.id);
    isWishlisted
      ? dispatch(setWishlist(wishlist.filter((item) => item.id !== id)))
      : dispatch(addToWishlist({ id }));
  };

  return (
    <div className="basis-1/2 lg:basis-1/4 px-4 py-6 rounded-3xl min-h-full mb-3 flex flex-col justify-center items-center hover:bg-gray-200">
      <div className="relative">
        <img
          src="Hero.jpg"
          alt=""
          className="rounded-3xl w-[inherit] h-[inherit]"
        />
        <button
          className="right-4 bottom-4 absolute rounded-full bg-yellow-100"
          onClick={() => addToWishlistHandle(product.id)}
        >
          <HeartIcon
            className={
              "w-8 h-8 p-1 hover:fill-red-400 hover:text-red-400 " +
              (wishlist.find((item) => item.id === product.id)
                ? "fill-red-400 text-red-400"
                : "fill-none")
            }
          />
        </button>
      </div>
      <p className="mt-2 font-extrabold text-base opacity-60">
        {product.title}
      </p>
      <p className="font-heading font-extrabold text-base opacity-90">
        $<span className="text-2xl font-extrabold">{product.price}</span>
      </p>
    </div>
  );
};

export default ProductCard;
