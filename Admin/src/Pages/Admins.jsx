import { useEffect, useState } from "react";
// Components
import Skeleton from "@mui/material/Skeleton";
import { ActionModalForm, InfoModal } from "./../components/Modal";
import { DangerAlert, WarningAlert } from "../components/Alert";
import {
  ShowAdminName,
  ShowRole,
  AuthorityToggle,
  ActionButton,
} from "./../components/Admins/AdminsTableBody";
import {
  MyTableEngine,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  MyTablePagination,
} from "../components/Table/MyTableEngine";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// UTILS
import axios from "axios";
import { MuiIcon } from "../utils/RenderIcons";

// define fetch data URL by admins
const initUrl = import.meta.env.VITE_API_URL_GET_ALL_ADMIN;

export default function Admins(props) {
  const [dummy, setDummy] = useState([]);
  // This Page
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Action Modal
  const [admin, setAdmin] = useState("");
  const [formType, setFormType] = useState(null);

  // Table Pagination
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  // Table Header
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Table Body
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

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

  // Buat URL berdasarkan rows dan paginate
  const URL = `${initUrl}/paginate/${paginate}/${rows}`;

  const fetchAdmins = async (url, type) => {
    try {
      // const response = await fetch(url);
      // const data = await response.json();
      const response = await axios.get(url);
      const data = await response.data;
      setLoading(false);
      setAdmins(data.data);
      setErrorMessage(null);
      setLengthData(data.message.length);
      // setCount(count + 1);
      // console.log("fetching data ke-", count);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.message);
      console.error("pesan Terjadi kesalahan:", error.response.data);
      console.error("Terjadi kesalahan:", error);
    }
  };
  // console.table(admins);

  useEffect(() => {
    // console.log(searchTerm);
    // Filter data based on the search term
    const filteredData = admins.filter((admins) =>
      admins.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, admins]);

  // Panggil fetchData saat komponen pertama kali dimuat atau saat value paginate, rows berubah
  useEffect(() => {
    fetchAdmins(URL, "fetch");
  }, [paginate, rows]);

  // Handler ketika nilai rows diubah
  const handleRowsChange = (newRows) => {
    setLoading(true);
    setRows(newRows);
  };

  // Handler ketika nilai paginate diubah
  const handlePaginateChange = (newPaginate) => {
    setLoading(true);
    setPaginate(newPaginate);
    console.log("paginate-", newPaginate);
  };

  // Handler Ketika mengklik info button
  const handleInfoButton = (id, formType) => {
    // console.log("data = ", id);
    setAdmin(id);
    setFormType(formType);
  };

  // Handler Ketika mengklik actions button
  const handleActionButton = (id, formType) => {
    // console.log("data = ", id);
    setAdmin(id);
    setFormType(formType);
  };

  // Fungsi handler saat checkbox di klik
  const handleCheckboxChange = (id, username, pict) => {
    // Cek apakah indeks sudah ada dalam selectedRows
    const isSelected = selectedRows.some((item) => item.id === id);

    // Buat objek yang berisi indeks, username, dan pict
    const newRow = { id, username, pict };

    if (!isSelected) {
      // Jika checkbox dicentang dan indeks belum ada dalam selectedRows, tambahkan objek baru
      setSelectedRows([...selectedRows, newRow]);
    } else {
      // Jika checkbox dicentang dan indeks sudah ada dalam selectedRows, hapus objek dengan indeks yang cocok
      setSelectedRows(selectedRows.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    console.info(selectedRows);
    // console.info(admins);
  }, [selectedRows]);
  // useEffect(() => {
  //   console.info("toggle select:", toggleSelect);
  // }, [toggleSelect]);

  return (
    <>
      {/* {console.log("Render")} */}

      <Container>
        <Content pageName={"Admins"}>
          {loading == true ? (
            <div className="p-0 bg-white">
              {Array.from({ length: 16 }).map((_, index) => (
                <Skeleton key={index} className="p-4" />
              ))}
            </div>
          ) : (
            <div id="Admins" className="rounded-lg text-sm ">
              {/* Error */}
              <div>
                {errorMessage && (
                  <>
                    <DangerAlert
                      message={
                        <h1>
                          <MuiIcon iconName={"WarningRounded"} fontSize={20} />
                          {errorMessage}
                        </h1>
                      }
                    />
                    <div className="flex flex-col justify-center">
                      <span className="text-md font-medium my-2">{URL}</span>
                      <button
                        onClick={() => {
                          fetchAdmins(URL, "fetch");
                          setLoading(true);
                        }}
                        className="m-2 w-auto focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                      >
                        <MuiIcon iconName={"RefreshRounded"} fontSize={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* Main 1 */}
              {/* Modal */}
              <InfoModal thisAdmin={admin} formType={formType} />
              <ActionModalForm
                table="admins"
                table_id={admin}
                refresh={() => {
                  fetchAdmins(URL, "fetch");
                  setLoading(true);
                }}
                formType={formType}
                clearData={() => {
                  setAdmin(null);
                  setToggleSelect(false);
                  setSelectedRows([]);
                  setFormType(null);
                }}
              />
              {/* Table */}
              <MyTableEngine
                // Main Logic Data
                inputData={admins}
                refresh={() => {
                  fetchAdmins(URL, "fetch");
                  setLoading(true);
                }}
                // Table Header Menu
                TabHeader={true}
                searchTerm={searchTerm}
                setSearchTerm={(e) => setSearchTerm(e.target.value)}
                setAddModal={() => {
                  document.getElementById("AdminForm").showModal();
                  handleActionButton(null, "INSERT");
                }}
                setDeleteModal={() => {
                  // console.table(Object.assign({}, selectedRows));
                  document.getElementById("AdminForm").showModal();
                  handleActionButton(selectedRows, "DROP_BY_SELECTED");
                }}
                toggleSelect={toggleSelect}
                setToggleSelect={() => {
                  setToggleSelect((toggleSelectProps) => !toggleSelectProps);
                }}
                setSelectedRows={(propsValue) => setSelectedRows(propsValue)}
                // Sorting Filter
                sortData={(newSortedData) => {
                  setAdmins(newSortedData);
                  console.table("ADMINS:", newSortedData);
                }}
              >
                <Table className={`text-sm w-full `}>
                  <Thead className={`${BgOuterTable} ${textColor} `}>
                    <Tr key="TableHead" className="">
                      <Th
                        name=""
                        column="id"
                        feature="filter"
                        sortOrder="asc"
                        className="px-4"
                      ></Th>
                      <Th className="px-2 hidden">
                        <label>Select</label>
                      </Th>
                      <Th
                        name="Admin Name"
                        column="username"
                        feature="filter"
                        className="px-6 w-[600px]"
                      ></Th>
                      <Th
                        name="Role"
                        column="role"
                        feature="filter"
                        className="px-4 w-28"
                      ></Th>
                      <Th
                        name="Grant Features"
                        column="role"
                        onClick={() => {
                          handleInfoButton(null, "SHOW_GRANT_ACCESS_INFO");
                          document
                            .getElementById("TipsGrantAccess")
                            .showModal();
                        }}
                        className="p-2 text-center lg:w-12 mx-auto"
                      >
                        Grant Features
                        <i className="m-0 lg:mx-2 text-gray-400">
                          <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
                        </i>
                      </Th>
                      <Th
                        name="Action"
                        column="action"
                        className="text-[14px] w-[160px]"
                      >
                        Actions
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody className={`${BgTable} `}>
                    {searchResults.map((row, index) => (
                      <Tr
                        key={index}
                        customKey={index}
                        className={"divide-y"}
                        // className={`${
                        //   selectedRows[row.id] ? "selected" : ""
                        // } divide-y`}
                      >
                        {toggleSelect ? (
                          <>
                            {row.role != 0 ? (
                              <>
                                <Th
                                  key={index}
                                  feature={"select"}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      row.id,
                                      row.username,
                                      row.pict
                                    )
                                  }
                                  selectedRows={selectedRows}
                                  rowId={row.id}
                                  className=""
                                >
                                  {selectedRows.some(
                                    (item) => item.id === row.id
                                  ) ? (
                                    <button
                                      onClick={() =>
                                        handleCheckboxChange(
                                          row.id,
                                          row.username,
                                          row.pict
                                        )
                                      }
                                      className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-25 cursor-pointer"
                                    ></button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleCheckboxChange(
                                          row.id,
                                          row.username,
                                          row.pict
                                        )
                                      }
                                      className="absolute top-0 left-0 w-full h-full bg-amber-500 opacity-25 cursor-pointer"
                                    ></button>
                                  )}
                                </Th>
                              </>
                            ) : (
                              <th className="cursor-not-allowed">
                                <MuiIcon iconName="BlockRounded" />
                              </th>
                            )}
                          </>
                        ) : (
                          <>
                            <Th
                              key={index}
                              className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                            >
                              {parseInt(row.id) == 0
                                ? parseInt(row.id) + 1
                                : row.id}
                            </Th>
                          </>
                        )}
                        <Td className="px-8 w-[450px] py-2">
                          <ShowAdminName
                            key={index}
                            data={row}
                            onProfilePictureClick={() => {
                              handleInfoButton(row, "SHOW_PROFILE_PICTURE");
                              document.getElementById("ShowPict").showModal();
                            }}
                          />
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
                              <ActionButton
                                key={index}
                                data={row}
                                onClickDelete={() => {
                                  document
                                    .getElementById("AdminForm")
                                    .showModal();
                                  handleActionButton(row.id, "DROP_BY_ID");
                                }}
                                onClickEdit={() => {
                                  document
                                    .getElementById("AdminForm")
                                    .showModal();
                                  handleActionButton(row.id, "ALTER_BY_ID");
                                }}
                              />
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
                    paginate={paginate}
                    onChangePaginate={handlePaginateChange}
                    rows={rows}
                    onRowsChange={handleRowsChange}
                    length={length}
                  />
                </Table>
              </MyTableEngine>
            </div>
          )}
        </Content>
      </Container>
    </>
  );
}
