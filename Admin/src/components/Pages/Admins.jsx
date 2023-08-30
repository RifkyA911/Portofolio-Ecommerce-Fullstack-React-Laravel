import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

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
      {loading == true ? (
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <span>loading....</span>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 ">
          <table className="p-2 mx-auto ">
            <thead className="bg-slate-400 p-4">
              <tr>
                <th className="p-2 ">No</th>
                <th className="p-4">Picture</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Username</th>
                <th className="p-4">Role</th>
                <th className="p-4">Grant Features</th>
              </tr>
            </thead>
            <tbody className="bg-slate-200">
              {admins.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-3 bg-slate-300">{index + 1}</td>
                  <td className="p-4 ">
                    <img
                      src={`./src/assets/admin_avatar/${user.pict}`}
                      className="w-28 h-28 rounded-full"
                    />
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">
                    <p>Chat : {JSON.parse(user.authority).chat}</p>
                    <p>
                      Sortir Barang :{" "}
                      {JSON.parse(user.authority).sort_warehouse}
                    </p>
                    <p>Ubah Harga : {JSON.parse(user.authority).alter_price}</p>

                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${
                        enabled ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`${
                          enabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                    <button className="p-4 bg-red-400">A</button>
                    <button className="p-4 bg-cyan-400">B</button>
                    <button className="p-4 bg-blue-400">C</button>
                    <button className="p-4 bg-violet-400">D</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <pre>
        prototype fetching data in localhost http://127.0.0.1:8000/api/admins{" "}
      </pre>
      <ul></ul>
    </>
  );
}
