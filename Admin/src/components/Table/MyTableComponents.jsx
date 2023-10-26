import { PDFDownloadLink } from "@react-pdf/renderer";
import { MuiIcon } from "../../utils/RenderIcons";
import { GetDateTime } from "../../utils/Formatter";
import { PrintReactPDF } from "../Print/Print";

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
