import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/api";
import Alert from "./Alert";

const Content = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts((status, data) => {
      status ? setProducts(data.products) : console.log(data);
    });
  }, []);

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
