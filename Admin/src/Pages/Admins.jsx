import { useEffect, useState } from "react";
// UI
import Skeleton from "@mui/material/Skeleton";
import { Container, Content } from "../Layout";
import {
  MuiIcon,
  getMuiIcon,
  getReactIconHi2,
  getReactIconsTb,
} from "../utils/RenderIcons";
// REDUX
import { useSelector } from "react-redux";
import { DangerAlert } from "../components/Alert";

export default function Admins(props) {
  const [admins, setAdmins] = useState([]);
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

  // Custom Const
  const URLadmins = import.meta.env.VITE_API_URL_GET_ALL_ADMIN;

  // console.log(URLadmins);
  useEffect(() => {
    setLoading(true);
    fetchData(URLadmins); //Asynx boss
  }, []);

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAdmins(data.data);
      setLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setLoading(false); // Set loading to false in case of error too
      console.error("Error fetching data:", error);
      setErrorMessage("Gagal mengambil data", error);
    }
  }

  useEffect(() => {
    // Filter admins based on the search term
    const filteredAdmins = admins.filter((admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredAdmins);
  }, [searchTerm, admins]);

  // console.table(admins); // Logging the updated admins here

  const sortByColumn = (column) => {
    const sortedAdmins = [...admins].sort((a, b) => {
      if (a[column] < b[column]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setAdmins(sortedAdmins);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle urutan
    setSortBy(column);
  };
  // console.log(sortedData);

  // Function to parse the authority string and return true/false for chat
  function isChatEnabled(authorityString) {
    const authorityObj = JSON.parse(authorityString);
    return authorityObj.chat === "true";
  }

  // Function to handle checkbox changes and update state
  function handleCheckboxChange(adminId, isChecked) {
    // PUT admin's authority
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) => {
        if (admin.id === adminId) {
          // Update the authority based on isChecked
          const newAuthority = JSON.parse(admin.authority);
          newAuthority.chat = isChecked ? "true" : "false";
          // Return a new admin object with updated authority
          return { ...admin, authority: JSON.stringify(newAuthority) };
        }
        return admin;
      })
    );
  }

  return (
    <>
      <Container>
        {loading == true ? (
          <div className="p-0 bg-white">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="p-4" />
            ))}
          </div>
        ) : (
          // <Content pageName={"Admins"}></Content>
          <div id="Admins" className="p-4 rounded-lg text-sm ">
            <div>
              {errorMessage && (
                <>
                  <DangerAlert
                    message={
                      <h1>
                        {getMuiIcon("SentimentVeryDissatisfied")} {errorMessage}
                      </h1>
                    }
                  />
                  <button
                    onClick={() => {
                      fetchData(URLadmins);
                      setLoading(true);
                    }}
                    className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                  >
                    {getMuiIcon("Refresh")}
                  </button>
                </>
              )}
            </div>
            {/* Baris 1 */}
            <div className="flex flex-col lg:flex-row my-2 lg:my-4 w-full justify-between items-end overflow-x-hidden">
              <div className="flex justify-center lg:justify-start w-full mb-4 lg:mb-0">
                <input
                  type="text"
                  placeholder="Cari Nama Admin"
                  value={searchTerm}
                  className="input input-bordered input-info w-[512px] max-w-lg "
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex justify-center lg:justify-end w-80 mb-4 lg:mb-0">
                <button className="mx-1 grow-0 shrink-0 focus:outline-none bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 p-2 rounded-md font-roboto-medium text-white items-center transition-all duration-200 ">
                  <i className="font-xs">{getMuiIcon("PrintSharp")}</i>
                  <span className="font-base px-2">Print</span>
                </button>
                <button className="mx-1 grow-0 shrink-0 focus:outline-none bg-red-500 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 p-2 rounded-md font-roboto-medium text-white items-center transition-all duration-200 ">
                  <i className="font-xs">{getMuiIcon("PersonRemove")}</i>
                  <span className="font-base px-2">Delete</span>
                  {/* <i className="font-xs">{getMuiIcon("CancelSharp")}</i> */}
                  {/* <span className="font-base px-2">Cancel</span> */}
                </button>
                <button
                  className="mx-1 grow-0 shrink-0 focus:outline-none bg-blue-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 p-2 rounded-md font-roboto-medium text-white items-center transition-all duration-200 "
                  onClick={() =>
                    document.getElementById("AddAdmin").showModal()
                  }
                >
                  <i className="font-xs">{getMuiIcon("PersonAdd")}</i>
                  <span className="font-base px-2">New</span>
                </button>
                <button
                  onClick={() => {
                    fetchData(URLadmins);
                    setLoading(true);
                  }}
                  className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                >
                  {getMuiIcon("Refresh")}
                </button>
              </div>
              <div className="list-modal"></div>
              <dialog id="AddAdmin" className={`${textColor} modal`}>
                <div className={`modal-box ${BgColor}`}>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Add Admin</h3>
                  <p className="py-4">
                    Press ESC key or click on ✕ button to close
                  </p>
                </div>
              </dialog>
              <dialog id="ShowPict" className={`${textColor} modal `}>
                <div
                  className={`modal-box ${BgColor} max-w-[550px] max-h-[600px] overflow-hidden`}
                >
                  <div className="flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg ">This Admin Name</h3>
                    <img
                      src="./src/assets/user_avatar/78949689_p3.jpg"
                      alt="Admin\src\assets\user_avatar\78949689_p6.jpg"
                      className="min-w-[470px] min-h-[470px] max-w-[470px] max-h-[470px] overflow-hidden"
                    />
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
              <div className="list-toast">
                <div className="toast toast-start z-[20]">
                  <div className="alert alert-success">
                    <span>New mail arrived.</span>
                  </div>
                  <div className="alert alert-error">
                    <span>Message sent successfully.</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Baris 2 */}
            <div className="admins-tooltips text-black lg:flex-row flex flex-col justify-center lg:border-0 border-t-2 border-slate-500 bg-slate-50 rounded-xl">
              <span className="lg:border-r-2 lg:border-slate-500 lg:pr-2 text-xs font-roboto-bold">
                <i className="text-info text-xs ">
                  {
                    <MuiIcon
                      iconName={"FiberManualRecordTwoTone"}
                      fontSize={20}
                    />
                  }
                </i>{" "}
                Chat
              </span>
              <span className="lg:border-r-2 lg:border-slate-500 lg:px-2 text-xs font-roboto-bold">
                <i className="text-warning text-xs ">
                  {
                    <MuiIcon
                      iconName={"FiberManualRecordTwoTone"}
                      fontSize={20}
                    />
                  }
                </i>{" "}
                Sort
              </span>
              <span className="lg:pl-2 text-xs font-roboto-bold">
                {" "}
                <i className="text-error text-xs ">
                  {
                    <MuiIcon
                      iconName={"FiberManualRecordTwoTone"}
                      fontSize={20}
                    />
                  }
                </i>{" "}
                Price
              </span>
            </div>
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
                        <i className="absolute m-0 w-5 right-[-8px] top-[-14px] overflow-hidden text-lg">
                          {sortBy === "id" &&
                            (sortOrder === "asc"
                              ? // ? getReactIconsTb("TbSortDescendingNumbers")
                                // : getReactIconsTb("TbSortAscendingNumbers"))}
                                getReactIconHi2("HiArrowLongUp")
                              : getReactIconHi2("HiArrowLongDown"))}
                        </i>
                      </span>
                    </th>
                    <th className="px-2 ">
                      <label>Pilih</label>
                    </th>
                    <th
                      className="px-6 w-[600px]"
                      onClick={() => sortByColumn("username")}
                    >
                      <div className="relative">
                        <span className="absolute left-0 text-[14px] bottom-[-10px]">
                          Admin Name
                        </span>
                        <i className="absolute right-0 bottom-[-12px]">
                          {sortBy === "username" &&
                            (sortOrder === "asc"
                              ? getReactIconHi2("HiArrowLongUp")
                              : getReactIconHi2("HiArrowLongDown"))}
                          {/* <span className="absolute left-0 text-[14px] bottom-[0px]">
                            {getReactIconHi2("HiArrowsUpDown")}
                          </span> */}
                        </i>
                      </div>
                    </th>
                    <th className="w-28" onClick={() => sortByColumn("role")}>
                      <div className="relative">
                        <span className="absolute left-4 text-[14px] bottom-[-10px] text-center">
                          Role
                        </span>
                        <p className="absolute right-0 bottom-[-12px]">
                          {sortBy === "role" &&
                            (sortOrder === "asc"
                              ? getReactIconHi2("HiArrowLongDown")
                              : getReactIconHi2("HiArrowLongUp"))}
                        </p>
                      </div>
                    </th>
                    <th className="p-2 text-center lg:w-12 mx-auto">
                      <span className="text-center pr-2">
                        Grant Features{" "}
                        <i className="m-0 lg:mx-2 text-gray-400">
                          {<MuiIcon iconName={"HelpTwoTone"} fontSize={18} />}
                        </i>
                      </span>
                      <br />
                    </th>
                    <th className="text-[14px] w-[160px]">
                      <span>
                        Action{" "}
                        <i className="m-0 lg:mx-2 text-gray-400">
                          {<MuiIcon iconName={"HelpTwoTone"} fontSize={18} />}
                        </i>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className={`${BgTable} `}>
                  {searchResults.map((admin, index) => (
                    <tr key={admin.id} className={`divide-y`}>
                      <td
                        className={`${BgOuterTable} text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                      >
                        {/* {index + 1} */}
                        {parseInt(admin.id) == 0
                          ? parseInt(admin.id) + 1
                          : admin.id}
                      </td>
                      <td className="w-2">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td className="px-4 w-[450px] py-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className="avatar "
                            onClick={() =>
                              document.getElementById("ShowPict").showModal()
                            }
                          >
                            <div className="mask mask-squircle w-16 h-16 cursor-pointer ">
                              <img
                                src={`./src/assets/admin_avatar/${admin.pict}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div className={`${textTable} pl-4 text-left`}>
                            <div className="font-bold line-clamp-2 font-roboto-regular">
                              {admin.username}
                            </div>
                            <div className="mt-2 font-medium text-slate-500">
                              {admin.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="font-semibold font-roboto-regular text-slate-800">
                          {admin.role == 0 ? "Super Admin" : "Admin"}
                        </p>
                      </td>
                      {admin.role == 1 ? (
                        <>
                          <td className="flex-1 px-8 lg:px-4 ">
                            <div className="w-full flex lg:flex-row justify-around items-center">
                              <input
                                type="checkbox"
                                className="toggle toggle-info m-2"
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    admin.id,
                                    e.target.checked
                                  )
                                }
                                checked={isChatEnabled(admin.authority)}
                              />
                              <input
                                type="checkbox"
                                className="toggle toggle-warning m-2"
                                value={
                                  JSON.parse(admin.authority).sort_warehouse
                                    ? true
                                    : false
                                }
                              />

                              <input
                                type="checkbox"
                                className="toggle toggle-error m-2"
                                value={
                                  JSON.parse(admin.authority).alter_price
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </td>
                          <td className="flex-1 px-8 lg:px-4 ">
                            <div className="w-full flex lg:flex-row justify-around items-center">
                              <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200">
                                {getMuiIcon("PersonOff")}
                              </button>
                              <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-sky-600 hover:to-indigo-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200">
                                {getMuiIcon("Settings")}
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
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot className="border-b-4 border-black"></tfoot>
              </table>
              <div className="h-40 ">{/* Custom */}</div>
            </div>
          </div>
        )}
        <ul></ul>
      </Container>
    </>
  );
}
