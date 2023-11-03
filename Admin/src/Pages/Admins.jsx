import { createContext, useContext, useEffect, useState } from "react";
// Components
import { MainModalHandler, InfoModal, TipsModal } from "./../components/Modal";
import {
  ShowAdminName,
  ShowRole,
  AuthorityToggle,
} from "./../components/Admins/AdminsTableBody";
import {
  MyTableEngine,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../components/Table/MyTableEngine";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useSelector } from "react-redux";
// UTILS
import axios from "axios";
import { MuiIcon } from "../utils/RenderIcons";
import { SkeltonTable } from "../components/Skelton/SkeltonTable";
import { SetErrorMessage } from "../components/Error/ErrorMessage";
import { ActionButton } from "../components/Button";

// define fetch data URL by admins
const initUrl = import.meta.env.VITE_API_ALL_ADMIN;

export const AdminsContext = createContext();

export const useAdminsContext = () => {
  return useContext(AdminsContext);
};

export default function Admins(props) {
  const [dataFromChild, setDataFromChild] = useState([]);
  // ---- Admins Basic States ----
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- MyTableEngine Pagination ----
  const [colspan, setColspan] = useState();
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  // ---- MyTableEngine Header ----
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ---- MyTableEngine Body ----
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // ---- Modal States ----
  const [admin, setAdmin] = useState("");
  const [formType, setFormType] = useState(null);

  // REDUX States
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

  // Panggil fetchData saat komponen pertama kali dimuat atau saat value paginate, rows berubah
  useEffect(() => {
    fetchAdmins(URL, "fetch");
  }, [paginate, rows]);
  // useEffect(() => {
  //   console.info(selectedRows);
  // }, [selectedRows]);

  // ===================== MyTableEngine =====================
  // ---- MyTableEngine Search Filter ----
  useEffect(() => {
    // Filter data based on the search term
    const filteredData = admins.filter((admins) =>
      admins.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, admins]);

  const MyTableEngineProps = {
    inputData: admins,
    refresh: () => {
      fetchAdmins(URL, "fetch");
      setLoading(true);
    },
    // ------------- Table Header Menu -------------
    TabHeader: true,
    searchTerm: searchTerm,
    setSearchTerm: (e) => setSearchTerm(e.target.value),
    setAddModal: () => {
      document.getElementById("ModalForms").showModal();
      handleActionButton(null, "INSERT");
    },
    setDeleteModal: () => {
      // console.table(Object.assign({}, selectedRows));
      document.getElementById("ModalForms").showModal();
      handleActionButton(selectedRows, "DROP_BY_SELECTED");
    },
    // ------------- Table Body -------------
    toggleSelect: toggleSelect,
    setToggleSelect: () => {
      setToggleSelect((toggleSelectProps) => !toggleSelectProps);
    },
    setSelectedRows: (propsValue) => setSelectedRows(propsValue),
    // Sorting Filter
    sortData: (newSortedData) => {
      setAdmins(newSortedData);
    },
    // ------------ Table Pagination-------------
    TabPagination: true,
    colSpan: 5,
    paginate: paginate,
    onChangePaginate: (newPaginate) => {
      setLoading(true);
      setPaginate(newPaginate);
      console.log("paginate-", newPaginate);
    },
    rows: rows,
    onRowsChange: (newRows) => {
      setLoading(true);
      setRows(newRows);
    },
    length: length,
    // sendDataToParent: (data) => {
    //   setDataFromChild([...dataFromChild, data]);
    // },
  };

  // ===================== Modal =====================
  const ModalProps = {
    table: "admins",
    table_id: admin,
    refresh: () => {
      fetchAdmins(URL, "fetch");
      setLoading(true);
    },
    formType: formType,
    clearData: () => {
      setAdmin(null);
      setToggleSelect(false);
      setSelectedRows([]);
      setFormType(null);
    },
  };
  return (
    <>
      {/* <AdminsContext.Provider value={AdminsContextValue}> */}
      <Container>
        <Content pageName={"Admins"}>
          {loading == true ? (
            <SkeltonTable />
          ) : (
            <div id="Admins" className="rounded-lg text-sm ">
              {/* ================ Error ================ */}
              <div>
                {errorMessage && (
                  <SetErrorMessage
                    errorMessage={errorMessage}
                    refresh={() => {
                      fetchAdmins(URL, "fetch");
                      setLoading(true);
                    }}
                  >
                    <span className="text-md font-medium my-2">{URL}</span>
                  </SetErrorMessage>
                )}
              </div>
              {/* ================ Modal ================= */}
              <InfoModal {...ModalProps} />
              <TipsModal {...ModalProps} />
              <ActionModalForm {...ModalProps} />
              {/* ================ Table ================ */}
              <MyTableEngine {...MyTableEngineProps}>
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
                        handleInfoButton(null, "SHOW_GRANT_ACCESS_TIPS");
                      }}
                      className="p-2 text-center lg:w-12 mx-auto"
                    >
                      <i className="m-0 lg:mx-2 text-gray-400">
                        <MuiIcon iconName={"HelpTwoTone"} fontSize={18} />
                      </i>
                    </Th>
                    <Th
                      name="Action"
                      column="action"
                      className="text-[14px] w-[160px]"
                    ></Th>
                  </Tr>
                </Thead>
                <Tbody className={`${BgTable} `}>
                  {searchResults.map((row, index) => (
                    <Tr key={index} customKey={index} className={"divide-y"}>
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
                                    className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-20 cursor-pointer"
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
                                    className="absolute top-0 left-0 w-full h-full bg-transparent hover:bg-gray-500 opacity-10 cursor-pointer"
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
                            handleInfoButton(row, "SHOW_ADMIN_PROFILE_PICTURE");
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
                                  .getElementById("ModalForms")
                                  .showModal();
                                handleActionButton(row.id, "DROP_BY_ID");
                              }}
                              onClickEdit={() => {
                                document
                                  .getElementById("ModalForms")
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
              </MyTableEngine>
              {/* <div>
                {dataFromChild.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div> */}
            </div>
          )}
        </Content>
      </Container>
      {/* </AdminsContext.Provider> */}
    </>
  );
}
