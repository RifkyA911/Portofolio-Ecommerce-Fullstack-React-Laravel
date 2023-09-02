import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartContent = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <section className="flex flex-col flex-wrap my-4">
      {cart.length > 0 &&
        cart.map((item, index) => <CartItem key={index} item={item} />)}
    </section>
  );
};

export default CartContent;
