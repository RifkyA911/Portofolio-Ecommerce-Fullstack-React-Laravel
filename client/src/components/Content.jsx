import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/api";
import { useSelector } from "react-redux";
import usePrevious from "./hooks/UsePrevious";

const Content = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const prevWishlistCount = usePrevious(wishlist.length || 0);
  const [isWishlistAdded, setIsWishlistAdded] = useState(false);

  useEffect(() => {
    fetchProducts((status, data) => {
      status ? setProducts(data.products) : console.log(data);
    });
    setShowAlert(false);
  }, []);

  useEffect(() => {
    const show = () => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    if (prevWishlistCount < wishlist.length) {
      setIsWishlistAdded(true);
      show();
    } else if (prevWishlistCount > wishlist.length) {
      setIsWishlistAdded(false);
      show();
    }
    return () => clearTimeout();
  }, [wishlist, prevWishlistCount]);

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
      <div
        className={`fixed w-full left-0 bottom-0 duration-300 ease-out p-4 flex justify-center items-center ${
          isWishlistAdded ? "bg-green-200" : "bg-red-200"
        }
        } ${showAlert ? "translate-y-0" : "translate-y-full"}`}
      >
        <p className={`${isWishlistAdded ? "text-green-600" : "text-red-500"}`}>
          {isWishlistAdded
            ? "Success added to wishlist!"
            : "Removed from wishlist"}
        </p>
      </div>
    </section>
  );
};

export default Content;
