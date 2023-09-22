import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetails from "../section/ProductDetails";
import ProductDetailsButton from "../button/ProductDetailsButton";

const ProductContent = () => {
  const products = useSelector((state) => state.products.products);
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const filtered = products?.find((item) => item.id == slug);
    setProduct(filtered);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          Loading...
        </div>
      )}
      {!loading && (
        <>
          <ProductDetails product={product} />
          <ProductDetailsButton product={product} />
        </>
      )}
    </>
  );
};

export default ProductContent;
