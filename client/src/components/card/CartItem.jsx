/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import QtyButton from "../button/QtyButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { removeFromCart } from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full gap-4 py-4">
      <button onClick={() => dispatch(removeFromCart(item))}>
        <TrashIcon className="w-6 h-6 text-red-400 hover:fill-red-400 hover:text-red-700" />
      </button>
      <div className="flex justify-center items-center w-[40%] md:w-1/3">
        <img
          src={item.images[0]}
          alt=""
          className="rounded-xl h-[100px] object-cover object-center"
        />
      </div>
      <div className="w-[45%] md:w-[55%] flex flex-col space-y-2">
        <h3 className="text-xl md:text-base lg:text-lg break-words">
          {item.title}
        </h3>
        <p className="font-heading font-bold text-xl flex-grow opacity-90">
          $<span className="text-2xl font-extrabold">{item.price}</span>
        </p>
        <p className="">
          Size :{" "}
          <span className="font-bold">{item.size ? item.size : "XL"}</span>
        </p>
      </div>
      <div className="w-[15%] flex items-center justify-end">
        <QtyButton item={item} />
      </div>
    </div>
  );
};

export default CartItem;
