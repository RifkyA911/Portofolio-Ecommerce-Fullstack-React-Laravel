/* eslint-disable react/prop-types */

const ProductImage = ({ image }) => {
  return (
    <div className="flex justify-center items-center lg:ml-8 mb-8 w-full">
      <img src={image} alt="product_image" className="h-full max-h-[300px]" />
    </div>
  );
};

export default ProductImage;
