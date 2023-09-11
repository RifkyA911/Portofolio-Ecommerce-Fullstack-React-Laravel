import ProductCard from "../card/ProductCard";
import Alert from "../Alert";
import { useSelector } from "react-redux";

const Content = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <section className="my-8">
      <div>
        <h2 className="font-extrabold">NEW ARRIVALS</h2>
      </div>
      <div className="py-4 w-full h-full flex flex-wrap">
        {products.length > 0 &&
          products.map((product, index) => {
            return <ProductCard product={product} key={index} />;
          })}
      </div>
      <Alert />
    </section>
  );
};

export default Content;
