import { useState, useEffect, useMemo, useRef, createContext } from "react";
import axios from "axios";
import Barcode from "react-jsbarcode";
// Components
import { SkeltonTable } from "../components/Skelton";
import { SetErrorMessage } from "../components/Error/ErrorMessage";
import { MainModalHandler } from "../components/Modal";
// import { ProductImage } from "../components/invoices/invoicesTableBody";
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
import { ReactIcons } from "../utils/RenderIcons";
import RequestAPI from "../Config/API";

export const OrdersContext = createContext();

export default function Orders() {
  // ---- Orders Basic States ----
  const [orders, setOrders] = useState([]);
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
  const [order, setOrder] = useState("");
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

  const table = "orders";
  const URL_ORDERS = `${table}/paginate/${paginate}/${rows}`;
  const URL_ORDERS_SEARCH = `${table}/search`;
  const URL_ORDERS_FILTER = `${table}/filter`;

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(url, form ? "POST" : "GET", form);
      // console.log(data.data);
      setLoading(false);
      setOrders(data.data);
      setLengthData(data.message.length);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  // ===================== MyTableEngine =====================
  useEffect(() => {
    setLoading(true);
    fetchData(URL_ORDERS);
    if (orders !== null && orders !== undefined) {
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
    if (orders !== null && orders.length > 0) {
      if (searchTerm.length > 1 || searchTerm !== "") {
        fetchData(URL_ORDERS_SEARCH, { search: searchTerm });
      } else if (searchTerm == "") {
        fetchData(URL_ORDERS);
      }
    }
  }, [searchTerm]);

  const MyTableEngineProps = {
    table,
    context: OrdersContext,
    inputData: orders,
    refresh: () => {
      fetchData(URL_ORDERS);
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
    hideHeaderBtn: [],
    applyFilter: (form) => {
      fetchData(URL_ORDERS_FILTER, form);
    },
    showFixedBtn,
    setShowFixedBtn,
    searchTerm,
    setSearchTerm,
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
    toggleSelect,
    setToggleSelect,
    selectedRows,
    setSelectedRows,
    // Sorting Filter
    sortData: (newSortedData) => {
      setOrders(newSortedData);
    },
    // ------------ Table Pagination-------------
    tabPagination,
    setTabPagination,
    colSpan: colspan == null ? 5 : colspan,
    paginate,
    setPaginate,
    rows,
    setRows,
    length,
  };

  // ===================== Modal =====================
  // Handler Ketika mengklik modal handler button
  const handleOpenModal = (id, formType, modalType) => {
    setShowModal(true);
    setModalType(modalType);
    setOrder(id);
    setFormType(formType);
  };

  const ModalProps = {
    table,
    table_id: order,
    showModal,
    setShowModal,
    modalType,
    formType,
    refresh: () => {
      setLoading(true);
      fetchData(URL_ORDERS);
    },
    setResultStatus: (type, state, message) =>
      setResultStatus({
        ...resultStatus,
        type: type,
        state: state,
        message: message,
      }),
    select: orders,
    clearData: () => {
      setOrders(null);
      setToggleSelect(false);
      setSelectedRows([]);
      setFormType(null);
    },
  };

  // Urutan kolom yang diinginkan
  const columnOrder = [
    "id",
    "No. Invoices",
    "Status", // sent + done
    "Products",
    "Customer",
    "Checked",
    "Address",
    "Total",
  ];

  let table_styling = {};
  if (orders !== null && orders.length > 0) {
    console.log();
    table_styling = {
      tbody: `${BgTable}`,
      tr: `h-8 text-left`,
      th: columnOrder.map((key, index) => ({
        key,
        feature: ["id", "Customer", "Checked", "Total"].includes(key)
          ? "filter"
          : null,
        style: `capitalize px-4`,
      })),
      td: `xborder-2 py-2 px-4 `,
    };
  }

  return (
    <>
      <Container>
        <Content pageName={"Invoices"}>
          {loading == true ? (
            <SkeltonTable />
          ) : (
            <>
              {orders !== null ? (
                // <ordersContext.Provider value={MyTableEngineProps}>
                <div id="orders" className="rounded-lg text-sm ">
                  {/* ================ Error ================ */}
                  <div>
                    {errorMessage && (
                      <SetErrorMessage
                        errorMessage={errorMessage}
                        refresh={() => {
                          fetchData(URL_PRODUCT, "orders");
                          setLoading(true);
                        }}
                      >
                        <span className="text-md font-medium my-2">
                          {URL_PRODUCT}
                        </span>
                      </SetErrorMessage>
                    )}
                  </div>
                  {/* ================ Modal ================= */}
                  <MainModalHandler {...ModalProps} />
                  {/* {resultStatus.type && resultStatus.state == true && (
                    <FormToast
                      formType={resultStatus.type}
                      span={resultStatus.message}
                    />
                  )} */}
                  {/* ================ Table ================ */}
                  <div className="divider">Product List</div>
                  <ul className="timeline timeline-vertical font-roboto-regular">
                    <li>
                      <div className="timeline-start">1984</div>
                      <div className="timeline-middle">
                        <ReactIcons iconName="FaCircleCheck" />
                      </div>
                      <div id="chart" className="timeline-end timeline-box">
                        First Macintosh computer
                      </div>
                      <hr />
                    </li>
                  </ul>
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
                            className={th.style}
                          ></Th>
                        ))}
                        <Th
                          key={55}
                          name="Action"
                          column="Action"
                          feature={null}
                          className="print:hidden capitalize px-4"
                        ></Th>
                      </Tr>
                    </Thead>
                    {/* {row.no_orders ? <>Data</> : <>No Data</>} */}

                    <Tbody className={table_styling.tbody}>
                      {orders.map((row, index) => (
                        <Tr
                          key={index}
                          className={`${table_styling.tr} divide-y font-roboto-medium capitalize text-gray-900 odd:bg-white even:bg-slate-50`}
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
                                            row.name,
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
                                            row.name,
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
                                {parseInt(row.id) == 0
                                  ? parseInt(row.id) + 1
                                  : row.id}
                              </Th>
                            </>
                          )}
                          <Td className={`w-1/12`}>{row.no_invoice}</Td>
                          <Td className={`px-6 ${table_styling.td} w-1/12`}>
                            {!row.done ? (
                              <>{!row.sent ? <>In Order</> : <>Proceed</>}</>
                            ) : (
                              <>Sent</>
                            )}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.items.map((item, key) => (
                              <>{item.product.name}</>
                            ))}
                          </Td>
                          <Td className={`px-6 ${table_styling.td} w-1/12`}>
                            {row.user.username}
                          </Td>
                          <Td className={`px-6 ${table_styling.td} w-1/12`}>
                            {row.deadline_payment}
                          </Td>
                          <Td className={`${table_styling.td} w-2/12`}>
                            {row.user.address}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {CurrencyFormatter(row.total_price)}
                          </Td>

                          <Td className="print:hidden px-4">
                            {row.id && (
                              <ActionButton
                                key={index}
                                inputData={row}
                                onClickDetails={() => {
                                  handleOpenModal(row.id, "DROP_BY_ID", "form");
                                }}
                                onClickPrint={() => {
                                  handleOpenModal(
                                    row.id,
                                    "PRINT_BY_ID",
                                    "print"
                                  );
                                }}
                                onClickDelete={() => {
                                  handleOpenModal(row.id, "DROP_BY_ID", "form");
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
                        </Tr>
                      ))}
                    </Tbody>
                  </MyTableEngine>
                </div>
              ) : (
                // </ordersContext.Provider>
                "tidak ada data"
              )}
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
