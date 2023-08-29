const CartContent = () => {
  return (
    <section className="flex flex-col flex-wrap my-4">
      <div className="flex w-full gap-4 px-2 py-4">
        <div className="w-[40%]">
          <img
            src="Hero.jpg"
            alt=""
            className="rounded-xl w-full h-full object-cover object-center"
          />
        </div>
        <div className="w-[45%] flex flex-col space-y-2">
          <h3 className="text-xl break-words">JACKET PARKA</h3>
          <p className="font-heading font-bold text-xl flex-grow opacity-90">
            $<span className="text-2xl font-extrabold">1000</span>
          </p>
          <p>
            Size : <span className="font-bold">XL</span>
          </p>
        </div>
        <div className="w-[15%] flex items-center">
          <div className="flex flex-col items-center h-full justify-center rounded-3xl border-[1px] border-black border-dashed text-2xl">
            <button className="p-2 rounded-full">+</button>
            <input
              type="number"
              name=""
              id=""
              className="w-full text-center text-lg"
            />
            <button className="p-2 rounded-full">-</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartContent;
