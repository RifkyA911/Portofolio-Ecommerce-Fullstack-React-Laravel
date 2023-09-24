import { useEffect, useState } from "react";
// UI
import Skeleton from "@mui/material/Skeleton";
import { Container } from "../Layout";
import { getMuiIcon, getReactIconHi2 } from "../utils/RenderIcons";

export default function Admins() {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [sortedData, setSortedData] = useState([admins]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const URLadmins = import.meta.env.VITE_API_URL_GET_ALL_ADMIN;

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
          <div className="p-0 ">
            <div className="overflow-x-auto rounded-md">
              <table className="table font-medium ">
                {/* head */}
                <thead className="bg-slate-200 cursor-pointer shadow-lg">
                  <tr className="">
                    <th className="px-4" onClick={() => sortByColumn("id")}>
                      <span className="text-[14px] relative">
                        <i className="absolute m-0 w-5 right-[-8px] top-[-14px] overflow-hidden">
                          {getReactIconHi2("HiArrowLongDown")}
                        </i>
                      </span>
                    </th>
                    <th className="py-2">
                      <label>Pilih</label>
                    </th>
                    <th
                      className="px-6"
                      onClick={() => sortByColumn("username")}
                    >
                      <div className="relative">
                        <span className="absolute left-0 text-[14px] bottom-[-8px]">
                          Admin Name
                        </span>
                        <i className="absolute right-0 bottom-[-12px]">
                          {getReactIconHi2("HiArrowLongDown")}
                        </i>
                      </div>
                    </th>
                    <th className="" onClick={() => sortByColumn("role")}>
                      <div className="relative">
                        <span className="absolute left-0 text-[14px] bottom-[-8px]">
                          Role
                        </span>
                        <p className="absolute right-0 bottom-[-12px]">
                          {getReactIconHi2("HiArrowLongDown")}
                        </p>
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      Grant Features
                      <br />
                      Chat | Sort | Price
                    </th>
                    <th className="text-[14px]">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {admins.map((admin, index) => (
                    <tr key={admin.id}>
                      <td className="bg-slate-100 text-center w-0 p-0">
                        {index + 1}
                      </td>
                      <td className="w-0">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td className="px-4 w-[450px] py-2">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-16 h-16">
                              <img
                                src={`./src/assets/admin_avatar/${admin.pict}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div className="pl-4">
                            <div className="font-bold line-clamp-2">
                              {admin.username}
                            </div>
                            <div className="mt-2 font-medium text-slate-500">
                              {admin.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="">
                          {admin.role == 0 ? "Super Admin" : "Admin"}
                        </p>
                      </td>
                      <td className="px-4">
                        <div className="item items-stretch">
                          <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            onChange={() => console.info("maleh")}
                            value={
                              JSON.parse(admin.authority).chat ? true : false
                            }
                          />
                          <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            value={
                              JSON.parse(admin.authority).sort_warehouse
                                ? true
                                : false
                            }
                          />

                          <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            value={
                              JSON.parse(admin.authority).alter_price
                                ? true
                                : false
                            }
                          />
                        </div>
                      </td>
                      <td className="inline-flex px-2 ">
                        <div className="join join-vertical lg:join-horizontal">
                          <button className="p-2 bg-red-500 text-white join-item">
                            {getMuiIcon("PersonOff")}
                          </button>
                          <button className="p-2 bg-lime-500 text-white join-item">
                            {getMuiIcon("Settings")}
                          </button>
                        </div>
                      </td>
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
