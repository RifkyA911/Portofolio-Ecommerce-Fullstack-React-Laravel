import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductImage from "../section/ProductImage";

const ProductContent = () => {
  const products = useSelector((state) => state.products.products);
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  console.log(product);
  useEffect(() => {
    const filtered = products?.find((item) => item.id == slug);
    setProduct(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <section className="">
      <ProductImage product={product} />
      <div className="mx-8 relative mb-8">
        <h1 className="font-bold text-lg">{product?.title}</h1>
        <p className="font-heading text-lg opacity-90">
          $<span className="">{product.price}</span>
        </p>
        <div className="my-4">
          <p>Size :</p>
          <div className="flex gap-1 mt-2">
            <button className="w-12 h-12 border-gray-500 border-[1px] rounded-2xl">
              S
            </button>
            <button className="w-12 h-12 border-gray-500 border-[1px] rounded-2xl">
              M
            </button>
            <button className="w-12 h-12 border-gray-500 border-[1px] rounded-2xl">
              L
            </button>
            <button className="w-12 h-12 border-gray-500 border-[1px] rounded-2xl">
              XL
            </button>
          </div>
        </div>
        <div className="flex">
          <p>Select Color :</p>
          <select name="color" id="" className="text-center">
            <option value="red">Red</option>
            <option value="">Blue</option>
            <option value="">Green</option>
          </select>
        </div>
        <div className="my-4">
          <h3 className="font-bold">Description</h3>
          <p className="text-justify py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            culpa dolorem autem ratione, labore atque, error quae doloribus a
            alias consequatur sunt. Reiciendis rem distinctio incidunt, dicta
            veniam adipisci culpa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductContent;
