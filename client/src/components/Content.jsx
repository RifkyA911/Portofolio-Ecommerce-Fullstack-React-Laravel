import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/api";

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
      <div className="py-4 w-full flex flex-wrap justify-start items-center">
        {products.length > 0 &&
          products.map((product, index) => {
            return <ProductCard product={product} key={index} />;
          })}
      </div>
    </section>
  );
};

export default Content;
