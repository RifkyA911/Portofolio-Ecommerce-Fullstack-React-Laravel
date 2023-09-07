import { useSelector } from "react-redux";

const CartDetails = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalItems = cart?.reduce((acc, item) => acc + item.qty, 0);
  const subTotal = cart?.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div
      className={
        "mt-auto md:mt-0 py-4 w-full md:w-[80%]" +
        (totalItems === 0 && " hidden")
      }
    >
      <div className="p-4 rounded-xl border-[1px] border-black border-dashed">
        <div className="flex items-center justify-between">
          <p>Subtotal Items ({totalItems})</p>
          <p className="font-heading text-2xl font-bold ">${subTotal}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping Fee</p>
          <p className="font-heading text-2xl font-bold ">$15</p>
        </div>
        <div className="mt-4 py-2 flex items-center justify-between border-t-[1px] border-black">
          <p>Total</p>
          <p className="font-heading text-2xl font-bold ">${subTotal + 15}</p>
        </div>
      </div>
      <button
        className="bg-black w-full text-white mt-4 py-4 rounded-3xl text-lg disabled:opacity-30"
        disabled={totalItems == 0 && true}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default CartDetails;
