import { useState, useEffect, useMemo, useRef, createContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import debounce from "lodash/debounce";
import Barcode from "react-jsbarcode";
// Components
import { SkeltonTable } from "../components/Skelton/SkeltonTable";
import { SetErrorMessage } from "../components/Error/ErrorMessage";
import { ActionModalForm, InfoModal, PrintModal } from "../components/Modal";
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
import { MuiIcon } from "../utils/RenderIcons";
import { newAbortSignal } from "../utils/API/AxiosToken";
import { PrintTest } from "../components/Print";
import { useReactToPrint } from "react-to-print";

// define fetch data URL by products
const initUrl = import.meta.env.VITE_API_ALL_PRODUCT;

export const ProductsContext = createContext();

export default function Products() {
  // ---- Admins Basic States ----
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
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
  const [product, setProduct] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState(null);

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

  const URL = `${initUrl}/paginate/${paginate}/${rows}`;
  const URL_SEARCH = `${initUrl}/search?search=`;

  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.table(data.data);
      setLoading(false);
      setProducts(data.data);
      setErrorMessage(null);
      setLengthData(data.message.length);
    } catch (error) {
      setLoading(false);
      let message = "Gagal Fetching Product";
      setErrorMessage(message);
      console.error(message, error);
    }
  };

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  useEffect(() => {
    fetchProducts(URL);
    if (products !== null && products !== undefined) {
      setColspan(columnOrder.length + 1);
    }
  }, [paginate, rows]);

  // Handler Ketika mengklik info button
  const handleInfoButton = (id, formType) => {
    setShowModal(true);
    setProduct(id);
    setFormType(formType);
  };

  // Handler Ketika mengklik actions button
  const handleActionButton = (id, formType) => {
    setProduct(id);
    setFormType(formType);
  };

  // ===================== MyTableEngine =====================
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
  // useEffect(() => {
  //   console.info(selectedRows);
  // }, [selectedRows]);

  const searchProducts = async (url, form) => {
    const controller = new AbortController();
    try {
      const response = await axios.post(`${url}${form}`, {
        signal: controller.signal,
      });
      setProducts(response.data.data);
      setLengthData(response.data.message.length);
    } catch (error) {
      console.error(error);
    }
  };

  // ---- MyTableEngine Search Filter ----
  useEffect(() => {
    // console.log("sd", searchTerm);
    if (products !== null && products.length > 0) {
      if (searchTerm.length > 1 || searchTerm !== "") {
        // searchProducts(URL_SEARCH, searchTerm);
        searchProducts(URL_SEARCH, searchTerm);
      } else if (searchTerm == "") {
        fetchProducts(URL);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    if (products) {
      setCategories(products.map((item) => item.category));
    }
  }, [products]);
  // set select input options
  //   console.log(select);

  const MyTableEngineProps = {
    context: ProductsContext,
    inputData: products,
    refresh: () => {
      fetchProducts(URL, "fetch");
      setLoading(true);
    },
    // ------------- Table Header Menu -------------
    TabHeader: true,
    hideHeaderBtn: "",
    printBtn: useReactToPrint({
      content: () => componentRef.current,
      // documentTitle: `${employee.name.replace(/\s/g, "-")}-Payslip`,
      documentTitle: `Payslip`,
      onPrintError: () => alert("there is an error when printing"),
    }),
    searchTerm: searchTerm,
    setSearchTerm: (e) => {
      setSearchTerm(e.target.value);
      // setTimeout(setSearchTerm(e.target.value), 2000);
    },
    setPrintModal: () => {
      document.getElementById("ModalForms").showModal();
      handleActionButton(selectedRows, "PRINT_BATCH");
    },
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
    selectedRows: selectedRows,
    setSelectedRows: (propsValue) => setSelectedRows(propsValue),
    // Sorting Filter
    sortData: (newSortedData) => {
      setProducts(newSortedData);
    },
    // ------------ Table Pagination-------------
    TabPagination: true,
    colSpan: colspan == null ? 5 : colspan,
    paginate: paginate,
    onChangePaginate: (newPaginate) => {
      setLoading(true);
      setPaginate(newPaginate);
      // console.log("paginate-", newPaginate);
    },
    rows: rows,
    onRowsChange: (newRows) => {
      setLoading(true);
      setRows(newRows);
    },
    length: length,
  };

  // ===================== Modal =====================
  const ModalProps = {
    table: "products",
    table_id: product,
    select: categories,
    showModal: showModal,
    setShowModal: () => {
      setShowModal(false);
    },
    refresh: () => {
      fetchProducts(URL, "fetch");
      setLoading(true);
    },
    formType: formType,
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
          "category",
          "price",
          "stock",
          "discount",
        ].includes(key)
          ? "filter"
          : null,
        style: `capitalize px-4`,
      })),
      td: `border-2 py-2 px-2 `,
    };
  }

  // useEffect(() => {
  //   console.info(table_styling);
  // }, [table_styling]);
  let componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // documentTitle: `${employee.name.replace(/\s/g, "-")}-Payslip`,
    documentTitle: `Payslip`,
    onPrintError: () => alert("there is an error when printing"),
  });
  return (
    <>
      {/* <AdminsContext.Provider value={AdminsContextValue}> */}
      <Container>
        <Content pageName={"Products"}>
          {loading == true ? (
            <SkeltonTable />
          ) : (
            <>
              {products !== null ? (
                // <ProductsContext.Provider value={MyTableEngineProps}>
                <div
                  ref={componentRef}
                  id="Products"
                  className="rounded-lg text-sm "
                >
                  {/* <div className="print:hidden">
                    <button
                      onClick={handlePrint}
                      className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 max-w-sm"
                    >
                      Print Payslip
                    </button>
                  </div> */}
                  {/* ================ Error ================ */}
                  <div>
                    {errorMessage && (
                      <SetErrorMessage
                        errorMessage={errorMessage}
                        refresh={() => {
                          fetchProducts(URL, "fetch");
                          setLoading(true);
                        }}
                      >
                        <span className="text-md font-medium my-2">{URL}</span>
                      </SetErrorMessage>
                    )}
                  </div>
                  {/* ================ Modal ================= */}
                  <InfoModal {...ModalProps} />
                  <PrintModal {...ModalProps} />
                  <ActionModalForm {...ModalProps} />
                  {/* ================ Table ================ */}
                  <PrintTest inputData={products} />
                  <div className="divider">Product List</div>
                  <MyTableEngine
                    {...MyTableEngineProps}
                    className="rounded-md mx-auto"
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
                          customKey={index}
                          className={
                            "divide-y font-roboto-medium capitalize text-gray-900"
                          }
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
                            className={`${table_styling.td} w-1/12 cursor-pointer`}
                            onClick={() => {
                              handleInfoButton(row, "SHOW_PRODUCT_BARCODE");
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
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.id && (
                              <ProductImage
                                data={row}
                                onProductPictureClick={() => {
                                  handleInfoButton(row, "SHOW_PRODUCT_PICTURE");
                                }}
                              />
                            )}
                          </Td>
                          <Td className={`${table_styling.td} w-2/12`}>
                            {row.name}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.category?.name}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.stock}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.price}
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
                                  document
                                    .getElementById("PrintModal")
                                    .showModal();
                                  handleActionButton(row.id, "PRINT_BY_ID");
                                }}
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
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </MyTableEngine>
                  <div className="divider">Category List</div>
                </div>
              ) : (
                // </ProductsContext.Provider>
                "tidak ada data"
              )}
            </>
          )}
        </Content>
      </Container>
      {/* </AdminsContext.Provider> */}
    </>
  );
}
