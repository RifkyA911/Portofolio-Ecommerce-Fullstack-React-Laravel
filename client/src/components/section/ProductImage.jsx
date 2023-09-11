/* eslint-disable react/prop-types */

const ProductImage = ({ product }) => {
  return (
    <div className="flex justify-center mb-3">
      <img
        src={product?.images && product.images[0]}
        alt="img"
        className="h-full max-h-[300px]"
      />
    </div>
  );
};

export default ProductImage;
