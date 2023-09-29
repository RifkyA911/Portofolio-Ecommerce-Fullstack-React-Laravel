import { createContext, useContext, useEffect, useState } from "react";
// Components
import {
  isChatEnabled,
  handleCheckboxChange,
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
import { MuiIcon, IconsHi2 } from "../../utils/RenderIcons";
import fetchData from "../../utils/API/AsyncFetch";
import { HeadRow } from "../Admins/AdminsTableHead.jsx";
import { TbSwitch2 } from "react-icons/tb";

const TableContext = createContext();

export const MyTableEngine = (props) => {
  const { inputData, refresh } = props;

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // REDUX
  const {
    BgColor,
    textTable,
    textColor,
    screenHeigth,
    screenWidth,
    BgTable,
    BgOuterTable,
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

  useEffect(() => {
    if (Array.isArray(inputData)) {
      setData(inputData);
    } else {
      console.error("Data input harus berupa array.");
      return 0;
    }
  }, []);

  useEffect(() => {
    // Filter data based on the search term
    const filteredData = data.filter((data) =>
      data.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, data]);

  const sortByColumn = (column) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle urutan
    setSortBy(column);
  };

  // const updateMyTableState = ({ newData, newSortOrder, newSortBy }) => {
  //   setData(newData);
  //   setSortOrder(newSortOrder); // Toggle urutan
  //   setSortBy(newSortBy);
  // };

  const updateMyTableState = (action) => {
    switch (action.type) {
      case "UPDATE_SORT":
        setData(action.payload.newData);
        setSortOrder(action.payload.newSortOrder); // Toggle urutan
        setSortBy(action.payload.newSortBy);
        break;
      // Tambahkan case lainnya jika diperlukan untuk aksi lainnya
      default:
        break;
    }
  };

  return (
    <>
      <TableContext.Provider
        value={{
          data,
          errorMessage,
          loading,
          searchTerm,
          searchResults,
          sortBy,
          sortOrder,
          updateMyTableState,
        }}
      >
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row my-2 lg:my-b w-full justify-between items-end overflow-x-hidden">
          <TableHeader
            searchTerm={searchTerm}
            setSearchTerm={(e) => setSearchTerm(e.target.value)}
            refresh={refresh}
          />
          <Modal />
        </div>
        {/* TABLE */}
        <h1>{sortBy}</h1>
        <div
          className={`${BorderOuterTable} overflow-x-auto rounded-xl bg-white `}
        >
          <Table className={`text-sm w-full `}>
            <Thead className={`${BgOuterTable} ${textColor} `}>
              <Tr Ukey="TableHead" className="">
                <Th2
                  name=""
                  filter={true}
                  column="id"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  className="px-4 border-r-2 border-slate-300"
                ></Th2>
                <Th className="px-2 hidden">
                  <label>Select</label>
                </Th>
                <Th
                  className="px-6 w-[600px]"
                  onClick={() => sortByColumn("username")}
                >
                  <ShowFilter
                    name="Admin Name"
                    currentHead="username"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </Th>
                <Th className="w-28" onClick={() => sortByColumn("role")}>
                  <ShowFilter
                    name="Role"
                    currentHead="role"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </Th>
                <Th
                  onClick={() =>
                    document.getElementById("TipsGrantAccess").showModal()
                  }
                  className="p-2 text-center lg:w-12 mx-auto"
                >
                  <span className="text-center pr-2">
                    Grant Features{" "}
                    <i className="m-0 lg:mx-2 text-gray-400">
                      <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
                    </i>
                  </span>
                </Th>
                <Th
                  onClick={() =>
                    document.getElementById("ConfirmDelete").showModal()
                  }
                  className="text-[14px] w-[160px]"
                >
                  <span>
                    Action{" "}
                    <i className="m-0 lg:mx-2 text-gray-400">
                      <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
                    </i>
                  </span>
                </Th>
              </Tr>
            </Thead>
            <Tbody className={`${BgTable} `}>
              {searchResults.map((row, index) => (
                <Tr Ukey={index} className={`divide-y`}>
                  <Th
                    className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                  >
                    {parseInt(row.id) == 0 ? parseInt(row.id) + 1 : row.id}
                  </Th>
                  <Td className="w-2 hidden">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </Td>
                  <Td className="px-8 w-[450px] py-2">
                    <ShowAdminName data={row} />
                  </Td>
                  <Td>
                    <ShowRole data={row} />
                  </Td>
                  {row.role == 1 ? (
                    <>
                      <Td className="flex-1 px-8 lg:px-4 ">
                        <AuthorityToggle data={row} />
                      </Td>
                      <Td className="flex-1 px-8 lg:px-4 ">
                        <ActionButton data={row} />
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
            <MyTablePagination
              items={data}
              BgOuterTable={BgOuterTable}
              textColor={textColor}
            />
          </Table>
        </div>
      </TableContext.Provider>
    </>
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

export const TableHeader = (props) => {
  const { searchTerm, setSearchTerm, refresh } = props;
  return (
    <>
      <div className="flex justify-center lg:justify-start lg:w-7/12 mb-4 lg:mb-0">
        <input
          type="text"
          placeholder="Cari Nama Admin"
          value={searchTerm}
          className="input input-bordered input-sm input-info lg:w-[512px] max-w-lg focus:outline-none"
          onChange={setSearchTerm}
        />
      </div>
      <div className="flex justify-center lg:justify-end lg:w-5/12 mb-4 lg:mb-0 lg:overflow-hidden overflow-x-scroll">
        <button className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 ">
          <i className="font-xs">
            <MuiIcon iconName={"PrintSharp"} fontSize={20} />
          </i>
          <span className="font-base px-2">Print</span>
        </button>
        <button className="mx-1 grow-0 shrink-0 focus:outline-none bg-red-500 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 ">
          <span id="showDelete" className="options">
            <i className="font-xs">
              <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
            </i>
          </span>
          <span className="font-base px-2">Delete</span>
          <span id="showCancelDelete " className="options hidden">
            <i className="font-xs ">
              <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
            </i>
            <span className="font-base px-2">Cancel</span>
          </span>
        </button>
        <button
          className="mx-1 grow-0 shrink-0 focus:outline-none bg-blue-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
          onClick={() => document.getElementById("AddAdmin").showModal()}
        >
          <i className="font-xs">
            <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
          </i>
          <span className="font-base px-2">Add</span>
        </button>
        <button
          onClick={refresh}
          className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 py-[6px] px-[6px] rounded-md font-roboto-medium text-white items-center "
        >
          <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
        </button>
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

export const ShowFilter = (props) => {
  const { name, currentHead, sortBy, sortOrder } = props;
  return (
    <div className="relative">
      <span className="absolute left-0 text-[14px] bottom-[-10px]">{name}</span>
      <i className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
        {sortBy === currentHead &&
          (sortOrder === "asc" ? (
            <IconsHi2 iconName="HiArrowLongUp" className="" />
          ) : (
            <IconsHi2 iconName="HiArrowLongDown" className="" />
          ))}
      </i>
    </div>
  );
};

export const Th2 = (props) => {
  const { data, errorMessage, sortOrder, sortBy, updateMyTableState } =
    useContext(TableContext);

  const { Ukey, name, filter, column, key, className, onClick, hidden } = props;

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
    console.log("state:", sortOrder);
    console.table("newState:", newSortedValue.newSortOrder);

    // Memanggil updateMyTableState dengan newSortedValue sebagai payload
    updateMyTableState({
      type: "UPDATE_SORT",
      payload: newSortedValue,
    });
  };
  return (
    <>
      {filter ? (
        <th
          key={Ukey}
          onClick={() => handleSortClick(column)}
          className={className}
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
          {props.children}
        </th>
      ) : (
        <th onClick={onClick} className={className}>
          {props.children}
        </th>
      )}
    </>
  );
};
export const Th = (props) => {
  const { Ukey, className, onClick, sortBy, sortOrder, hidden, event } = props;
  return (
    <>
      <th onClick={onClick} key={Ukey || 1} className={className}>
        {props.children}
      </th>
    </>
  );
};

export const Tbody = (props) => {
  const { element, Ukey, className, onClick, event } = props;
  return (
    <>
      <tbody className={className}>{props.children}</tbody>
    </>
  );
};
export const Tr = (props) => {
  const { element, Ukey, className, onClick, event } = props;
  return (
    <>
      <tr key={Ukey} className={`${className} divide-y`}>
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
