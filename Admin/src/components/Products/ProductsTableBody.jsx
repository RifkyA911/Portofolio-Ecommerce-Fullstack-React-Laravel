import { MuiIcon } from "../../utils/RenderIcons";

export const ProductImage = (props) => {
  const { data, onProductPictureClick } = props;
  console.table();
  return (
    <>
      <div
        className="flex justify-center items-center max-h-[100px] overflow-hidden"
        onClick={onProductPictureClick}
      >
        <img
          src={`./src/assets/products/${data.pict}`}
          className="w-[100px] h-full text-center"
        />
      </div>
    </>
  );
};
