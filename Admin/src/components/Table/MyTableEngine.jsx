import { useEffect, useState } from "react";
// UI
import { getMuiIcon, getReactIconHi2 } from "../utils/RenderIcons";
// REDUX
import { useSelector } from "react-redux";
import { TbSortAscendingNumbers } from "react-icons/tb";

export const MyTableEngine = (props) => {
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
    BorderRowTable,
    BorderOuterTable,
  } = useSelector((state) => state.UI);

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

  return (
    <>
      <div className="overflow-x-auto rounded-lg bg-white ">
        <table className="text-sm w-full outline-none ">
          <thead
            className={`${BgOuterTable} cursor-pointer shadow-lg ${textColor} font-roboto-regular outline-none`}
          >
            <tr className="">
              <th className="px-4" onClick={() => sortByColumn("id")}>
                <span className="text-[14px] relative">
                  <i className="absolute m-0 w-5 right-[-8px] top-[-14px] overflow-hidden">
                    {sortBy === "id" &&
                      (sortOrder === "asc" ? (
                        <TbSortAscendingNumbers className="p-2" />
                      ) : (
                        getReactIconHi2("HiArrowLongUp")
                      ))}
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
              <th className="p-2 text-center w-96 lg:w-48 ">
                <span className="text-center  pr-2">Grant Features</span>
                <br />
                <div className="lg:flex-row flex flex-col justify-center lg:border-0 border-t-2 border-slate-500">
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
            {searchResults.map((admin, index) => (
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
                    <td className="flex-1 px-6 lg:px-4 ">
                      <div className="w-full flex flex-col lg:flex-row justify-around items-center">
                        <input
                          type="checkbox"
                          className="toggle toggle-info m-2"
                          onChange={(e) =>
                            handleCheckboxChange(admin.id, e.target.checked)
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
                    <td className="">
                      <div className="flex justify-center flex-wrap ">
                        <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:outline-none outline outline-2 outline-red-400 transition-all duration-200">
                          {getMuiIcon("PersonOff")}
                        </button>
                        <button className="p-2 m-2 rounded-md text-gray-500 hover:text-white hover:bg-gradient-to-r hover:bg-sky-600 hover:to-sky-500 hover:outline-none outline outline-2 outline-blue-400 transition-all duration-200">
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
          <tfoot className="border border-b-4 border-black"></tfoot>
        </table>
        <div
          className={`bg-white border border-t-3 border-gray-200 flex justify-center w-full`}
        >
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className={`${textColor}`}
          />
        </div>
      </div>
    </>
  );
};

export default MyTable;
