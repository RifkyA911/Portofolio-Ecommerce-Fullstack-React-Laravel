import { useSelector } from "react-redux";
import WishlistItem from "../card/WishlistItem";

const WishlistContent = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const products = useSelector((state) => state.products.products);
  const productWishlisted = products?.filter((item) =>
    wishlist?.find((wishlistItem) => item.id === wishlistItem.id)
  );
  return (
    <section className="flex flex-col md:flex-row md:gap-8 lg:gap-16 justify-between mt-4 mb-8">
      <div
        className={
          "w-full flex flex-wrap " +
          (productWishlisted.length > 0 ? "justify-start" : "justify-center")
        }
      >
        {productWishlisted.length > 0 &&
          productWishlisted.map((item, index) => (
            <WishlistItem key={index} item={item} />
          ))}
        {productWishlisted.length === 0 && (
          <p className="my-8 text-center">No items</p>
        )}
      </div>
    </section>
  );
};

export default WishlistContent;
