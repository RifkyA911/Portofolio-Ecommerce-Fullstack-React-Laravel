/* eslint-disable react/prop-types */
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "./redux/wishlistSlice";
import IconButton from "./IconButton";
import { addToCart } from "./redux/cartSlice";

const ProductCard = ({ product }) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const addToWishlistHandle = (id) => {
    //cek wishlist contain product or not
    const isWishlisted = wishlist.find((item) => item.id === product.id);
    isWishlisted
      ? dispatch(removeFromWishlist({ id }))
      : dispatch(addToWishlist({ id }));
  };

  return (
    <div className="basis-1/2 lg:basis-1/4 px-4 py-6 rounded-3xl min-h-full mb-3 flex-col justify-center items-center hover:bg-gray-200">
      <div className="relative">
        <img
          src="Hero.jpg"
          alt=""
          className="rounded-3xl w-[inherit] h-[inherit]"
        />
        <button
          className="right-2 bottom-4 absolute flex items-center rounded-full bg-yellow-100"
          onClick={() => addToWishlistHandle(product.id)}
        >
          <HeartIcon
            className={
              "w-8 h-8 md:w-10 md:h-10 p-2 hover:scale-125 " +
              (wishlist.find((item) => item.id === product.id)
                ? "fill-red-500 text-red-500"
                : "fill-none")
            }
          />
        </button>
      </div>
      <div className="flex items-center justify-between relative px-2">
        <div>
          <p className="mt-2 font-extrabold text-base opacity-60">
            {product.title}
          </p>
          <p className="font-heading font-extrabold text-base opacity-90">
            $<span className="text-2xl font-extrabold">{product.price}</span>
          </p>
        </div>
        <IconButton
          text={"ADD"}
          onClick={() => dispatch(addToCart({ id: product.id, qty: 1 }))}
        >
          <ShoppingCartIcon className="w-4 h-4 md:w-6 md:h-6" />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCard;
