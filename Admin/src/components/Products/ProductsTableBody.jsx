import { useContext, useEffect, useRef, useState } from "react";
import Barcode from "react-jsbarcode";
import { motion } from "framer-motion";
import { MotionButton } from "../Button";
import { Resizer } from "react-image-file-resizer";
import { MyTableFilterContext } from "../Table/MyTableComponents";
import { MuiIcon } from "../../utils/RenderIcons";
import { CurrencyFormatter } from "../../utils/Formatter";
import ReactSlider from "react-slider";
import { NumberInput } from "../Form";
import { isClickedOutside } from "../../utils/Solver";

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;
const ServerAPIProductsImg = import.meta.env.VITE_API_ID_PRODUCT + "/image/";

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
                    src={`${ServerAPIProductsImg}${inputData[0].id}`}
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
                          {CurrencyFormatter(inputData[0].price)}
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedItems, setSelectedItems] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  const MenuBoxRef = useRef(null);

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
    closeFunction,
    inputData,
    selectFilter,
    applyFilter,
    isDialogOpen,
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
            closeFunction;
            setValue("superAuthorizationPassword", null);
          }}
        ></div>
      )}
      <div
        ref={MenuBoxRef}
        className={`${
          !isDialogOpen.filter ? "hidden" : "block"
        } absolute bg-white w-[600px] min-h-[300px] top-11 left-0 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium`}
      >
        <div className="relative px-4 py-2 h-8 bg-slate-50 flex flex-row items-center">
          <MuiIcon iconName={"FilterListRounded"} fontSize={20} />
          <h1 className="text-center mx-2 font-roboto-bold">Filter</h1>
          <button
            // onClick={closeFunction}
            onClick={() => {
              closeFunction();
            }}
            className="absolute right-0 top-0 py-2 px-4 hover:bg-red-200 text-left"
          >
            <MuiIcon iconName={"CloseRounded"} fontSize={20} />
          </button>
        </div>
        <form
          autoComplete="off"
          className="flex flex-col px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="price-filter flex flex-col gap-4 border-b pb-4">
            <label className="pt-2 text-left text-base">
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
                  className="relative flex flex-col items-center -mt-2 xhover:-my-3 outline-none bg-opacity-30 "
                >
                  <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-6 h-6 hover:w-8 hover:h-8 transition-all delay-50 bg-white border-teal-500 border-[2px] rounded-full shadow-lg cursor-pointer"
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
                  className={`h-2 rounded-full cursor-pointer ${
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
            <div className="flex flex-row justify-between ">
              <NumberInput
                formContext={MyTableFilterContext}
                className={`flex gap-4 flex-col  w-full max-w-[250px]`}
                prefix="Rp. "
                label="Min. Price (IDR)"
                name="minPrice"
                limitDigits={MaxLimit}
                placeholder="Masukkan Harga"
                onInputChange={(value) => setMinPrice(value)}
              />
              <NumberInput
                formContext={MyTableFilterContext}
                className={`flex gap-4 flex-col  w-full max-w-[250px]`}
                prefix="Rp. "
                label="Max. Price (IDR)"
                name="maxPrice"
                limitDigits={MaxLimit}
                placeholder="Masukkan Harga"
                onInputChange={(value) => setMaxPrice(value)}
              />
            </div>
          </div>
          <div className="category-filter flex flex-col gap-2 border-b pb-2">
            <label className="pt-2 text-left text-base">
              <MuiIcon iconName="AutoAwesomeMosaicRounded" fontSize={16} />{" "}
              Category
            </label>
            {selectFilter ? (
              <div className="inline-flex justify-start flex-wrap gap-2">
                {selectFilter.map((select, index) => (
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
          <div className="py-2">
            <MotionButton
              formType="confirm"
              onClick={() => {
                setShowModal(false);
                refresh();
                clearData();
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};
