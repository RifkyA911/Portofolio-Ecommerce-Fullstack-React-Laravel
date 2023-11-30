import { useState, useEffect, useMemo, useRef, createContext } from "react";
import axios from "axios";
import Barcode from "react-jsbarcode";
// Components
import Rating from "@mui/material/Rating";
import { SkeltonTable } from "./../Skelton";
import { SetErrorMessage } from "./../Error/ErrorMessage";
import { MainModalHandler } from "./../Modal";
import { ProductImage } from "./../Products/ProductsTableBody";
import { ActionButton } from "./../Button";
import { NumberSpan } from "./../Span";
import {
  MyTableEngine,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "./../Table/MyTableEngine";
// Layout
import { Container, Content } from "./../../Layout";
// REDUX
import { useSelector } from "react-redux";
// UTILS
import { CurrencyFormatter, DateFormatter } from "./../../utils/Formatter";
import { FormToast } from "./../Toast";
import { ReactIcons } from "./../../utils/RenderIcons";
import RequestAPI from "./../../Config/API";

// define fetch data URL_CATEGORIES by products

export const CategorisContext = createContext();

export default function TableReview() {
  // ---- Basic States ----
  const [categories, setCategories] = useState([]);
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
  const [category, setCategory] = useState("");
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

  const table = "reviews";

  const URL_CATEGORIES = `${table}/paginate/${paginate}/${rows}`;
  const URL_CATEGORIES_SEARCH = `${table}/search`;
  const URL_CATEGORIES_FILTER = `${table}/filter`;

  const fetchData = async (url, table, form = null) => {
    try {
      const { data } = await RequestAPI(url, form ? "POST" : "GET", form);
      // console.log(data.data);
      setLoading(false);
      // if (table === "products") {
      //   setProducts(data.data);
      //   setLengthData(data.message.length);
      // } else if (table === table) {
      setCategories(data.data);
      setLengthData(data.message.length);
      // }
      setErrorMessage(null);
    } catch (error) {
      setLoading(false);
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(errorMessage, error);
    }
  };

  // ===================== MyTableEngine =====================
  useEffect(() => {
    fetchData(URL_CATEGORIES, table);
    // fetchData(URL_ALL_CATEGORIES, table);
    if (categories !== null && categories !== undefined) {
      setColspan(columnOrder.length + 1);
    }
  }, [paginate, rows]);

  // Fungsi handler saat checkbox di klik
  const handleCheckboxChange = (id, name, pict) => {
    const isSelected = selectedRows.some((item) => item.id === id);
    const newRow = { id, name, pict };
    if (!isSelected) {
      setSelectedRows([...selectedRows, newRow]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item.id !== id));
    }
  };

  // ---- MyTableEngine Search Filter ----
  useEffect(() => {
    // console.log("sd", searchTerm);
    if (categories !== null && categories.length > 0) {
      if (searchTerm.length > 1 || searchTerm !== "") {
        fetchData(URL_CATEGORIES_SEARCH, table, { search: searchTerm });
      } else if (searchTerm == "") {
        fetchData(URL_CATEGORIES, table);
      }
    }
  }, [searchTerm]);

  const MyTableEngineProps = {
    table: table,
    context: CategorisContext,
    inputData: categories,
    refresh: () => {
      fetchData(URL_CATEGORIES, table);
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
    hideHeaderBtn: ["ALL"],
    selectFilter: categories,
    applyFilter: (form) => {
      fetchData(URL_CATEGORIES_FILTER, table, form);
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
      setCategories(newSortedData);
    },
    // ------------ Table Pagination-------------
    tabPagination: false,
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
    setCategory(id);
    setFormType(formType);
  };

  const ModalProps = {
    table: table,
    table_id: category,
    showModal: showModal,
    setShowModal: setShowModal,
    modalType: modalType,
    formType: formType,
    refresh: () => {
      fetchData(URL_CATEGORIES, table);
      setLoading(true);
    },
    setResultStatus: (type, state, message) =>
      setResultStatus({
        ...resultStatus,
        type: type,
        state: state,
        message: message,
      }),
    select: categories,
    clearData: () => {
      setCategories(null);
      setToggleSelect(false);
      setSelectedRows([]);
      setFormType(null);
    },
  };

  // Urutan kolom yang diinginkan
  const columnOrder = ["id", "customer", "product", "rating"];

  let table_styling = {};
  if (categories !== null && categories.length > 0) {
    table_styling = {
      tbody: `${BgTable}`,
      tr: `h-8 text-left text-xs`,
      th: columnOrder.map((key, index) => ({
        key,
        feature: ["id", "customer", "product", "rating"].includes(key)
          ? "filter"
          : null,
        style: `capitalize px-4`,
      })),
      td: `xborder-2 py-2 px-4 `,
    };
  }

  return (
    <>
      {loading == true ? (
        <SkeltonTable />
      ) : (
        <>
          {categories !== null ? (
            // <CategorisContext.Provider value={MyTableEngineProps}>
            <div id="Categories" className="rounded-lg text-sm ">
              {/* ================ Error ================ */}
              <div>
                {errorMessage && (
                  <SetErrorMessage
                    errorMessage={errorMessage}
                    refresh={() => {
                      fetchData(URL_CATEGORIES, table);
                      setLoading(true);
                    }}
                  >
                    <span className="text-md font-medium my-2">
                      {URL_CATEGORIES}
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

              <MyTableEngine
                {...MyTableEngineProps}
                className="rounded-sm mx-auto "
              >
                <Thead
                  className={`bg-white {BgOuterTable} ${textColor} text-xs`}
                >
                  <Tr key="TableHead" className={table_styling.tr}>
                    {table_styling.th.map((th, index) => (
                      <Th
                        key={index}
                        name={th.key === "id" ? "" : th.key}
                        column={th.key}
                        feature={th.feature}
                        sortOrder="asc"
                        className={th.style}
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
                      className="print:hidden capitalize px-4"
                    ></Th>
                  </Tr>
                </Thead>
                <Tbody className={table_styling.tbody}>
                  {categories.map((row, index) => (
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
                      <Td className={` w-3/12`}>{row.user.username}</Td>
                      <Td className={`${table_styling.td} w-3/12`}>
                        {row.product.name}
                      </Td>
                      <Td className={`px-6 ${table_styling.td} w-3/12`}>
                        <Rating
                          size="small"
                          name="read-only"
                          value={row.rating}
                          readOnly
                        />
                      </Td>
                      <Td className="">
                        <small>{DateFormatter("Day", row.updated_at)}</small>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </MyTableEngine>
            </div>
          ) : (
            // </CategorisContext.Provider>
            "tidak ada data"
          )}
        </>
      )}
    </>
  );
}
