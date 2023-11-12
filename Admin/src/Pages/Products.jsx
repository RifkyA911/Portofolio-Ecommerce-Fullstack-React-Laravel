import { useState, useEffect, useMemo, useRef, createContext } from "react";
import axios from "axios";
import Barcode from "react-jsbarcode";
// Components
import { SkeltonTable } from "../components/Skelton/SkeltonTable";
import { SetErrorMessage } from "../components/Error/ErrorMessage";
import { MainModalHandler } from "../components/Modal";
import { ProductImage } from "../components/Products/ProductsTableBody";
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

// define fetch data URL_PRODUCT by products
const initUrlProduct = import.meta.env.VITE_API_ALL_PRODUCT;
const initUrlCategories = import.meta.env.VITE_API_ALL_CATEGORIES;

export const ProductsContext = createContext();

export default function Products() {
  // ---- Admins Basic States ----
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
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
  const [product, setProduct] = useState("");
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

  const URL_PRODUCT = `${initUrlProduct}/paginate/${paginate}/${rows}`;
  const URL_PRODUCT_SEARCH = `${initUrlProduct}/search?search=`;
  const URL_PRODUCT_FILTER = `${initUrlProduct}/filter`;
  const URL_CATEGORIES = `${initUrlCategories}/paginate/${paginate}/${rows}`;
  const URL_ALL_CATEGORIES = `${initUrlCategories}`;

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
      if (table === "products") {
        setProducts(data.data);
        setLengthData(data.message.length);
      } else if (table === "categories") {
        setCategories(data.data);
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
    fetchData(URL_PRODUCT, "products");
    fetchData(URL_ALL_CATEGORIES, "categories");
    if (products !== null && products !== undefined) {
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
    if (products !== null && products.length > 0) {
      if (searchTerm.length > 1 || searchTerm !== "") {
        fetchData(URL_PRODUCT_SEARCH, "products", { search: searchTerm });
      } else if (searchTerm == "") {
        fetchData(URL_PRODUCT, "products");
      }
    }
  }, [searchTerm]);

  const MyTableEngineProps = {
    table: "products",
    context: ProductsContext,
    inputData: products,
    refresh: () => {
      fetchData(URL_PRODUCT, "products");
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
    hideHeaderBtn: "",
    selectFilter: categories,
    applyFilter: (form) => {
      fetchData(URL_PRODUCT_FILTER, "products", form);
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
      setProducts(newSortedData);
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
    setProduct(id);
    setFormType(formType);
  };

  const ModalProps = {
    table: "products",
    table_id: product,
    showModal: showModal,
    setShowModal: setShowModal,
    modalType: modalType,
    formType: formType,
    refresh: () => {
      fetchData(URL_PRODUCT, "products");
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
      setProducts(null);
      setToggleSelect(false);
      setSelectedRows([]);
      setFormType(null);
    },
  };

  // Urutan kolom yang diinginkan
  const columnOrder = [
    "id",
    "barcode",
    "pict",
    "name",
    "category",
    "stock",
    "price",
    "discount",
    // "description",
    // "created_at",
    // "updated_at",
  ];

  let table_styling = {};
  if (products !== null && products.length > 0) {
    table_styling = {
      tbody: `${BgTable}`,
      tr: `h-8 text-left`,
      th: columnOrder.map((key, index) => ({
        key,
        feature: [
          "id",
          "barcode",
          "name",
          // "category",
          "price",
          "stock",
          "discount",
        ].includes(key)
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
        <Content pageName={"Products"}>
          {loading == true ? (
            <SkeltonTable />
          ) : (
            <>
              {products !== null ? (
                // <ProductsContext.Provider value={MyTableEngineProps}>
                <div id="Products" className="rounded-lg text-sm ">
                  {/* ================ Error ================ */}
                  <div>
                    {errorMessage && (
                      <SetErrorMessage
                        errorMessage={errorMessage}
                        refresh={() => {
                          fetchData(URL_PRODUCT, "products");
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
                  {resultStatus.type && resultStatus.state == true && (
                    <FormToast
                      formType={resultStatus.type}
                      span={resultStatus.message}
                    />
                  )}
                  {/* ================ Table ================ */}
                  <div className="divider">Product List</div>

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
                      {products.map((row, index) => (
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
                          <Td
                            className={`py-2 px-2 w-1/12 cursor-pointer`}
                            onClick={() => {
                              handleOpenModal(
                                row.id,
                                "SHOW_PRODUCT_BARCODE",
                                "info"
                              );
                            }}
                          >
                            {row.id && (
                              <Barcode
                                className={`h-[64px] p-0 m-0 max-w-[150px]`}
                                value={row.barcode}
                                // options={{ format: "EAN13" }}
                              />
                            )}
                          </Td>
                          <Td className={` w-1/12`}>
                            {row.id && (
                              <ProductImage
                                data={row}
                                onProductPictureClick={() => {
                                  handleOpenModal(
                                    row.id,
                                    "SHOW_PRODUCT_PICTURE",
                                    "info"
                                  );
                                }}
                              />
                            )}
                          </Td>
                          <Td className={`${table_styling.td} w-2/12`}>
                            {row.name}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.category.name}
                          </Td>
                          <Td className={`px-6 ${table_styling.td} w-1/12`}>
                            {row.stock}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {CurrencyFormatter(row.price)}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            <span className="flex flex-row gap-2 justify-center items-center">
                              {row.discount && (
                                <NumberSpan
                                  data={row.discount + " %"}
                                  className="text-green-600 text-sm "
                                />
                              )}
                            </span>
                          </Td>

                          <Td className="print:hidden px-4">
                            {row.id && (
                              <ActionButton
                                key={index}
                                inputData={row}
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
                  <div className="divider">Category List</div>
                  {categories && (
                    <>
                      {categories.map((cat, index) => (
                        <p key={index}>{cat.name}</p>
                      ))}
                    </>
                  )}
                </div>
              ) : (
                // </ProductsContext.Provider>
                "tidak ada data"
              )}
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
