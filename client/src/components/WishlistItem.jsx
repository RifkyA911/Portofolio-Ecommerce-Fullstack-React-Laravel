/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/outline";
import { removeFromWishlist } from "./redux/wishlistSlice";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full gap-4 py-4 sm:w-1/2 lg:w-1/4 px-4">
      <div className="flex justify-center items-center w-[40%] md:w-1/2">
        <img
          src={item.images[0]}
          alt=""
          className="h-[100px] object-cover object-center"
        />
      </div>
      <div className="w-[45%] md:w-1/2 flex flex-col space-y-2">
        <h3 className="text-xl md:text-base lg:text-lg break-words">
          {item.title}
        </h3>
        <p className="font-heading font-bold text-xl flex-grow opacity-90">
          $<span className="text-2xl font-extrabold">{item.price}</span>
        </p>
      </div>
      <button onClick={() => dispatch(removeFromWishlist(item))}>
        <HeartIcon className="w-6 h-6 text-red-400 fill-red-400 hover:fill-none hover:text-red-700" />
      </button>
    </div>
  );
};

export default WishlistItem;
