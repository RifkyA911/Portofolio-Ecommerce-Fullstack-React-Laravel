import { useEffect, useRef, useState } from "react";
import Barcode from "react-jsbarcode";
import { MuiIcon } from "../../utils/RenderIcons";

const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;

export const ProductDetail = (props) => {
  let componentRef = useRef(null);

  const defineTable = {
    head: [
      "barcode",
      "name",
      "category",
      "price",
      "discount",
      "description",
      "created_at",
      "updated_at",
    ],
    body: [
      2323232,
      "kirara",
      "topi",
      35000,
      3,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et condimentum erat. consectetur adipiscing elit.",
      "created_at",
      "updated_at",
    ],
  };
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
          <main className="min-h-screen bg-white shadow-lg mx-auto h-[816px] w-[1054px]">
            <section
              className="min-h-[85vh] w-full p-4 lg:p-8 "
              ref={componentRef}
            >
              <div className="header flex flex-row w-full justify-between items-center max-h-[140px] overflow-hidden">
                <div className="order-first flex flex-row w-2/3 justify-start self-start">
                  <img
                    src="src\assets\logo.png"
                    alt="logo"
                    className="h-14 w-14 p-2 hidden sm:flex text-center"
                  />
                  <div className="mx-4 flex flex-col items-start ">
                    <h1 className="font-roboto-bold">Your Company Name</h1>
                    <small className="font-roboto-medium line-clamp-2">
                      Jl. Mayjend. Sungkono Blok B 1 no. 105 Surabaya 6025
                    </small>
                    <small>Phone: 031-5671868; Fax: 031-5664979</small>
                    <small>E-mail: drarya2006@gmail.com</small>
                  </div>
                </div>
                <div className="order-last flex flex-row w-1/3 justify-end self-start">
                  <div className="mx-4 flex flex-col justify-between items-end">
                    <h2 className="text-md font-roboto-medium">
                      Invoice : 2021/INV/017
                    </h2>
                    <div className="flex flex-col justify-between items-end">
                      <p className=" text-xs">
                        <span className="font-roboto-medium">Date : </span>
                        12/12/2000
                      </p>
                      <p className="text-xs">
                        <span className="font-roboto-medium">Admin : </span>
                        Silver Wolf IXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="body flex flex-row justify-between items-start m-8">
                <div className="flex w-1/2 justify-start">
                  <img
                    src="./src/assets/user_avatar/85d24f2a-2336-478d-9984-729a55e82db1.jpg"
                    alt="logo"
                    className="w-80 sm:flex text-center shadow-lg rounded-md"
                  />
                </div>
                <div className="flex w-1/2 justify-end">
                  <table className="w-full border-gray-600 font-roboto">
                    <tbody>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-16 w-36">Barcode</th>
                        <td className="bg-white text-center">
                          <Barcode
                            className={`xh-[70px] p-0 m-0 xmax-w-[150px] mx-auto`}
                            value={23232323}
                            options={{
                              displayValue: true,
                              height: 40,
                              fontSize: 12,
                            }}
                          />
                        </td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-16">Name</th>
                        <td className="bg-white text-left pl-8">Kirara</td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-16">Category</th>
                        <td className="bg-white text-left pl-8">Topi</td>
                      </tr>
                      <tr className="border-b-2">
                        <th className="bg-slate-300 h-16">Price</th>
                        <td className="bg-white text-left pl-8">Rp. 20,000</td>
                      </tr>
                      <tr className="">
                        <th className="bg-slate-300 h-16">Discount</th>
                        <td className="bg-white text-left pl-8">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-left p-12">
                <h4 className="font-poppins-bold">Description : </h4>
                <p className="font-roboto-regular">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  et condimentum erat. consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Donec et
                  condimentum erat. consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Donec et
                  condimentum erat. consectetur adipiscing elit.
                </p>
              </div>
              {/* <div className="print:hidden">
          <button
            onClick={handlePrint}
            className="btn bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 max-w-sm"
          >
            Print
          </button>
        </div> */}
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
