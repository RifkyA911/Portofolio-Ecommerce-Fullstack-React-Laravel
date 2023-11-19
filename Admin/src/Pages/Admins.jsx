import { useState, useEffect, useMemo, useRef, createContext } from "react";
import axios from "axios";
// Components
import { SkeltonTable } from "../components/Skelton/SkeltonTable";
import { SetErrorMessage } from "../components/Error/ErrorMessage";
import { MainModalHandler } from "../components/Modal";
import {
  ShowAdminData,
  ShowRole,
  AuthorityToggle,
} from "./../components/Admins/AdminsTableBody";
import { ActionButton } from "../components/Button";
import { NumberSpan } from "../components/Span";
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
import { CurrencyFormatter } from "../utils/Formatter";
import { FormToast } from "../components/Toast";
import { ReactIcons } from "../utils/RenderIcons";

// define fetch data URL_ADMINS by admins
const initUrlAdmins = import.meta.env.VITE_API_ALL_ADMINS;

export const AdminsContext = createContext();

export default function Admins() {
  // ---- Admins Basic States ----
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- MyTableEngine Pagination ----
  const [tabPagination, setTabPagination] = useState(true);
  const [colspan, setColspan] = useState();
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  // ---- MyTableEngine Header ----
  const [searchTerm, setSearchTerm] = useState("");
  const [showFixedBtn, setShowFixedBtn] = useState(null);

  // ---- MyTableEngine Body ----
  const [toggleSelect, setToggleSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // ---- Modal States ----
  const [admin, setAdmin] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [formType, setFormType] = useState(null);
  const [resultStatus, setResultStatus] = useState({
    type: null,
    state: false,
    message: null,
  });

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

  const URL_ADMINS = `${initUrlAdmins}/paginate/${paginate}/${rows}`;
  const URL_ADMINS_SEARCH = `${initUrlAdmins}/search?search=`;
  const URL_ADMINS_FILTER = `${initUrlAdmins}/filter`;

  const fetchData = async (url, table, form = null) => {
    try {
      const controller = new AbortController();
      const config = {
        method: form ? "post" : "get", // Metode permintaan yang dinamis
        url: url, // URL yang akan diakses
        data: form, // Menggunakan 'data' untuk mengirim data dalam permintaan POST
        signal: controller.signal,
      };
      const { data } = await axios(config);
      // console.log(data);
      // console.table(`fetching`, table);
      setLoading(false);
      if (table === "admins") {
        setAdmins(data.data);
        setLengthData(data.message.length);
      }
      setErrorMessage(null);
    } catch (error) {
      setLoading(false);
      let message = `Gagal Fetching '${table}'`;
      setErrorMessage(message);
      console.error(message, error);
    }
  };

  // ===================== MyTableEngine =====================
  useEffect(() => {
    fetchData(URL_ADMINS, "admins");
    if (admins !== null && admins !== undefined) {
      setColspan(columnOrder.length + 1);
    }
  }, [paginate, rows]);

  // Fungsi handler saat checkbox di klik
  const handleCheckboxChange = (id, username, pict) => {
    const isSelected = selectedRows.some((item) => item.id === id);
    const newRow = { id, username, pict };
    if (!isSelected) {
      setSelectedRows([...selectedRows, newRow]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item.id !== id));
    }
  };

  // ---- MyTableEngine Search Filter ----
  useEffect(() => {
    // console.log("sd", searchTerm);
    if (admins !== null && admins.length > 0) {
      if (searchTerm.length > 1 || searchTerm !== "") {
        fetchData(URL_ADMINS_SEARCH, "admins", { search: searchTerm });
      } else if (searchTerm == "") {
        fetchData(URL_ADMINS, "admins");
      }
    }
  }, [searchTerm]);

  const MyTableEngineProps = {
    table: "admins",
    context: AdminsContext,
    inputData: admins,
    refresh: () => {
      fetchData(URL_ADMINS, "admins");
      setLoading(true);
      setTabPagination(true);
    },
    setResultStatus: (type, state, message) =>
      setResultStatus({
        //  for toast
        ...resultStatus,
        type: type,
        state: state,
        message: message,
      }),
    // ------------- Table Header Menu -------------
    TabHeader: true,
    hideHeaderBtn: ["excelBtn", "printBtn"],
    applyFilter: (form) => {
      fetchData(URL_ADMINS_FILTER, "admins", form);
    },
    showFixedBtn: showFixedBtn,
    setShowFixedBtn: setShowFixedBtn,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    setPrintBatchModal: () => {
      setShowModal(true);
      handleOpenModal(selectedRows, "PRINT_BATCH", "print");
    },
    setDeleteBatchModal: () => {
      setShowModal(true);
      handleOpenModal(selectedRows, "DROP_BY_SELECTED", "form");
    },
    setAddModal: () => {
      setShowModal(true);
      handleOpenModal(null, "INSERT", "form");
    },
    // ------------- Table Body -------------
    toggleSelect: toggleSelect,
    setToggleSelect: setToggleSelect,
    selectedRows: selectedRows,
    setSelectedRows: setSelectedRows,
    // Sorting Filter
    sortData: (newSortedData) => {
      setAdmins(newSortedData);
    },
    // ------------ Table Pagination-------------
    tabPagination: tabPagination,
    setTabPagination: setTabPagination,
    colSpan: colspan == null ? 5 : colspan,
    paginate: paginate,
    onChangePaginate: (newPaginate) => {
      setLoading(true);
      setPaginate(newPaginate);
    },
    rows: rows,
    onRowsChange: (newRows) => {
      setLoading(true);
      setRows(newRows);
    },
    length: length,
  };

  // ===================== Modal =====================
  // Handler Ketika mengklik modal handler button
  const handleOpenModal = (id, formType, modalType) => {
    setShowModal(true);
    setModalType(modalType);
    setAdmin(id);
    setFormType(formType);
  };

  const ModalProps = {
    table: "admins",
    table_id: admin,
    showModal: showModal,
    setShowModal: setShowModal,
    modalType: modalType,
    formType: formType,
    refresh: () => {
      fetchData(URL_ADMINS, "admins");
      setLoading(true);
    },
    setResultStatus: (type, state, message) =>
      setResultStatus({
        ...resultStatus,
        type: type,
        state: state,
        message: message,
      }),
    select: admins,
    clearData: () => {
      setAdmins(null);
      setToggleSelect(false);
      setSelectedRows([]);
      setFormType(null);
    },
  };

  // Urutan kolom yang diinginkan
  const columnOrder = [
    "id",
    "username",
    "role",
    "Grant Features",
    // "created_at",
    // "updated_at",
  ];

  let table_styling = {};
  if (admins !== null && admins.length > 0) {
    table_styling = {
      tbody: `${BgTable}`,
      tr: `h-8 text-left`,
      th: columnOrder.map((key, index) => ({
        key,
        feature: ["id", "username", "role"].includes(key) ? "filter" : null,
        style: `capitalize px-4`,
      })),
      td: `xborder-2 py-2 px-4 `,
    };
  }

  return (
    <>
      <Container>
        <Content pageName={"Admins"}>
          {loading == true ? (
            <SkeltonTable />
          ) : (
            <>
              {admins !== null ? (
                // <AdminsContext.Provider value={MyTableEngineProps}>
                <div id="admins" className="rounded-lg text-sm ">
                  {/* ================ Error ================ */}
                  <div>
                    {errorMessage && (
                      <SetErrorMessage
                        errorMessage={errorMessage}
                        refresh={() => {
                          fetchData(URL_ADMINS, "admins");
                          setLoading(true);
                        }}
                      >
                        <span className="text-md font-medium my-2">
                          {URL_ADMINS}
                        </span>
                      </SetErrorMessage>
                    )}
                  </div>
                  {/* ================ Modal ================= */}
                  <MainModalHandler {...ModalProps} />
                  {resultStatus.type && resultStatus.state == true && (
                    <FormToast
                      formType={resultStatus.type}
                      span={resultStatus.message}
                    />
                  )}
                  {/* ================ Table ================ */}
                  <div className="divider">Admin List</div>

                  <MyTableEngine
                    {...MyTableEngineProps}
                    className="rounded-sm mx-auto"
                  >
                    <Thead className={`${BgOuterTable} ${textColor} `}>
                      <Tr key="TableHead" className={table_styling.tr}>
                        {table_styling.th.map((th, index) => (
                          <Th
                            key={index}
                            name={th.key === "id" ? "" : th.key}
                            column={th.key}
                            feature={th.feature}
                            sortOrder="asc"
                            className={
                              th.key == "Grant Features"
                                ? "text-center"
                                : th.style
                            }
                            // hidden={
                            //   th.key === "created_at" || th.key === "updated_at"
                            //     ? true
                            //     : false
                            // }
                          ></Th>
                        ))}
                        <Th
                          key={55}
                          name="Action"
                          column="Action"
                          feature={null}
                          className="print:hidden capitalize px-4 text-center"
                        ></Th>
                      </Tr>
                    </Thead>
                    <Tbody className={table_styling.tbody}>
                      {admins.map((row, index) => (
                        <Tr
                          key={index}
                          className={`${table_styling.tr} divide-y font-roboto-medium capitalize text-gray-900 odd:bg-white even:bg-slate-50`}
                        >
                          {row.role != 0 ? (
                            <>
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
                                            row.name,
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
                                    className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-[1%] p-0 font-roboto-bold text-xs border-b-[2px] border-white`}
                                  >
                                    {parseInt(index) == 0
                                      ? parseInt(index) + 1
                                      : index + 1}
                                  </Th>
                                </>
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
                          <Td className="py-2 px-8 w-4/12 cursor-pointer">
                            <ShowAdminData
                              key={index}
                              data={row}
                              onClick={() => {
                                handleOpenModal(
                                  row.id,
                                  "SHOW_ADMIN_PROFILE_PICTURE",
                                  "info"
                                );
                              }}
                            />
                          </Td>
                          <Td className="py-2 px-2 w-2/12 text-center">
                            <ShowRole data={row} />
                          </Td>
                          {row.role == 1 ? (
                            <>
                              <Td className="py-2 px-2 w-4/12 ">
                                <AuthorityToggle data={row} />
                              </Td>
                              <Td className="py-2 px-2 w-2/12">
                                {row.id && (
                                  <ActionButton
                                    key={index}
                                    inputData={row}
                                    onClickDelete={() => {
                                      handleOpenModal(
                                        row.id,
                                        "DROP_BY_ID",
                                        "form"
                                      );
                                    }}
                                    onClickEdit={() => {
                                      handleOpenModal(
                                        row.id,
                                        "ALTER_BY_ID",
                                        "form"
                                      );
                                    }}
                                  />
                                )}
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
                </div>
              ) : (
                // </AdminsContext.Provider>
                "tidak ada data"
              )}
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
