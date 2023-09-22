import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "../Layout";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
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
  // console.log("admins:", admins); // Logging the updated admins here

  useEffect(() => {
    console.log("start fetching");
    setLoading(true);

    fetchData(); //Asynx boss

    console.log("end fetching");
  }, []);

  function tes() {
    admins.map((user, index) => console.log(user.name));
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
          <div className="p-0 ">
            <div className="overflow-x-auto rounded-md">
              <table className="table font-medium text-[12px]">
                {/* head */}
                <thead className="bg-slate-300">
                  <tr>
                    <th className="w-0">No</th>
                    <th>
                      <label>Pilih</label>
                    </th>
                    <th className="px-6">Admin User</th>
                    <th>Role</th>
                    <th>
                      Grant Features
                      <br />
                      Chat | Sort | Price
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50">
                  {admins.map((user, index) => (
                    <tr key={user.id}>
                      <td className="bg-slate-100 text-center w-0 p-0">
                        {index + 1}
                      </td>
                      <td className="w-0">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td className="px-6 w-[450px] py-2">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-16 h-16">
                              <img
                                src={`./src/assets/admin_avatar/${user.pict}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div className="pl-4">
                            <div className="font-bold">{user.username}</div>
                            <div className="mt-2 font-medium text-slate-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="">
                          {user.role == 0 ? "Super Admin" : "Admin"}
                        </p>
                      </td>
                      <td className="flex px-16">
                        <div className="flex-row item items-stretch">
                          <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            onChange={() => console.info("maleh")}
                            value={
                              JSON.parse(user.authority).chat ? true : false
                            }
                          />
                          <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            value={
                              JSON.parse(user.authority).sort_warehouse
                                ? true
                                : false
                            }
                          />
                          <input
                            type="checkbox"
                            className="toggle toggle-sm"
                            value={
                              JSON.parse(user.authority).alter_price
                                ? true
                                : false
                            }
                          />
                        </div>
                      </td>
                      <td className="w-20">
                        <button className="btn btn-sm btn-danger btn-outline">
                          H
                        </button>
                        <div className="divider"></div>
                        <button className="btn btn-sm btn-success btn-outline">
                          S
                        </button>
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
