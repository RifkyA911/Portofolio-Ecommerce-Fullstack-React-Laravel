import { useEffect, useState } from "react";
// Components
import {
  isChatEnabled,
  handleCheckboxChange,
} from "./../Admins/AdminsTable.jsx"; //Delete after complate atomic
import { Modal } from "./../Modal";
// REDUX
import { useSelector } from "react-redux";
import { MyTablePagination } from "./MyTablePagination";
// UTILS
import { MuiIcon, IconsHi2 } from "../../utils/RenderIcons";
import fetchData from "../../utils/API/AsyncFetch";

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
        <div className="flex justify-center lg:justify-start w-full mb-4 lg:mb-0">
          <input
            type="text"
            placeholder="Cari Nama Admin"
            value={searchTerm}
            className="input input-bordered input-sm input-info w-[512px] max-w-lg focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center lg:justify-end w-80 mb-4 lg:mb-0">
          <button className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 p-2 rounded-md font-roboto-medium text-white items-center transition-all duration-200 ">
            <i className="font-xs">
              <MuiIcon iconName={"PrintSharp"} fontSize={20} />
            </i>
            <span className="font-base px-2">Print</span>
          </button>
          <button className="mx-1 grow-0 shrink-0 focus:outline-none bg-red-500 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 p-2 rounded-md font-roboto-medium text-white items-center transition-all duration-200 ">
            <i className="font-xs">
              <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
            </i>
            <span className="font-base px-2">Delete</span>
            {/* <i className="font-xs"><MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      /></i> */}
            {/* <span className="font-base px-2">Cancel</span> */}
          </button>
          <button
            className="mx-1 grow-0 shrink-0 focus:outline-none bg-blue-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 p-2 rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
            onClick={() => document.getElementById("AddAdmin").showModal()}
          >
            <i className="font-xs">
              <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
            </i>
            <span className="font-base px-2">New</span>
          </button>
          <button
            onClick={refresh}
            className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
          >
            <MuiIcon iconName={"FiberManualRecordTwoTone"} fontSize={20} />
          </button>
        </div>
        <Modal />
      </div>
      {/* TABLE */}
      <div
        className={`${BorderOuterTable} overflow-x-auto rounded-xl bg-white `}
      >
        <table className={`text-sm w-full `}>
          <thead
            className={`${BgOuterTable} cursor-pointer ${textColor} border-b-[2px] border-gray-300 font-roboto-regular antialiased`}
          >
            <tr className="">
              <th className="px-4" onClick={() => sortByColumn("id")}>
                <span className="text-[14px] relative">
                  <i className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
                    {sortBy === "id" &&
                      (sortOrder === "asc" ? (
                        <IconsHi2 iconName="HiArrowLongUp" className="" />
                      ) : (
                        <IconsHi2 iconName="HiArrowLongDown" className="" />
                      ))}
                  </i>
                </span>
              </th>
              <th className="px-2 hidden">
                <label>Select</label>
              </th>
              <th
                className="px-6 w-[600px]"
                onClick={() => sortByColumn("username")}
              >
                <div className="relative">
                  <span className="absolute left-0 text-[14px] bottom-[-10px]">
                    Admin Name
                  </span>
                  <i className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
                    {sortBy === "username" &&
                      (sortOrder === "asc" ? (
                        <IconsHi2 iconName="HiArrowLongUp" className="" />
                      ) : (
                        <IconsHi2 iconName="HiArrowLongDown" className="" />
                      ))}
                    {/* <span className="absolute left-0 text-[14px] bottom-[0px]">
                            {<IconsHi2 iconName="HiArrowsUpDown" className=""/>}
                          </span> */}
                  </i>
                </div>
              </th>
              <th className="w-28" onClick={() => sortByColumn("role")}>
                <div className="relative">
                  <span className="absolute left-4 text-[14px] bottom-[-10px] text-center">
                    Role
                  </span>
                  <p className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
                    {sortBy === "role" &&
                      (sortOrder === "asc" ? (
                        <IconsHi2 iconName="HiArrowLongDown" className="" />
                      ) : (
                        <IconsHi2 iconName="HiArrowLongUp" className="" />
                      ))}
                  </p>
                </div>
              </th>
              <th
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
              </th>
              <th
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
              </th>
            </tr>
          </thead>
          <tbody className={`${BgTable} `}>
            {searchResults.map((data, index) => (
              <Tr key={data.id || 1} className={`divide-y`}>
                <th
                  className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                >
                  {parseInt(data.id) == 0 ? parseInt(data.id) + 1 : data.id}
                </th>
                <Td className="w-2 hidden">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </Td>
                <Td className="px-8 w-[450px] py-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className="avatar "
                      onClick={() =>
                        document.getElementById("ShowPict").showModal()
                      }
                    >
                      <div className="mask mask-squircle w-16 h-16 cursor-pointer ">
                        <img
                          src={`./src/assets/admin_avatar/${data.pict}`}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className={`${textTable} pl-4 text-left`}>
                      <div className="font-bold line-clamp-2 font-roboto-regular">
                        {data.username}
                      </div>
                      <div className="mt-2 font-medium text-slate-500">
                        {data.email}
                      </div>
                    </div>
                  </div>
                </Td>
                <Td>
                  <p className="font-semibold font-roboto-regular text-slate-800">
                    {data.role == 0 ? "Super Admin" : "Admin"}
                  </p>
                </Td>
                {data.role == 1 ? (
                  <>
                    <td className="flex-1 px-8 lg:px-4 ">
                      <div className="w-full flex lg:flex-row justify-around items-center">
                        <input
                          type="checkbox"
                          className="toggle toggle-info m-2"
                          onChange={(e) =>
                            handleCheckboxChange(data.id, e.target.checked)
                          }
                          checked={isChatEnabled(data.authority)}
                        />
                        <input
                          type="checkbox"
                          className="toggle toggle-success m-2"
                          value={
                            JSON.parse(data.authority).sort_warehouse
                              ? true
                              : false
                          }
                        />

                        <input
                          type="checkbox"
                          className="toggle toggle-warning m-2"
                          value={
                            JSON.parse(data.authority).alter_price
                              ? true
                              : false
                          }
                        />
                      </div>
                    </td>
                    <td className="flex-1 px-8 lg:px-4 ">
                      <div className="w-full flex lg:flex-row justify-around items-center">
                        <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200">
                          <MuiIcon
                            iconName={"FiberManualRecordTwoTone"}
                            fontSize={20}
                          />
                        </button>
                        <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-sky-600 hover:to-indigo-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200">
                          <MuiIcon
                            iconName={"FiberManualRecordTwoTone"}
                            fontSize={20}
                          />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                  </>
                )}
              </Tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot className="">
            <tr>
              <td
                align="center"
                colSpan="5"
                className={`${BgOuterTable} ${textColor} h-12`}
              >
                <div className="">
                  <MyTablePagination items={data} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
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

export const Table = (props) => {
  return (
    <>
      <div></div>
    </>
  );
};
export const Thead = (props) => {
  const { element } = props;
  return (
    <>
      <thead
        className={`${BgOuterTable} cursor-pointer ${textColor} border-b-[2px] border-gray-300 font-roboto-regular antialiased`}
      >
        {element}
      </thead>
    </>
  );
};
export const Th = (props) => {
  const {
    title,
    name,
    key,
    className,
    sortBy,
    sortOrder = "asc",
    select,
    hidden,
    eventClick,
    modalHelper,
  } = props;
  function modalAccess(modalHelper) {
    !modalHelper
      ? document.getElementById(modalHelper).showModal()
      : console.log("no modal");
  }
  return (
    <>
      <th
        className="px-4"
        onClick={() => {
          // sortByColumn(sortBy);
          modalAccess();
          console.log("s");
        }}
      >
        <span className="text-[14px] relative">
          <i className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
            {sortBy === "id" &&
              (sortOrder === "asc" ? (
                <IconsHi2 iconName="HiArrowLongUp" className="" />
              ) : (
                <IconsHi2 iconName="HiArrowLongDown" className="" />
              ))}
          </i>
        </span>
      </th>
      <th className="px-2 hidden">
        <label>Select</label>
      </th>
      <th className="px-6 w-[600px]" onClick={sortBy}>
        <div className="relative">
          <span className="absolute left-0 text-[14px] bottom-[-10px]">
            {title}
            <i className="m-0 lg:mx-2 text-gray-400">
              <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
            </i>
          </span>
          <i className="absolute m-0 w-5 right-[-10px] top-[-10px] overflow-hidden text-lg">
            {sortBy === "username" &&
              (sortOrder === "asc" ? (
                <IconsHi2 iconName="HiArrowLongUp" className="" />
              ) : (
                <IconsHi2 iconName="HiArrowLongDown" className="" />
              ))}
          </i>
        </div>
      </th>
      <th className="p-7">fff</th>
      <th>fff</th>
    </>
  );
};
export const Tbody = (props) => {
  const { element } = props;
  return (
    <>
      <tbody>{element}</tbody>
    </>
  );
};
export const Tr = (props) => {
  const { element, key, className } = props;
  return (
    <>
      <tr key={key} className={className}>
        {props.children}
      </tr>
    </>
  );
};
export const Td = (props) => {
  const { element, className } = props;
  return (
    <>
      <td className={className}>{props.children}</td>
    </>
  );
};

export default MyTableEngine;
