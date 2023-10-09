export const ProductImage = (props) => {
  const { data, onProductPictureClick } = props;
  console.table();
  return (
    <>
      <div
        className="flex justify-center items center"
        onClick={onProductPictureClick}
      >
        <img
          src={`./src/assets/products/${data.pict}`}
          className="w-[100px] text-center"
        />
      </div>
    </>
  );
};
