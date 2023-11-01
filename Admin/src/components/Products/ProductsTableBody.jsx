import { useEffect, useRef, useState } from "react";
import Barcode from "react-jsbarcode";
import { MuiIcon } from "../../utils/RenderIcons";
import { formatToRupiah } from "../../utils/Formatter";

const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;

export const ProductDetail = (props) => {
  const { inputData } = props;
  let componentRef = useRef(null);

  // console.log(props);
  return (
    <>
      {/* Ukuran kertas F4 dalam pixel (72 DPI) = 595 x 935 pixel 
      Ukuran kertas F4 dalam pixel (96 DPI) = 793 x 1247 pixel 
      Ukuran kertas F4 dalam pixel (150 DPI) = 1240 x 1948 pixel 
      Ukuran kertas F4 dalam pixel (300 DPI) = 2481 x 3897 pixel */}
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Product Detail</div>
        <div className="collapse-content">
          <main className=" bg-white shadow-lg mx-auto max-h-[600px] w-full overflow-scroll">
            <section className="w-full p-4 lg:p-8 " ref={componentRef}>
              <div className="body flex flex-row justify-between items-start m-8">
                <div className="flex w-1/2 justify-start">
                  <img
                    src={`${ServerProductsImg}${inputData[0].pict}`}
                    alt="logo"
                    className="w-60 sm:flex text-center shadow-lg rounded-md"
                  />
                </div>
                <div className="flex w-1/2 justify-end">
                  <table className="w-full border-gray-600 font-roboto">
                    <tbody>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-12 w-36">Barcode</th>
                        <td className="bg-white text-center">
                          <Barcode
                            className={`p-0 m-0 mx-auto`}
                            value={23232323}
                            options={{
                              displayValue: false,
                              height: 30,
                              fontSize: 12,
                            }}
                          />
                        </td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-12">Name</th>
                        <td className="bg-white text-left pl-8">
                          {inputData[0].name}
                        </td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-12">Category</th>
                        <td className="bg-white text-left pl-8">
                          {inputData[0].category.name}
                        </td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-12">Price</th>
                        <td className="bg-white text-left pl-8">
                          {formatToRupiah(inputData[0].price)}
                        </td>
                      </tr>
                      <tr className="">
                        <th className="bg-slate-300 h-12">Discount</th>
                        <td className="bg-white text-left pl-8">
                          {inputData[0].discount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-left p-12">
                <h4 className="font-poppins-bold">Description : </h4>
                <p className="font-roboto-regular">
                  {inputData[0].description}
                </p>
              </div>
              <small>{inputData[0].visible ? "visible" : "invisible"}</small>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

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
