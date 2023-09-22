/* eslint-disable react/prop-types */
import ProductImage from "./ProductImage";

const ProductDetails = ({ product }) => {
  return (
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
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tempore, ducimus nemo dolor repudiandae adipisci
            nisi quam fugit accusantium recusandae, exercitationem illo quae
            tempora aliquid explicabo, pariatur ullam facere. Consequuntur,
            architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Labore adipisci, voluptas repellat sunt reprehenderit perferendis,
            autem quidem incidunt maiores quia magnam aut repudiandae
            perspiciatis laborum deserunt vitae aliquam unde dicta!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
