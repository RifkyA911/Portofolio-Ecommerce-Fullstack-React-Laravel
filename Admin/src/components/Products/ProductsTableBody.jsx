import { useContext, useEffect, useRef, useState } from "react";
import Barcode from "react-jsbarcode";
import { motion } from "framer-motion";
import { MotionButton } from "../Button";
import { Resizer } from "react-image-file-resizer";
import { MyTableFilterContext } from "../Table/MyTableComponents";
import { MuiIcon, ReactIcons } from "../../utils/RenderIcons";
import { CurrencyFormatter, DateFormatter } from "../../utils/Formatter";
import ReactSlider from "react-slider";
import { NumberInput, SelectInput } from "../Form";
import { isClickedOutside } from "../../utils/Solver";

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;
const ServerAPIProductsImg = import.meta.env.VITE_API_ID_PRODUCT + "/image/";

// export const ProductDetail = (props) => {
//   const { inputData, onMouseEnter, onMouseLeave } = props;
//   let componentRef = useRef(null);

//   return (
//     <div
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//       className={`fixed top-20 bg-white shadow-lg mx-auto z-10 max-w-[760px] rounded-lg`}
//     >
//       <section className="w-full p-4 lg:p-8 " ref={componentRef}>
//         <div className="body flex flex-row justify-between items-start m-8">
//           <div className="flex w-1/2 justify-start">
//             <img
//               src={`${ServerAPIProductsImg}${inputData[0].id}`}
//               alt="logo"
//               className="w-60 sm:flex text-center shadow-lg rounded-md"
//             />
//           </div>
//           <div className="flex w-1/2 justify-end">
//             <table className="w-full border-gray-600 font-roboto">
//               <tbody className="text-center">
//                 <tr className="border-b-2">
//                   <th className="bg-slate-300 h-12 w-36">Barcode</th>
//                   <td className="bg-white text-center">
//                     <Barcode
//                       className={`p-0 m-0 mx-auto`}
//                       value={23232323}
//                       options={{
//                         displayValue: true,
//                         height: 30,
//                         fontSize: 12,
//                       }}
//                     />
//                   </td>
//                 </tr>
//                 <tr className="border-b-2">
//                   <th className="bg-slate-300 h-12">Name</th>
//                   <td className="bg-white">{inputData[0].name}</td>
//                 </tr>
//                 <tr className="border-b-2">
//                   <th className="bg-slate-300 h-12">Category</th>
//                   <td className="bg-white">{inputData[0].category.name}</td>
//                 </tr>
//                 <tr className="border-b-2">
//                   <th className="bg-slate-300 h-12">Price</th>
//                   <td className="bg-white">
//                     {CurrencyFormatter(inputData[0].price)}
//                   </td>
//                 </tr>
//                 <tr className="">
//                   <th className="bg-slate-300 h-12">Discount</th>
//                   <td className="bg-white">{inputData[0].discount}%</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="text-left p-12">
//           <h4 className="font-poppins-bold">Description : </h4>
//           <p className="font-roboto-regular">{inputData[0].description}</p>
//         </div>
//         <small>{inputData[0].visible ? "visible" : "invisible"}</small>
//       </section>
//     </div>
//   );
// };

export const ProductImage = (props) => {
  const { data, onProductPictureClick } = props;
  // console.table();
  const [resizedImages, setResizedImages] = useState([]);

  const resizeImages = (imageUrls) => {
    const resizedImagePromises = imageUrls.map((imageUrl) => {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          imageUrl,
          300, // Lebar yang diinginkan
          300, // Tinggi yang diinginkan
          "JPEG", // Format gambar yang diinginkan (misalnya, JPEG)
          100, // Kualitas gambar (0-100)
          0, // Rotasi (0 untuk tidak merotasi)
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });
    });

    useEffect(() => {
      resizeImages(
        `${ServerProductsImg}${data.pict ? data.pict : "not_found.jpg"}`
      );
    }, []);

    Promise.all(resizedImagePromises)
      .then((resizedImages) => {
        setResizedImages(resizedImages);
      })
      .catch((error) => {
        console.error("Error resizing images:", error);
      });
  };

  return (
    <>
      <div
        className={`flex justify-center items-center max-h-[50px] overflow-hidden cursor-pointer`}
        onClick={onProductPictureClick}
      >
        <img
          // src={`${ServerAPIProductsImg}${data.id ? data.id : "not_found.jpg"}`} // will cause too many req issue
          // src={`${ServerProductsImg}${data.pict ? data.pict : "not_found.jpg"}`}
          src={`${ServerProductsImg}${data.pict ? data.pict : "not_found.jpg"}`}
          className={`w-[50px] h-full text-center`}
        />
      </div>
    </>
  );
};

export const ProductFilter = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [date, setDate] = useState({
    start: "2000-01-01T01:00",
    end: DateFormatter("dateTimeLocale", null),
  });
  const [selectedItems, setSelectedItems] = useState([]);

  const { MenuBoxRef, labelRef } = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    errors,
    isValid,
    dirtyFields,
    watch,
    refresh,
    closeFunction,
    inputData,
    selectFilter,
    applyFilter,
    isDialogOpen,
    setTabPagination,
  } = useContext(MyTableFilterContext);

  const MaxLimit = 1000000; //1 jt

  useEffect(() => {
    setValue("minPrice", minPrice);
    setValue("maxPrice", maxPrice);
  }, []);

  const onSubmit = async (form) => {
    // console.info("data form:", form);
    if (!form) {
      alert("there is no form to send");
    }
    setValue("superAuthorizationPassword", SuperAdminKey);
    await applyFilter(form);
    closeFunction();
  };

  useEffect(() => {
    setValue("selectedFilter", selectedItems);
    // console.log(getValues("selectedFilter"));
  }, [selectedItems]);

  return (
    <>
      {isDialogOpen.filter && (
        <div
          className="absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.1px]"
          onClick={() => {
            closeFunction();
            // setValue("superAuthorizationPassword", null);
          }}
        ></div>
      )}
      <div
        ref={MenuBoxRef}
        className={`${
          !isDialogOpen.filter ? "hidden" : "block"
        } absolute bg-white w-[300px] md:w-[600px] min-h-[300px] top-11 left-0 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium`}
      >
        <div className="relative pl-4 py-2 h-8 bg-slate-50 flex flex-row justify-between items-center">
          <div className="inline-flex items-center">
            <MuiIcon iconName={"FilterListRounded"} fontSize={20} />
            <h1 className="text-center mx-2 font-roboto-bold">Filter</h1>
          </div>
          <div className="inline-flex items-center">
            <button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(100000);
                setSelectedItems([]);
                setDate({
                  start: "2000-01-01T01:00",
                  end: DateFormatter("dateTimeLocale", null),
                });
                setValue("minPrice", 0);
                setValue("maxPrice", 100000);
                setValue("date_start", "2000-01-01T01:00");
                setValue("date_end", DateFormatter("dateTimeLocale", null));
              }}
              className=" py-2 px-4 hover:bg-sky-200 text-left transition-all delay-50"
            >
              <ReactIcons iconName={"MdRefresh"} fontSize={20} />
            </button>
            <button
              onClick={() => {
                closeFunction();
                refresh();
                clearData();
              }}
              className=" py-2 px-4 hover:bg-red-200 text-left transition-all delay-50"
            >
              <MuiIcon iconName={"CloseRounded"} fontSize={20} />
            </button>
          </div>
        </div>
        <form
          autoComplete="off"
          className="flex flex-col px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="price-filter flex flex-col gap-4 pb-2">
            <label className="pt-2 text-left text-sm">
              <MuiIcon iconName="SellRounded" fontSize={16} /> Rentang Harga
            </label>
            <ReactSlider
              className="horizontal-slider py-4"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[0, 500000]}
              value={[minPrice, maxPrice]}
              min={0}
              max={MaxLimit}
              pearling
              minDistance={100000}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div
                  {...props}
                  style={{ ...props.style, zIndex: 20 }}
                  className="relative flex flex-col items-center -mt-2 outline-none bg-opacity-30 p-0"
                >
                  <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="p-0 w-5 h-5 transition-all delay-50 bg-white border-teal-500 border-[2px] rounded-full shadow-lg cursor-pointer"
                  ></div>
                  {isHovered && (
                    <div className="absolute top-0 hover:block px-2 py-1 mb-2 -mt-8 text-xs text-white bg-gray-900 rounded-sm whitespace-nowrap">
                      {CurrencyFormatter(state.valueNow)}
                    </div>
                  )}
                </div>
              )}
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`h-[4px] rounded-full cursor-pointer ${
                    state.index === 1
                      ? "bg-gradient-to-r from-green-500 via-lime-500 to-green-500 "
                      : "bg-green-100 z-10"
                  }`}
                />
              )}
              onChange={(newValue) => {
                setMinPrice(newValue[0]);
                setMaxPrice(newValue[1]);
                setValue("minPrice", newValue[0]);
                setValue("maxPrice", newValue[1]);
              }}
              // onChange={(props, state) => {
              //   // console.log(props);
              //   // console.log(state);
              // }}
            />
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <NumberInput
                formContext={MyTableFilterContext}
                className={`flex gap-4 flex-col  w-full max-w-[250px]`}
                prefix="Rp. "
                label="Min. Price (IDR)"
                labelSize="text-xs"
                name="minPrice"
                limitDigits={MaxLimit}
                placeholder="Masukkan Harga"
                style="h-[28px]"
                onInputChange={(value) => setMinPrice(value)}
              />
              <NumberInput
                formContext={MyTableFilterContext}
                className={`flex gap-4 flex-col  w-full max-w-[250px]`}
                prefix="Rp. "
                label="Max. Price (IDR)"
                labelSize="text-xs"
                name="maxPrice"
                limitDigits={MaxLimit}
                placeholder="Masukkan Harga"
                style="h-[28px]"
                onInputChange={(value) => setMaxPrice(value)}
              />
            </div>
          </div>
          <div className="category-filter flex flex-col gap-4 pb-2">
            <label className="pt-2 text-left text-sm">
              <MuiIcon iconName="AutoAwesomeMosaicRounded" fontSize={16} />{" "}
              Category
            </label>
            {selectFilter ? (
              <div className="inline-flex justify-start flex-wrap gap-2">
                {selectFilter
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((select, index) => (
                    <MotionButton
                      key={select.id}
                      className={`p-2 ${
                        selectedItems.some((id) => id === select.id)
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 "
                      } rounded-lg hover:bg-green-600 capitalize hover:text-white transition-all delay-100`}
                      type="button"
                      onClick={() => {
                        !selectedItems.some((id) => id === select.id)
                          ? setSelectedItems([...selectedItems, select.id]) // add new value
                          : setSelectedItems(
                              selectedItems.filter((item) => item !== select.id) // remove by value
                            );
                      }}
                    >
                      {select.name}
                    </MotionButton>
                  ))}
              </div>
            ) : (
              "skelton"
            )}
          </div>
          <div className="date-filter flex flex-col gap-4 pt-2 pb-2">
            <div className="text-sm inline-flex justify-start items-center w-full gap-4">
              <label
                onClick={() => setFocus("selected_date")}
                className=" text-left  inline-flex items-center gap-2"
              >
                <ReactIcons iconName="newIoCalendarSharp" fontSize={16} />{" "}
                Rentang Waktu :
              </label>
              <select
                className="focus:outline-none cursor-pointer"
                {...register("date_type", {
                  required: "select date type",
                })}
                onChange={(e) => {
                  setValue("date_type", e.target.value);
                  // console.log("selected_date", ":", getValues("selected_date"));
                }}
              >
                <option value="created_at">Created Date</option>
                <option value="updated_at">Updated Date</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <SelectInput
                formContext={MyTableFilterContext}
                className={`w-full flex gap-4 flex-col `}
                label="Start"
                labelSize="text-xs"
                name="date_start"
                type="datetime-local"
                defaultValue={date.start}
              />
              <SelectInput
                formContext={MyTableFilterContext}
                className={`w-full flex gap-4 flex-col `}
                label="End"
                labelSize="text-xs"
                name="date_end"
                type="datetime-local"
                defaultValue={date.end}
              />
            </div>
          </div>
          <div className="py-2 mt-2 border-t flex flex-row justify-center">
            <MotionButton
              formType="confirm"
              onClick={() => {
                // setShowModal(false);
                setTabPagination(false);
                clearData();
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};
