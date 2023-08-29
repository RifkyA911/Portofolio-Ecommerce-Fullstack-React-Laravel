import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/api";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./redux/productSlice";

const Content = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts((status, data) => {
      status ? dispatch(setProducts(data.products)) : console.log(data);
    });
  }, [dispatch]);

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
