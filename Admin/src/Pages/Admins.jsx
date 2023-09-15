import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import Skeleton from "@mui/material/Skeleton";
import Container from "../layout/Container";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [enabled3, setEnabled3] = useState(false);
  const [enabled4, setEnabled4] = useState(false);

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

  useEffect(() => {
    console.log("start fetching");
    setLoading(true);

    fetchData(); //Asynx boss

    console.log("end fetching");
  }, []);

  useEffect(() => {
    console.log("admins:", admins); // Logging the updated admins here
  }, [admins]); // This effect will trigger whenever admins changes

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
            <div className="overflow-x-auto">
              <table className="table font-medium text-md">
                {/* head */}
                <thead className="bg-slate-300">
                  <tr>
                    <th>No</th>
                    <th>
                      <label>Pilih</label>
                    </th>
                    <th>Admin User</th>
                    <th>Role</th>
                    <th>Grant Features</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-200">
                  {admins.map((user, index) => (
                    <tr key={user.id}>
                      <td className="bg-slate-100 text-center w-0">
                        {index + 1}
                      </td>
                      <th className="w-0">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td className="px-12 w-[450px]">
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
                      <td>
                        <div className="text-sm opacity-50">
                          <p>Chat : {JSON.parse(user.authority).chat}</p>
                        </div>
                        <div className="text-sm opacity-50">
                          <p>
                            Sortir Barang :{" "}
                            {JSON.parse(user.authority).sort_warehouse}
                          </p>
                        </div>
                        <div className="text-sm opacity-50">
                          <p>
                            Ubah Harga :{JSON.parse(user.authority).alter_price}
                          </p>
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
        <pre>
          prototype fetching data in localhost http://127.0.0.1:8000/api/admins{" "}
        </pre>
        <ul></ul>
      </Container>
    </>
  );
}
