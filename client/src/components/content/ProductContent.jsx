import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductImage from "../section/ProductImage";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

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
          <section className="flex flex-col lg:flex-row flex-grow lg:flex-grow-0">
            <ProductImage image={product?.images[0]} />
            <div className="mx-8 relative mb-8 flex-grow lg:w-full">
              <h1 className="font-bold text-xl">{product?.title}</h1>
              <p className="font-heading text-xl opacity-90">
                $<span className="">{product?.price}</span>
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
                <select
                  name="color"
                  id=""
                  className="border-[1px] border-gray-600 ml-2"
                >
                  <option value="red">Red</option>
                  <option value="">Blue</option>
                  <option value="">Green</option>
                </select>
              </div>
              <div className="my-4">
                <h3 className="font-bold">Description</h3>
                <p className="text-justify py-2 overflow-hidden text-ellipsis break-words">
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Tempore, ducimus nemo dolor
                  repudiandae adipisci nisi quam fugit accusantium recusandae,
                  exercitationem illo quae tempora aliquid explicabo, pariatur
                  ullam facere. Consequuntur, architecto. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Labore adipisci, voluptas
                  repellat sunt reprehenderit perferendis, autem quidem incidunt
                  maiores quia magnam aut repudiandae perspiciatis laborum
                  deserunt vitae aliquam unde dicta!
                </p>
              </div>
            </div>
          </section>
          <div className="sticky bottom-4 left-0 mx-8 mt-auto flex gap-2">
            <button className="w-1/5 bg-red-500 py-4 rounded-3xl text-white flex justify-center">
              <span className="hidden md:block">Wishlist</span>
              <HeartIcon className="md:ml-1 w-6 h-6" />
            </button>
            <button className="w-4/5 bg-black py-4 rounded-3xl text-white flex justify-center">
              Add to Cart <ShoppingCartIcon className="ml-1 w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductContent;
