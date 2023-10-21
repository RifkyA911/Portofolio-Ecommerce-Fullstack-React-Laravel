import { MuiIcon } from "../../utils/RenderIcons";
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;
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
          src={`${ServerProductsImg}${data.pict}`}
          className={`${height} h-full text-center`}
        />
      </div>
    </>
  );
};
