import { useEffect, useState } from "react";
import { MuiIcon } from "../../utils/RenderIcons";
import { ConfirmButton } from "../Button";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ReactSlider from "react-slider";
import { formatToRupiah } from "../../utils/Formatter";

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

export const MyTableHeaderFilter = (props) => {
  const { inputData, isDialogOpen, closeFunction } = props;

  const [rangeValue, setRangeValue] = useState(40);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  useEffect(() => {
    // console.log(rangeValue);
  }, [rangeValue]);

  return (
    <>
      {/* BTN HEADER */}
      <button
        onClick={closeFunction}
        className="px-2 mr-2 bg-gray-200 text-black rounded-md"
      >
        <MuiIcon iconName={"FilterListRounded"} fontSize={20} />
      </button>
      <>
        <div
          className={`${
            !isDialogOpen.print ? "hidden" : "block"
          } absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.5px] p-20`}
          onClick={closeFunction}
        ></div>
        {inputData && inputData.length > 1 && inputData !== undefined ? (
          <div
            className={`${
              !isDialogOpen.filter ? "hidden" : "block"
            } absolute p-4 bg-white w-[600px] min-h-[300px] top-11 left-0 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium`}
          >
            <div className="relative h-8 bg-slate-50 flex flex-row items-center">
              <h1 className="text-center">Filter</h1>
              <button
                // onClick={closeFunction}
                onClick={() => {
                  closeFunction();
                }}
                className="absolute right-0 top-0 py-2 px-4 hover:bg-red-200 text-left"
              >
                X
              </button>
            </div>
            <h1 className="py-2 text-left">Rentang Harga</h1>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={20}
            />
            <ReactSlider
              className="horizontal-slider py-4"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[minPrice, maxPrice]}
              min={0}
              max={100000000} //100 jt
              pearling
              minDistance={10}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div
                  {...props}
                  style={{ ...props.style, zIndex: 20 }}
                  className="relative flex flex-col items-center -mt-2 xhover:-my-3 outline-none"
                >
                  <div className="w-6 h-6 hover:w-8 hover:h-8 transition-all delay-50 bg-white border-teal-500 border-[2px] rounded-full shadow-lg cursor-pointer"></div>
                  <div className="absolute top-0 hover:inline-block px-2 py-1 mb-2 -mt-8 text-xs text-white bg-gray-900 rounded-sm whitespace-nowrap">
                    {formatToRupiah(state.valueNow)}
                  </div>
                </div>
              )}
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`h-2 rounded-full cursor-pointer ${
                    state.index === 1
                      ? "bg-gradient-to-r from-green-500 via-lime-500 to-green-500 "
                      : "bg-indigo-100 z-10"
                  }`}
                />
              )}
              onChange={(props, state) => {
                // console.log(props);
                // console.log(state);
              }}
            />
            {/* <ConfirmButton confirmType="confirm" /> */}
          </div>
        ) : (
          <p>Loading</p>
        )}
      </>
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
        {inputData && inputData.length > 1 && inputData !== undefined ? (
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
