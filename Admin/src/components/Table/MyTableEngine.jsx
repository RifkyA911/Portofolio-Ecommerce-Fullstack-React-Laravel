import { createContext, useContext, useEffect, useState, useRef } from "react";
// Components
import {
  AuthorityToggle,
  ActionButton,
  ShowRole,
  ShowAdminName,
} from "../Admins/AdminsTableBody.jsx"; //Delete after complate atomic
import { Modal } from "./../Modal";
// REDUX
import { useSelector } from "react-redux";
import { MyTablePagination } from "./MyTablePagination";
// UTILS
import { usePDF } from "react-to-pdf";
import { MuiIcon, IconsHi2 } from "../../utils/RenderIcons";
import { HeadRow } from "../Admins/AdminsTableHead.jsx";
import { TbSwitch2 } from "react-icons/tb";

const TableContext = createContext();

export const MyTableEngine = (props) => {
  const { inputData, refresh, TabHeader = false, children } = props;

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // REDUX
  const {
    BgColor,
    textTable,
    textColor,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  useEffect(() => {
    if (Array.isArray(inputData)) {
      setData(inputData);
    } else {
      console.error("Data input harus berupa array.");
      return 0;
    }
  }, []); // temp

  useEffect(() => {
    // Filter data based on the search term
    const filteredData = data.filter((data) =>
      data.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, data]);

  const updateMyTableState = (action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        setData(action.payload.newData);
        setSortOrder(action.payload.newSortOrder); // Toggle urutan
        setSortBy(action.payload.newSortBy);
        console.log("Update Sort");
        break;
      // Tambahkan case lainnya jika diperlukan untuk aksi lainnya
      default:
        break;
    }
  };
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
          searchResults,
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
              setSearchTerm={(e) => setSearchTerm(e.target.value)}
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
          <Table className={`text-sm w-full `}>
            <Thead className={`${BgOuterTable} ${textColor} `}>
              <Tr key="TableHead" className="">
                <Th name="" column="id" feature="filter" className="px-4"></Th>
                <Th className="px-2 hidden">
                  <label>Select</label>
                </Th>
                <Th
                  name="Admin Name"
                  column="username"
                  feature="filter"
                  className="px-6 w-[600px]"
                ></Th>
                <Th
                  name="Role"
                  column="role"
                  feature="filter"
                  className="px-4 w-28"
                ></Th>
                <Th
                  name="Grant Features"
                  column="role"
                  onClick={() =>
                    document.getElementById("TipsGrantAccess").showModal()
                  }
                  className="p-2 text-center lg:w-12 mx-auto"
                >
                  Grant Features
                  <i className="m-0 lg:mx-2 text-gray-400">
                    <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
                  </i>
                </Th>
                <Th
                  name="Action"
                  column="action"
                  className="text-[14px] w-[160px]"
                >
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody className={`${BgTable} `}>
              {searchResults.map((row, index) => (
                <Tr
                  key={index}
                  customKey={index}
                  className={`${
                    selectedRows[row.id] ? "selected" : ""
                  } divide-y`}
                >
                  {!toggleSelect ? (
                    <Th
                      key={index}
                      feature={null}
                      className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                    >
                      {parseInt(row.id) == 0 ? parseInt(row.id) + 1 : row.id}
                    </Th>
                  ) : (
                    <Th
                      key={index}
                      feature={"select"}
                      onChange={() => console.log(index)}
                    ></Th>
                  )}
                  <Td className="px-8 w-[450px] py-2">
                    <ShowAdminName data={row} />
                  </Td>
                  <Td>
                    <ShowRole data={row} />
                  </Td>
                  {row.role == 1 ? (
                    <>
                      <Td className="flex-1 px-8 lg:px-4 ">
                        <AuthorityToggle data={row.authority} />
                      </Td>
                      <Td className="flex-1 px-8 lg:px-4 ">
                        <ActionButton
                          key={index}
                          data={row}
                          onClickDelete={() =>
                            document.getElementById("ConfirmDelete").showModal()
                          }
                        />
                      </Td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
            {/* foot */}
            {children}
          </Table>
        </div>
      </TableContext.Provider>
    </div>
  );
};

{
  /* <MyTableEngine>
                <Table>
                  <Thead>
                    <Th>
                      <Td></Td>
                    </Th>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td></Td>
                    </Tr>
                  </Tbody>
                  <Pagination />
                </Table>
              </MyTableEngine> */
}

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
  const { key, className, onClick, sortBy, sortOrder, hidden, event } = props;
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
    // console.log("state:", sortOrder);
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

export default MyTableEngine;
