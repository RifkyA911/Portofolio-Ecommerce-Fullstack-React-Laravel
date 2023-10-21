import { PDFDownloadLink } from "@react-pdf/renderer";
import { MuiIcon } from "../../utils/RenderIcons";
import { GetDateTime } from "../../utils/Formatter";
import { ReactPDF } from "../Print";

export const MyTableHeaderPrint = (props) => {
  const {
    inputData,
    isDialogOpen,
    toggleSelect,
    setToggleSelect,
    setSelectedRows,
    closeFunction,
    handlePrint,
  } = props;
  return (
    <>
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
        {/*  FIXED AREA */}
        {toggleSelect && (
          <div className="drop-shadow-md py-2 fixed flex gap-12 left-1/2 -translate-x-1/2 transition-all duration-300 top-[10px] z-[50]">
            <button
              onClick={setDeleteModal}
              className="flex hover:mt-[2px] justify-center items-center btn min-h-0 py-2 h-10 text-white bg-gradient-to-tr from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none"
            >
              <MuiIcon iconName={"DeleteForeverSharp"} fontSize={20} />
              <span id="showDelete" className="options px-[4px]">
                Delete
              </span>
            </button>
            <button
              onClick={() => {
                setToggleSelect(false);
                setSelectedRows([]);
              }}
              className="flex hover:mt-[2px] justify-center items-center btn min-h-0 py-2 h-10 text-white bg-gradient-to-tr from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-orange-500 border-none"
            >
              <MuiIcon iconName={"ClearTwoTone"} fontSize={20} />
              <span id="showCancelDelete" className="options px-[4px]">
                Cancel
              </span>
            </button>
          </div>
        )}
        {/* BTN HEADER */}
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
              onClick={() => {
                // closeFunction();
                setToggleSelect;
                // setSelectedRows([]);
              }}
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
            >
              Test Select
            </button>

            <button
              onClick={closeFunction}
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
            >
              <PDFDownloadLink
                className=""
                document={<ReactPDF inputData={inputData} />}
                fileName={`products_${inputData[0].name}#${GetDateTime()}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Print Product"
                }
              </PDFDownloadLink>
            </button>
            <button
              className="py-2 px-4 w-full hover:bg-slate-200 text-left"
              onClick={closeFunction}
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
  const { setDeleteModal, toggleSelect, setToggleSelect, setSelectedRows } =
    props;
  return (
    <>
      {/*  FIXED AREA */}
      {toggleSelect && (
        <div className="drop-shadow-md py-2 fixed flex gap-12 left-1/2 -translate-x-1/2 transition-all duration-300 top-[10px] z-[50]">
          <button
            onClick={setDeleteModal}
            className="flex hover:mt-[2px] justify-center items-center btn min-h-0 py-2 h-10 text-white bg-gradient-to-tr from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none"
          >
            <MuiIcon iconName={"DeleteForeverSharp"} fontSize={20} />
            <span id="showDelete" className="options px-[4px]">
              Delete
            </span>
          </button>
          <button
            onClick={() => {
              setToggleSelect(false);
              setSelectedRows([]);
            }}
            className="flex hover:mt-[2px] justify-center items-center btn min-h-0 py-2 h-10 text-white bg-gradient-to-tr from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-orange-500 border-none"
          >
            <MuiIcon iconName={"ClearTwoTone"} fontSize={20} />
            <span id="showCancelDelete" className="options px-[4px]">
              Cancel
            </span>
          </button>
        </div>
      )}
      {/* BTN HEADER */}
      <button
        className={`mx-1 grow-0 shrink-0 focus:outline-none ${
          !toggleSelect
            ? "bg-red-500 hover:from-rose-500 hover:to-pink-500"
            : "bg-gray-500 hover:from-yellow-500 hover:to-orange-400"
        } hover:bg-gradient-to-r  rounded-md font-roboto-medium text-white items-center transition-all duration-200`}
        onClick={
          !toggleSelect
            ? () => setToggleSelect(true)
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
