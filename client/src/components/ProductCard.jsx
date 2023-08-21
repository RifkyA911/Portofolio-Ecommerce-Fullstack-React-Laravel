import { HeartIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
  return (
    <a
      href="#"
      className="basis-[49%] px-4 py-6 rounded-3xl min-h-full mb-3 flex flex-col justify-center items-center hover:bg-gray-200"
    >
      <div className="relative">
        <img
          src="Hero.jpg"
          alt=""
          className="rounded-3xl w-[inherit] h-[inherit]"
        />
        <button className="right-4 bottom-4 absolute p-1 rounded-full bg-yellow-100 hover:bg-red-400">
          <HeartIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-2 font-extrabold text-base opacity-60">JACKET PARKA</p>
      <p className="font-heading font-extrabold text-base opacity-90">
        Rp. <span className="text-2xl font-extrabold">200,000</span>
      </p>
    </a>
  );
};

export default ProductCard;
