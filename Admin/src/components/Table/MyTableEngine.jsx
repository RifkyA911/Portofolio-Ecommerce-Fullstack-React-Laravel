import { createContext, useContext, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
// REDUX
import { useSelector } from "react-redux";
// Components
import {
  MyTableHeaderDelete,
  MyTableHeaderMenu,
  MyTableHeaderPrint,
} from "./MyTableComponents";
// UTILS
import { MuiIcon, IconsHi2 } from "../../utils/RenderIcons";
import { useReactToPrint } from "react-to-print";
import { SearchInput } from "../Form";

const TableContext = createContext();

export const MyTableEngine = (props) => {
  const {
    // Main Logic Table Component
    inputData,
    refresh,
    className,
    // Tab Header Table Component
    TabHeader = false,
    hideHeaderBtn = null,
    printBtn,
    searchTerm,
    setSearchTerm,
    setAddModal,
    setDeleteModal,
    // Sorting Table Component
    sortData,
    getSortBy = "id",
    getSortOrder = "asc",
    // Table Body
    toggleSelect,
    setToggleSelect,
    setSelectedRows,
    // Table Pagination
    TabPagination = false,
    colSpan = 2,
    paginate,
    onChangePaginate,
    rows,
    onRowsChange,
    length,
    // Children Tags
    children,
    // testing
    // sendDataToParent,
  } = props;

  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState(getSortBy);
  const [sortOrder, setSortOrder] = useState(getSortOrder);

  // REDUX
  const { BorderOuterTable } = useSelector((state) => state.UI);

  useEffect(() => {
    if (!Array.isArray(inputData)) {
      console.error("Data input harus berupa array.");
      return 0;
    }
  }, []);

  const updateMyTableState = (action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        setSortOrder(action.payload.newSortOrder); // Toggle urutan
        setSortBy(action.payload.newSortBy);
        sortData(action.payload.newData); // oper props ke parent
        // console.table("MYENGINETABLE:", action.payload.newData);
        break;
      default:
        break;
    }
  };
  let printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    // documentTitle: `${employee.name.replace(/\s/g, "-")}-Payslip`,
    documentTitle: `Payslip`,
    onPrintError: () => alert("there is an error when printing"),
  });
  return (
    <div className="relative">
      <TableContext.Provider
        value={{
          ...props,
          handlePrint,
          loading,
          errorMessage,
          sortBy,
          sortOrder,
          updateMyTableState,
        }}
      >
        {/* ------------- HEADER ------------- */}
        {TabHeader && (
          <>
            <MyTableHeader />
          </>
        )}
        {/* ------------- TABLE -------------*/}

        <div
          ref={printRef}
          className={`${BorderOuterTable} ${className} overflow-x-auto`}
        >
          <Table className={`text-sm w-full `}>
            {children}
            {TabPagination && <MyTablePagination />}
          </Table>
        </div>
      </TableContext.Provider>
    </div>
  );
};

export const MyTableHeader = (props) => {
  const {
    inputData,
    length,
    handlePrint,
    hideHeaderBtn,
    searchTerm,
    setSearchTerm,
    setAddModal,
    setDeleteModal,
    toggleSelect,
    setToggleSelect,
    setSelectedRows,
    refresh,
  } = useContext(TableContext);
  const [isDialogOpen, setDialogOpen] = useState({
    print: false,
    select: false,
  });

  return (
    <>
      <div
        // ref={targetRef}
        className="print:hidden flex flex-col lg:flex-row my-2 lg:my-b w-full justify-between items-end overflow-x-scroll focus:touch-pan-x"
      >
        <div className="relative flex justify-center lg:justify-start lg:w-6/12 mb-4 lg:mb-0">
          <button
            className="px-2 mr-2 bg-gray-200 text-black rounded-md"
            onClick={() =>
              setDialogOpen({ ...isDialogOpen, select: !isDialogOpen.select })
            }
          >
            <MuiIcon iconName={"FilterListRounded"} fontSize={20} />
          </button>
          <SearchInput func={setSearchTerm} />
        </div>
        <div className="flex justify-center lg:justify-end lg:w-6/12 mb-4 lg:mb-0 lg:overflow-hidden overflow-x-scroll">
          {hideHeaderBtn !== "printBtn" && !toggleSelect && (
            <MyTableHeaderPrint
              inputData={inputData}
              isDialogOpen={isDialogOpen}
              closeFunction={() => {
                setDialogOpen({
                  ...isDialogOpen,
                  print: !isDialogOpen.print,
                });
              }}
              handlePrint={handlePrint}
            />
          )}
          {hideHeaderBtn !== "deleteBtn" && (
            <MyTableHeaderDelete
              setDeleteModal={setDeleteModal}
              toggleSelect={toggleSelect}
              setToggleSelect={setToggleSelect}
              setSelectedRows={setSelectedRows}
            />
          )}
          {hideHeaderBtn !== "addBtn" && !toggleSelect && (
            <>
              <button
                className="mx-1 grow-0 shrink-0 focus:outline-none bg-blue-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
                onClick={setAddModal}
              >
                <i className="font-xs">
                  <MuiIcon
                    iconName={"LibraryAddRounded"}
                    className="  --transform-scale-x: -1"
                    fontSize={20}
                  />
                </i>
                <span className="font-base px-2">Add</span>
              </button>
            </>
          )}
          {hideHeaderBtn !== "refreshBtn" && (
            <>
              <button
                onClick={refresh}
                className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center "
              >
                <MuiIcon iconName={"RefreshRounded"} fontSize={20} />
              </button>
            </>
          )}
          {hideHeaderBtn !== "menuBtn" && (
            <MyTableHeaderMenu
              setDialogOpen={setDialogOpen}
              isDialogOpen={isDialogOpen}
              toggleSelect={toggleSelect}
              setToggleSelect={setToggleSelect}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const Table = (props) => {
  const { className, onClick, sortBy, sortOrder, hidden, event } = props;
  return (
    <>
      <table className={className}>{props.children}</table>
    </>
  );
};
export const Thead = (props) => {
  const { className, onClick, height, width, hidden, event } = props;
  return (
    <>
      <thead
        className={`${className} cursor-pointer border-b-[2px] border-gray-300 font-roboto-regular antialiased`}
      >
        {props.children}
      </thead>
    </>
  );
};

export const Th = (props) => {
  const {
    inputData,
    errorMessage,
    sortOrder = "asc",
    sortBy,
    updateMyTableState,
  } = useContext(TableContext);

  const {
    rowId,
    customKey,
    name,
    feature = null,
    column,
    className,
    onClick,
    onChange,
    hidden,
    children,
    selectedRows = false,
  } = props;

  const handleSortClick = (column) => {
    // Lakukan pengurutan atau manipulasi data sesuai kebutuhan Anda
    const sortedData = [...inputData].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortOrder === "desc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortOrder === "desc" ? 1 : -1;
      }
      return 0;
    });
    const newSortedValue = {
      newData: sortedData,
      newSortOrder: sortOrder === "asc" ? "desc" : "asc",
      newSortBy: column,
    };
    // console.log("Update Sort State:", sortOrder);

    // Memanggil updateMyTableState dengan newSortedValue sebagai payload
    updateMyTableState({
      type: "UPDATE_SORT",
      payload: newSortedValue,
    });
  };

  return (
    <>
      {!hidden && (
        <>
          {feature == "filter" && (
            <th
              key={customKey}
              onClick={() => handleSortClick(column)}
              className={`${className} min-h-[36px]`}
            >
              <div className="relative">
                <span className="absolute left-0 text-[14px] bottom-[-10px]">
                  {name}
                </span>
                <i className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
                  {sortBy === column &&
                    (sortOrder === "asc" ? (
                      <IconsHi2 iconName="HiArrowLongDown" className="" />
                    ) : (
                      <IconsHi2 iconName="HiArrowLongUp" className="" />
                    ))}
                </i>
              </div>
              {children}
            </th>
          )}
          {feature == "select" && (
            <th
              key={customKey}
              onChange={onChange}
              className={` ${className} min-h-[36px] w-0 p-0 text-center bg-slate-50 hover:bg-gray-200 transition-colors duration-75 cursor-pointer`}
            >
              {children}
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedRows.some((item) => item.id === rowId)}
                  onChange={() => {
                    // console.log(selectedRows);
                  }}
                />
              </label>
            </th>
          )}
          {feature == null && (
            <th
              key={customKey}
              onClick={onClick}
              className={`${className} min-h-[36px]`}
            >
              {name}
              {children}
            </th>
          )}
        </>
      )}
    </>
  );
};

export const Tbody = (props) => {
  const { element, className, onClick, event } = props;
  return (
    <>
      <tbody className={`${className}  `}>{props.children}</tbody>
    </>
  );
};
export const Tr = (props) => {
  const { errorMessage, toggleSelect, selectedRows, updateMyTableState } =
    useContext(TableContext);
  const { element, customKey, className, onClick, event } = props;
  return (
    <>
      <tr
        key={customKey}
        className={`relative ${className} ${
          toggleSelect
            ? "hover:bg-gray-200 transition-colors duration-75 cursor-pointer"
            : ""
        }`}
      >
        {props.children}
      </tr>
    </>
  );
};
export const Td = (props) => {
  const { element, className, onClick, event } = props;
  return (
    <>
      <td onClick={onClick} className={className}>
        {props.children}
      </td>
    </>
  );
};

export const MyTablePagination = (props) => {
  const { colSpan, paginate, onChangePaginate, rows, onRowsChange, length } =
    useContext(TableContext);

  const [currentPage, setCurrentPage] = useState(paginate);
  // const [headPage, setHeadPage] = useState(1);
  const [maxButtons, setMaxButtons] = useState(2);
  // const [tailPage, setTailPage] = useState(10);
  const [totalRows, setTotalRows] = useState(rows);
  const [totalItems, setTotalItems] = useState(length || 100); // temporary

  const totalPages = Math.ceil(totalItems / rows);
  // REDUX
  const {
    BgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

  // Batasi jumlah tombol maksimal menjadi 5.
  useEffect(() => {
    if (screenWidth < 400) {
      setMaxButtons(2);
    } else {
      setMaxButtons(5);
    }
  });

  useEffect(() => {
    setTotalItems(length);
    setTotalRows(rows);
    // console.log("length:", length, "rows:", rows);
  }, [length, rows]);

  // Inisialisasi array untuk menyimpan nomor halaman yang akan ditampilkan.
  const pageNumbers = [];

  // Tentukan awal dan akhir dari rentang tombol.
  let start = 1;
  let end = totalPages;

  // Jika totalPages lebih dari maxButtons, kita akan membatasi rentang tombol.
  if (totalPages > maxButtons) {
    const half = Math.floor(maxButtons / 2);

    if (currentPage <= half) {
      end = maxButtons;
    } else if (currentPage >= totalPages - half) {
      start = totalPages - maxButtons + 1;
    } else {
      start = currentPage - half + 1;
      end = currentPage + half;
    }
  }

  // Custom Pagination Handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Tambahkan tombol "Prev" jika currentPage bukan di halaman pertama.
  if (currentPage > 1) {
    pageNumbers.push(
      <button
        key="prev-btn" // Berikan key yang unik
        onClick={() => {
          handlePageChange(currentPage - 1);
          onChangePaginate(parseInt(currentPage - 1));
        }}
        disabled={currentPage === 1}
        className="px-4 py-2 hover:text-violet-500 cursor-pointer"
      >
        <MuiIcon iconName="ArrowBackIosNewTwoTone" fontSize={18} />
      </button>
    );
  }

  // Tambahkan tombol "..." jika currentPage bukan di halaman pertama.
  if (start > 1) {
    pageNumbers.push(
      <button
        key="left-dots-btn"
        onClick={() => {
          handlePageChange(1);
          onChangePaginate(parseInt(1));
        }}
        className="px-4 py-2 hover:bg-violet-300 rounded-lg transition-all duration-200"
      >
        ...
      </button>
    );
  }

  // Buat tombol halaman dalam rentang yang ditentukan.
  for (let i = start; i <= end; i++) {
    pageNumbers.push(
      <button
        onClick={() => {
          if (i !== currentPage) {
            handlePageChange(i);
            onChangePaginate(parseInt(i));
          }
        }}
        key={i}
        className={`px-4 py-2 hover:bg-violet-300 rounded-lg transition-all duration-200 ${
          i === currentPage ? "bg-gray-300 text-black" : ""
        }`}
      >
        {i}
      </button>
    );
  }

  // Tambahkan tombol "..." jika currentPage bukan di halaman terakhir.
  if (end < totalPages) {
    pageNumbers.push(
      <button
        onClick={() => {
          handlePageChange(totalPages);
          onChangePaginate(parseInt(totalPages));
        }}
        key="right-dots-btn"
        className="px-4 py-2 hover:bg-violet-300 rounded-lg transition-all duration-200"
      >
        ...
      </button>
    );
  }

  // Tambahkan tombol "Next" jika currentPage bukan di halaman terakhir.
  if (currentPage < totalPages) {
    pageNumbers.push(
      <button
        key="next-btn"
        onClick={() => {
          handlePageChange(currentPage + 1);
          onChangePaginate(parseInt(currentPage + 1));
        }}
        disabled={currentPage === totalPages}
        className="px-3 py-2 hover:bg-violet-300 hover:text-gray-500 rounded-lg transition-all duration-20"
      >
        <MuiIcon iconName="ArrowForwardIosTwoTone" fontSize={18} />
      </button>
    );
  }

  useEffect(() => {
    setTotalItems(length);
    // console.log("pagin: ", rows);
  }, []);

  return (
    <>
      <tfoot className="print:hidden ">
        <tr>
          <td
            key={9999}
            align="center"
            colSpan={colSpan}
            className={`${BgOuterTable} ${textColor} `}
          >
            <div
              className={`${BgOuterTable} flex flex-wrap lg:flex-row h-auto lg:h-12 font-roboto-medium text-sm p-0 justify-center items-center`}
            >
              <div className="selector w-auto">
                <span className="px-4 font-roboto-regular text-xs lg:text-sm">
                  Rows per page:
                </span>
                <select
                  name="pagination"
                  className="text-black select select-bordered select-xs lg:select-sm text-dark cursor-pointer focus:outline-none text-xs lg:text-sm"
                  autoComplete="off"
                  value={rows}
                  onChange={(e) => {
                    onRowsChange(parseInt(e.target.value));
                    handlePageChange(1);
                    onChangePaginate(parseInt(1));
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={totalItems}>All</option>
                </select>

                <span className="px-4 text-xs lg:text-sm">
                  {currentPage * totalRows - totalRows + 1}-
                  {Math.min(currentPage * totalRows, totalItems)} of{" "}
                  {totalItems}
                </span>
              </div>
              <div className="navigate max-w-[420px] overflow-y-scroll text-xs lg:text-sm">
                {pageNumbers}
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default MyTableEngine;
