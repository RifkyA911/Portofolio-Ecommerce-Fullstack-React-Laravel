import { MuiIcon } from "../../utils/RenderIcons";

export const ProductImage = (props) => {
  const { data, onProductPictureClick } = props;
  // console.table();
  const height = "w-[50px]";
  const maxHeight = "max-h-[50px]";
  return (
    <>
      <div
        className={`flex justify-center items-center ${maxHeight} overflow-hidden cursor-pointer`}
        onClick={onProductPictureClick}
      >
        <img
          src={`./src/assets/products/${data.pict}`}
          className={`${height} h-full text-center`}
        />
      </div>
    </>
  );
};
