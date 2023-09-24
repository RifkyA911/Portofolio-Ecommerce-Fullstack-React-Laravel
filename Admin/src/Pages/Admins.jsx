import { useEffect, useState } from "react";
// UI
import Skeleton from "@mui/material/Skeleton";
import { Container } from "../Layout";
import { getMuiIcon, getReactIconHi2 } from "../utils/RenderIcons";
// REDUX
import { useSelector } from "react-redux";

export default function Admins() {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [sortBy, setSortBy] = useState("username");
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
  } = useSelector((state) => state.UI);

  const URLadmins = import.meta.env.VITE_API_URL_GET_ALL_ADMIN;
  // console.log(URLadmins);
  async function fetchData(url) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admins");
      const data = await response.json();
      setAdmins(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error too
    }
  }
  // console.table(admins); // Logging the updated admins here

  useEffect(() => {
    setLoading(true);
    fetchData(); //Asynx boss
  }, []);

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
          <div className="p-4 rounde-lg text-sm ">
            <div className="flex my-2 w-full justify-between items-end">
              <div className="flex-row justify-start ">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-info w-[512px] max-w-lg "
                />
              </div>
              <div className="flex-row justify-end">
                <button className="hidden focus:outline-none flex-row bg-gradient-to-r from-red-500 to-red-400 p-2 rounded-md font-roboto-medium text-white items-center ">
                  Delete
                </button>
                <button
                  className="flex flex-row focus:outline-none bg-gradient-to-r from-blue-500 to-sky-500 p-2 rounded-md font-roboto-medium text-white items-center"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  <i className="font-xs">{getMuiIcon("PersonAdd")}</i>
                  <span className="font-base px-2">New</span>
                </button>
                <dialog id="my_modal_3" className={`${textColor} modal`}>
                  <div className={`modal-box ${BgColor}`}>
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click on ✕ button to close
                    </p>
                  </div>
                </dialog>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg bg-white outline-none">
              <table className="text-sm w-full outline-none">
                {/* head */}
                <thead
                  className={`${BgOuterTable} cursor-pointer shadow-lg ${textColor} font-roboto-regular outline-none`}
                >
                  <tr className="">
                    <th className="px-4" onClick={() => sortByColumn("id")}>
                      <span className="text-[14px] relative">
                        <i className="absolute m-0 w-5 right-[-8px] top-[-14px] overflow-hidden">
                          {sortBy === "id" &&
                            (sortOrder === "asc"
                              ? getReactIconHi2("HiArrowLongDown")
                              : getReactIconHi2("HiArrowLongUp"))}
                        </i>
                      </span>
                    </th>
                    <th className="px-2">
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
                              ? getReactIconHi2("HiArrowLongDown")
                              : getReactIconHi2("HiArrowLongUp"))}
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
                    <th className="p-2 text-center w-48 ">
                      <span className="text-center lg:border-0 border-b-2 border-slate-500 pr-2">
                        Grant Features
                      </span>
                      <br />
                      <div className="lg:flex-row flex flex-col justify-center">
                        <span className="lg:border-r-2 lg:border-slate-500 lg:pr-2">
                          Chat
                        </span>
                        <span className="lg:border-r-2 lg:border-slate-500 lg:px-2">
                          Sort
                        </span>
                        <span className="lg:pl-2"> Price</span>
                      </div>
                    </th>
                    <th className="text-[14px] w-[160px]">Action</th>
                  </tr>
                </thead>
                <tbody className={BgTable}>
                  {admins.map((admin, index) => (
                    <tr key={admin.id} className="divide-y">
                      <td
                        className={`${BgOuterTable} text-center w-0 p-0 font-roboto-bold divide-y divide-white`}
                      >
                        {index + 1}
                      </td>
                      <td className="w-2">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td className="px-4 w-[450px] py-2">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-16 h-16 cursor-pointer">
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
                          <td className="flex-1 px-4">
                            <div className="w-full flex flex-col lg:flex-row justify-around items-center">
                              <input
                                type="checkbox"
                                className="toggle toggle-info m-2"
                                onChange={() => console.info("maleh")}
                                value={
                                  JSON.parse(admin.authority).chat
                                    ? true
                                    : false
                                }
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
                          <td className="">
                            <div className="flex justify-center flex-wrap ">
                              <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200">
                                {getMuiIcon("PersonOff")}
                              </button>
                              <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-blue-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200">
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
                <tfoot></tfoot>
              </table>
            </div>
          </div>
        )}
        <ul></ul>
      </Container>
    </>
  );
}
