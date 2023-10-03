import { createContext, useContext, useEffect, useState, useRef } from "react";
// Components
import { Modal } from "./../Modal";
// REDUX
import { useSelector } from "react-redux";
// UTILS
import { usePDF } from "react-to-pdf";
import { MuiIcon, IconsHi2 } from "../../utils/RenderIcons";
import { TbSwitch2 } from "react-icons/tb";

const TableContext = createContext();

export const MyTableEngine = (props) => {
  const {
    inputData,
    refresh,
    TabHeader = false,
    searchTerm,
    setSearchTerm,
    sortData,
    getSortBy = "id",
    getSortOrder = "asc",
    children,
  } = props;

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState(getSortBy);
  const [sortOrder, setSortOrder] = useState(getSortOrder);

  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  // REDUX
  const { BorderOuterTable } = useSelector((state) => state.UI);

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  useEffect(() => {
    if (Array.isArray(inputData)) {
      setData(inputData);
    } else {
      console.error("Data input harus berupa array.");
      return 0;
    }
  }, []); // temp

  const updateMyTableState = (action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        setData(action.payload.newData);
        setSortOrder(action.payload.newSortOrder); // Toggle urutan
        setSortBy(action.payload.newSortBy);
        sortData(data); // oper props ke parent
        break;
      // Tambahkan case lainnya jika diperlukan untuk aksi lainnya
      default:
        break;
    }
  };
  // useEffect(() => {
  // }, [data]); // jalankan setiap state berubah

  // const toggleRowSelection = (id) => {
  //   setSelectedRows((prevSelectedRows) => ({
  //     ...prevSelectedRows,
  //     [id]: !prevSelectedRows[id],
  //   }));
  // };

  // const selectAllRows = () => {
  //   const allSelected = Object.values(selectedRows).every(
  //     (isSelected) => isSelected
  //   );
  //   const newSelectedRows = {};

  //   for (const item of data) {
  //     newSelectedRows[item.id] = !allSelected;
  //   }

  //   setSelectedRows(newSelectedRows);
  // };
  return (
    <div className="relative">
      <TableContext.Provider
        value={{
          data,
          errorMessage,
          loading,
          selectedRows,
          searchTerm,
          sortBy,
          sortOrder,
          updateMyTableState,
        }}
      >
        {/* HEADER */}
        {TabHeader && (
          <>
            <MyTableHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setToggleSelect={() =>
                setToggleSelect((prevtoggleSelect) => !prevtoggleSelect)
              }
              refresh={refresh}
            />
            <Modal />
          </>
        )}
        {/* TABLE */}

        <div
          className={`${BorderOuterTable} overflow-x-auto rounded-xl bg-white `}
        >
          {children}
        </div>
      </TableContext.Provider>
    </div>
  );
};

export const MyTableHeader = (props) => {
  const { searchTerm, setSearchTerm, selectedRows, setToggleSelect, refresh } =
    props;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    closeDialog();
  };
  return (
    <>
      <div
        ref={targetRef}
        className=" flex flex-col lg:flex-row my-2 lg:my-b w-full justify-between items-end overflow-x-scroll focus:touch-pan-x"
      >
        <div className="flex justify-center lg:justify-start lg:w-7/12 mb-4 lg:mb-0">
          <input
            type="text"
            placeholder="Find Data"
            value={searchTerm}
            className="input input-bordered input-sm input-info lg:w-[512px] max-w-lg focus:outline-none"
            onChange={setSearchTerm}
          />
        </div>
        <div className="flex justify-center lg:justify-end lg:w-5/12 mb-4 lg:mb-0 lg:overflow-hidden overflow-x-scroll">
          <button
            onClick={() => toPDF()}
            className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
          >
            <i className="font-xs">
              <MuiIcon iconName={"PrintSharp"} fontSize={20} />
            </i>
            <span className="font-base px-2">Print</span>
          </button>
          <button
            className="mx-1 grow-0 shrink-0 focus:outline-none bg-red-500 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
            onClick={() => document.getElementById("ConfirmDelete").showModal()}
          >
            {!selectedRows ? (
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
                <span
                  id="showCancelDelete "
                  className="options  py-[6px] px-[4px] hidden "
                >
                  <i className="font-xs ">
                    <MuiIcon iconName={"ClearTwoTone"} fontSize={20} />
                  </i>
                  <span className="font-base pr-2">Cancel</span>
                </span>
              </>
            )}
          </button>
          <button
            className="mx-1 grow-0 shrink-0 focus:outline-none bg-blue-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
            onClick={() => document.getElementById("AddAdmin").showModal()}
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
          <button
            onClick={refresh}
            className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center "
          >
            <MuiIcon iconName={"RefreshRounded"} fontSize={20} />
          </button>
          <button
            className="px-1 bg-white text-black rounded-md"
            onClick={() => setDialogOpen(!isDialogOpen)}
          >
            <MuiIcon iconName={"MoreVertRounded"} fontSize={20} />
          </button>
          {isDialogOpen && (
            <>
              <div
                className="absolute bg-transparent w-full h-full z-[9] cursor-wait rounded-lg backdrop-blur-[0.91px]"
                onClick={() => {
                  setDialogOpen(false);
                }}
              ></div>
              <div className="absolute  bg-white w-[140px] top-11 shadow-lg rounded-md border-[1px] outline-5 outline-offset-1 outline-gray-700 z-10 text-xs font-roboto-medium">
                <button
                  className="py-2 px-4 w-full hover:bg-slate-200 text-left"
                  onClick={() => {
                    setToggleSelect();
                    setDialogOpen(false);
                  }}
                >
                  {!selectedRows ? "Select Row" : "Cancel "}
                </button>
                <button
                  className="py-2 px-4 w-full hover:bg-slate-200 text-left line-through text-slate-500 cursor-not-allowed"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Export CSV
                </button>
              </div>
            </>
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
  const { data, errorMessage, sortOrder, sortBy, updateMyTableState } =
    useContext(TableContext);

  const {
    customKey,
    name,
    feature,
    column,
    className,
    onClick,
    onChange,
    hidden,
    children,
  } = props;

  const handleSortClick = (column) => {
    // Lakukan pengurutan atau manipulasi data sesuai kebutuhan Anda
    const sortedData = [...data].sort((a, b) => {
      // console.table("a:", a[column]);
      // console.table("b:", b[column]);
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
    console.log("Update Sort State:", sortOrder);
    // console.table("newState:", newSortedValue.newSortOrder);

    // Memanggil updateMyTableState dengan newSortedValue sebagai payload
    updateMyTableState({
      type: "UPDATE_SORT",
      payload: newSortedValue,
    });
  };

  // console.log(modalId);

  return (
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
      {feature == null && (
        <th
          key={customKey}
          onClick={onClick}
          className={`${className} min-h-[36px]`}
        >
          {children}
        </th>
      )}
      {feature == "select" && (
        <th
          key={customKey}
          onChange={onChange}
          className={`${className} min-h-[36px] w-0 p-0 text-center bg-slate-50 hover:bg-gray-200 transition-colors duration-75 cursor-pointer`}
        >
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
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
  const { data, errorMessage, selectedRows, updateMyTableState } =
    useContext(TableContext);
  const { element, customKey, className, onClick, event } = props;
  return (
    <>
      <tr
        key={customKey}
        className={`${className} ${
          selectedRows
            ? "hover:bg-gray-200 transition-colors duration-75 cursor-pointer"
            : ""
        } divide-y`}
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
      <td className={className}>{props.children}</td>
    </>
  );
};

export const MyTablePagination = (props) => {
  const { paginate, onChangePaginate, rows, onRowsChange, length } = props;

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
          i === currentPage ? "bg-gray-300" : ""
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
      <tfoot>
        <tr>
          <td
            key={9999}
            align="center"
            colSpan="5"
            className={`${BgOuterTable} ${textColor} `}
          >
            <div
              className={`${BgOuterTable} flex flex-wrap lg:flex-row h-auto lg:h-12 font-roboto-medium text-base p-0 justify-center items-center`}
            >
              <div className="selector w-auto">
                <span className="px-4 font-roboto-regular text-xs lg:text-base">
                  Rows per page:
                </span>
                <select
                  className="select select-bordered select-xs lg:select-sm text-dark cursor-pointer focus:outline-none text-xs lg:text-base"
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

                <span className="px-4 text-xs lg:text-base">
                  {currentPage * totalRows - totalRows + 1}-
                  {Math.min(currentPage * totalRows, totalItems)} of{" "}
                  {totalItems}
                </span>
              </div>
              <div className="navigate max-w-[420px] overflow-y-scroll text-xs lg:text-base">
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
