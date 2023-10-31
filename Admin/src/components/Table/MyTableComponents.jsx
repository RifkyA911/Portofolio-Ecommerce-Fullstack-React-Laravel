import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MuiIcon } from "../../utils/RenderIcons";
import { ConfirmButton } from "../Button";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ReactSlider from "react-slider";
import { formatToRupiah } from "../../utils/Formatter";
import { useForm } from "react-hook-form";
import { NumberInput, NumberInput2 } from "../Form";
import { TableContext } from "./MyTableEngine";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export const MyTableFilterContext = createContext();

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;

export const MyTableHeaderFilter = (props) => {
  const { inputData, applyFilter, isDialogOpen, closeFunction } = props;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [isHovered, setIsHovered] = useState(false);
  const MenuBoxRef = useRef(null);

  const MaxLimit = 1000000; //1 jt

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    setError,
    control,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      superAuthorizationPassword: SuperAdminKey,
    },
  });

  useEffect(() => {
    setValue("minPrice", minPrice);
    setValue("maxPrice", maxPrice);
  }, []);

  const MyTableFilterContextValue = {
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
  };
  const onSubmit = async (form) => {
    console.info("data form:", form);
    if (!form) {
      alert("there is no form to send");
    }
    await applyFilter(form);
    closeFunction();
  };
  return (
    <>
      {/* BTN HEADER */}
      <button
        onClick={closeFunction}
        className="px-2 mr-2 bg-gray-200 text-black rounded-md"
      >
        <MuiIcon iconName={"FilterListRounded"} fontSize={20} />
      </button>
      <MyTableFilterContext.Provider value={MyTableFilterContextValue}>
        {/* <div
          className={`${
            !isDialogOpen.filter ? "hidden" : "block"
          } absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.5px] p-20`}
          onClick={closeFunction}
        ></div> */}
        {inputData && inputData.length > 0 && inputData !== undefined ? (
          <div
            ref={MenuBoxRef}
            className={`${
              !isDialogOpen.filter ? "hidden" : "block"
            } absolute p-4 bg-white w-[600px] min-h-[300px] top-11 left-0 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium`}
          >
            <div className="relative h-8 bg-slate-50 flex flex-row items-center">
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
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="pt-2 text-left text-base">Rentang Harga</h1>
              {/* <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={20}
              /> */}

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
                        {formatToRupiah(state.valueNow)}
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
                <NumberInput2
                  formContext={MyTableFilterContext}
                  className={`flex gap-4 flex-col  w-full max-w-[250px]`}
                  prefix="Rp. "
                  label="Min. Price (IDR)"
                  name="minPrice"
                  limitDigits={MaxLimit}
                  placeholder="Masukkan Harga"
                  onInputChange={(value) => setMinPrice(value)}
                />
                <NumberInput2
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
              <ConfirmButton className={"btn-sm my-4 "} confirmType="confirm" />
            </form>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </MyTableFilterContext.Provider>
      {/* )} */}
    </>
  );
};

export const MyTableHeaderPrint = (props) => {
  const {
    inputData,
    showFixedBtn,
    setShowFixedBtn,
    isDialogOpen,
    setPrintModal,
    toggleSelect,
    setToggleSelect,
    setSelectedRows,
    closeFunction,
    handlePrint,
  } = props;
  return (
    <>
      {/* BTN HEADER */}
      <button
        onClick={closeFunction}
        className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
      >
        <i className="font-xs">
          <MuiIcon iconName={"PrintSharp"} fontSize={20} />
        </i>
        <span className="font-base px-2">Print</span>
      </button>

      {/* {isDialogOpen.print && (  ERROR, REACT PDF WONT WORK*/}
      <>
        <div
          className={`${
            !isDialogOpen.print ? "hidden" : "block"
          } absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.5px] p-20`}
          onClick={closeFunction}
        ></div>
        {inputData && inputData.length > 0 && inputData !== undefined ? (
          <div
            className={`${
              !isDialogOpen.print ? "hidden" : "block"
            } absolute bg-white w-[140px] top-11 right-[235px] shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium`}
          >
            <button
              // onClick={closeFunction}
              onClick={() => {
                setShowFixedBtn("PRINT");
                closeFunction();
                setToggleSelect(true);
                setSelectedRows([]);
              }}
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
            >
              Print Batch
            </button>
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
              onClick={() => {
                handlePrint();
                closeFunction();
              }}
            >
              Print Table
            </button>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </>
      {/* )} */}
    </>
  );
};

export const MyTableHeaderDelete = (props) => {
  const {
    setDeleteModal,
    showFixedBtn,
    setShowFixedBtn,
    toggleSelect,
    setToggleSelect,
    setSelectedRows,
  } = props;
  return (
    <>
      {/* BTN HEADER */}
      <button
        className={`mx-1 grow-0 shrink-0 focus:outline-none ${
          !toggleSelect
            ? "bg-red-500 hover:from-rose-500 hover:to-pink-500"
            : "bg-gray-500 hover:from-yellow-500 hover:to-orange-400"
        } hover:bg-gradient-to-r  rounded-md font-roboto-medium text-white items-center transition-all duration-200`}
        onClick={
          !toggleSelect
            ? () => {
                setShowFixedBtn("DELETE");
                setToggleSelect(true);
              }
            : () => {
                // setToggleSelect(false);
                setSelectedRows([]);
              }
        }
      >
        {!toggleSelect ? (
          <>
            <span id="showDelete" className="options  py-[6px] px-[4px]">
              <i className="font-xs">
                <MuiIcon iconName={"DeleteForeverSharp"} fontSize={20} />
              </i>
            </span>
            <span className="font-base pr-2">Delete</span>
          </>
        ) : (
          <>
            <span id="showCancelDelete" className="options py-[6px] px-[4px]">
              <i className="font-xs px-[4px]">
                <MuiIcon iconName={"DeselectRounded"} fontSize={20} />
              </i>
              <span className="font-medium pr-2">Select None</span>
            </span>
          </>
        )}
      </button>
    </>
  );
};

export const MyTableHeaderMenu = (props) => {
  const { setDialogOpen, isDialogOpen, toggleSelect, setToggleSelect } = props;
  return (
    <>
      <button
        className="px-1 bg-white text-black rounded-md"
        onClick={() =>
          setDialogOpen({
            ...isDialogOpen,
            select: !isDialogOpen.select,
          })
        }
      >
        <MuiIcon iconName={"MoreVertRounded"} fontSize={20} />
      </button>
      {isDialogOpen.select && (
        <>
          <div
            className="absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.91px]"
            onClick={() => {
              setDialogOpen({
                ...isDialogOpen,
                select: !isDialogOpen.select,
              });
            }}
          ></div>
          <div className="absolute  bg-white w-[140px] top-11 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium">
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
              onClick={() => {
                setToggleSelect(true);
                setDialogOpen({
                  ...isDialogOpen,
                  select: !isDialogOpen.select,
                });
              }}
            >
              {!toggleSelect ? "Select Row" : "Cancel Select"}
            </button>
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left line-through text-slate-500 cursor-not-allowed"
              onClick={() => {
                setDialogOpen({
                  ...isDialogOpen,
                  select: !isDialogOpen.select,
                });
              }}
            >
              Export CSV
            </button>
          </div>
        </>
      )}
    </>
  );
};
