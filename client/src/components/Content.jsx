import ProductCard from "./ProductCard";

const Content = () => {
  return (
    <section className="my-8">
      <div>
        <h2 className="font-extrabold">NEW ARRIVALS</h2>
      </div>
      <div className="py-4 w-full flex flex-wrap justify-between items-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default Content;
