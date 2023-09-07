import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartDetails from "./CartDetails";

const CartContent = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <section className="flex flex-col md:flex-row md:gap-8 lg:gap-16 justify-between my-4 min-h-[600px]">
      <div className="w-full">
        {cart.length > 0 &&
          cart.map((item, index) => <CartItem key={index} item={item} />)}
        {cart.length === 0 && <p className="my-8 text-center">No items</p>}
      </div>
      <CartDetails />
    </section>
  );
};

export default CartContent;
