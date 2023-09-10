/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCartQty } from "./redux/cartSlice";

const QtyButton = ({ item }) => {
  const [value, setValue] = useState(item.qty ? item.qty : 1);
  const dispatch = useDispatch();

  const handleMinusButton = () => {
    if (value > 1) {
      setValue(value - 1);
      dispatch(decreaseCartQty({ ...item }));
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-center rounded-3xl border-[1px] border-black border-dashed text-2xl px-2">
      <button
        className="p-2 rounded-full"
        onClick={() => {
          setValue(value + 1);
          dispatch(addToCart({ ...item }));
        }}
      >
        +
      </button>
      <span className="w-full text-lg text-center">{value}</span>
      <button className="p-2 rounded-full" onClick={() => handleMinusButton()}>
        -
      </button>
    </div>
  );
};

export default QtyButton;
