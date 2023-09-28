import { useEffect, useState } from "react";
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

export const MyTableEngine = (props) => {
  const { inputData, refresh } = props;

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");

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
    setData(inputData);
  }, []);

  useEffect(() => {
    // Filter data based on the search term
    const filteredData = data.filter((data) =>
      data.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, data]);

  const SelectFilter = (props) => {
    const { name, currentHead, sortBy, sortOrder } = props;
    return (
      <div className="relative">
        <span className="absolute left-0 text-[14px] bottom-[-10px]">
          {name}
        </span>
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

  return (
    <>
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
      <div
        className={`${BorderOuterTable} overflow-x-auto rounded-xl bg-white `}
      >
        <Table className={`text-sm w-full `}>
          <Thead className={`${BgOuterTable} ${textColor} `}>
            <Tr className="">
              <Th className="px-4" onClick={() => sortByColumn("id")}>
                {/* {selectFilter("", "id", sortBy, sortOrder)} */}
                <SelectFilter
                  name=""
                  currentHead="id"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </Th>
              <Th className="px-2 hidden">
                <label>Select</label>
              </Th>
              <Th
                className="px-6 w-[600px]"
                onClick={() => sortByColumn("username")}
              >
                {/* {selectFilter("Admin Name", "username", sortBy, sortOrder)} */}
                <SelectFilter
                  name="Admin Name"
                  currentHead="username"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </Th>
              <Th className="w-28" onClick={() => sortByColumn("role")}>
                {/* {selectFilter("Role", "role", sortBy, sortOrder)} */}
                <SelectFilter
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
              <Tr key={row.id} className={`divide-y`}>
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
export const Th = (props) => {
  const { key, className, onClick, sortBy, sortOrder, hidden, event } = props;
  return (
    <>
      <th onClick={onClick} key={key || 1} className={className}>
        {props.children}
      </th>
    </>
  );
};

export const Tbody = (props) => {
  const { element, key, className, onClick, event } = props;
  return (
    <>
      <tbody className={className}>{props.children}</tbody>
    </>
  );
};
export const Tr = (props) => {
  const { element, key, className, onClick, event } = props;
  return (
    <>
      <tr key={key} className={`${className} divide-y`}>
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
