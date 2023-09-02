/* eslint-disable react/prop-types */
import QtyButton from "./QtyButton";

const CartItem = ({ item }) => {
  return (
    <div className="flex w-full gap-4 px-2 py-4">
      <div className="w-[40%]">
        <img
          src="Hero.jpg"
          alt=""
          className="rounded-xl w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-[45%] flex flex-col space-y-2">
        <h3 className="text-xl break-words">{item.title}</h3>
        <p className="font-heading font-bold text-xl flex-grow opacity-90">
          $<span className="text-2xl font-extrabold">{item.price}</span>
        </p>
        <p>
          Size :{" "}
          <span className="font-bold">{item.size ? item.size : "XL"}</span>
        </p>
      </div>
      <div className="w-[15%] flex items-center">
        <QtyButton item={item} />
      </div>
    </div>
  );
};

export default CartItem;
