const ProductCard = () => {
  return (
    <div className="basis-[49%] min-h-full my-3 flex flex-col justify-center items-center">
      <div>
        <img
          src="Hero.jpg"
          alt=""
          className="rounded-3xl w-[inherit] h-[inherit]"
        />
      </div>
      <p className="mt-2 font-extrabold text-base opacity-60">JACKET PARKA</p>
      <p className="font-heading font-extrabold text-base opacity-90">
        Rp. <span className="text-2xl font-extrabold">200,000</span>
      </p>
    </div>
  );
};

export default ProductCard;
