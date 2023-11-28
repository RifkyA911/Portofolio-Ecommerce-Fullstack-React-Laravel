import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MuiIcon } from "../../utils/RenderIcons";
import { useForm } from "react-hook-form";
import { TableContext } from "./MyTableEngine";
import { ProductFilter } from "../Products/ProductsTableBody";
import { MotionButton } from "../Button";
import { AdminFilter } from "../Admins/AdminsTableBody";
import { OrdersFilter } from "../Orders/OrdersTableBody";

export const MyTableFilterContext = createContext();

const SuperAdminKey = import.meta.env.VITE_SUPER_AUTHORIZATION_PASSWORD;
const ServerProductsImg = import.meta.env.VITE_SERVER_PUBLIC_PRODUCT;

export const MyTableHeaderFilter = (props) => {
  const {
    refresh,
    table,
    inputData,
    selectFilter,
    applyFilter,
    isDialogOpen,
    closeFunction,
    setTabPagination,
  } = props;

  const [clicked, setClicked] = useState(false);

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
  });

  const MyTableFilterContextValue = {
    clicked,
    setClicked,
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
  };

  return (
    <>
      {/* BTN HEADER */}
      <MotionButton
        type="button"
        className={
          clicked
            ? "mr-2 grow-0 shrink-0 focus:outline-none bg-red-200 hover:bg-red-400 hover:text-white text-black py-[6px] px-[4px] rounded-md font-roboto-medium items-center "
            : "mr-2 grow-0 shrink-0 focus:outline-none bg-gray-200 hover:bg-gray-300 text-black py-[6px] px-[4px] rounded-md font-roboto-medium items-center "
        }
        onClick={clicked ? refresh : closeFunction}
        icon={clicked ? "CgClose" : "MdFilterList"}
        noSpan
        style="p-0"
      />
      <MyTableFilterContext.Provider value={MyTableFilterContextValue}>
        {inputData && inputData.length > 0 && inputData !== undefined ? (
          <>
            {table === "admins" && <AdminFilter />}
            {table === "invoices" || (table === "orders" && <OrdersFilter />)}
            {table === "products" && <ProductFilter />}
          </>
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
      <MotionButton
        formType="print"
        type="button"
        onClick={closeFunction}
        className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center"
      />
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
      {!toggleSelect && (
        <MotionButton
          type="button"
          formType="delete"
          className={`mx-1 grow-0 shrink-0 focus:outline-none ${
            !toggleSelect
              ? "bg-red-500 hover:from-rose-500 hover:to-pink-500"
              : "bg-gray-500 hover:from-yellow-500 hover:to-orange-400"
          } hover:bg-gradient-to-r  rounded-md font-roboto-medium text-white items-center `}
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
        />
      )}
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
              Export Excel .xlsx
            </button>
          </div>
        </>
      )}
    </>
  );
};
