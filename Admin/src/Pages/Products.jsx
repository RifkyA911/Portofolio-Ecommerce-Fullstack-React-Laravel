import { useState, useEffect } from "react";
// Components
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
import { SkeltonTable } from "../components/Skelton/SkeltonTable";
import { SetErrorMessage } from "../components/Error/ErrorMessage";
import { ActionModalForm, InfoModal } from "../components/Modal";
import { ProductImage } from "../components/Products/ProductsTableBody";
import { ActionButton } from "../components/Button";

// define fetch data URL by products
const initUrl = import.meta.env.VITE_API_URL_GET_ALL_PRODUCT;

export default function Products() {
  // ---- Admins Basic States ----
  const [products, setProducts] = useState([]);
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
  const [select, setSelect] = useState();
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

  useEffect(() => {
    fetchProducts(URL);
  }, [paginate, rows]);

  // Handler Ketika mengklik info button
  const handleInfoButton = (id, formType) => {
    // console.log("data = ", id);
    setShowModal(true);
    setProduct(id);
    setFormType(formType);
  };

  // Handler Ketika mengklik actions button
  const handleActionButton = (id, formType) => {
    // console.log("data = ", id);
    setProduct(id);
    setFormType(formType);
  };

  // ===================== MyTableEngine =====================
  // Fungsi handler saat checkbox di klik
  const handleCheckboxChange = (id, name, pict) => {
    // Cek apakah indeks sudah ada dalam selectedRows
    const isSelected = selectedRows.some((item) => item.id === id);

    // Buat objek yang berisi indeks, name, dan pict
    const newRow = { id, name, pict };

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
  }, [selectedRows]);

  // ---- MyTableEngine Search Filter ----
  useEffect(() => {
    if (products !== null && products.length > 0) {
      const filteredData = products.filter((products) =>
        products.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredData);
      const newColspan = Object.keys(products[0]).length;
      setColspan(newColspan);
    }
    if (products) {
      // Mengambil semua kategori unik dari data
      setSelect([...new Set(products.map((item) => item.category))]);
      // console.log(select);
    }
  }, [searchTerm, products]);

  const MyTableEngineProps = {
    inputData: products,
    refresh: () => {
      fetchProducts(URL, "fetch");
      setLoading(true);
    },
    // ------------- Table Header Menu -------------
    TabHeader: true,
    hideHeaderBtn: "",
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
      setProducts(newSortedData);
    },
    // ------------ Table Pagination-------------
    TabPagination: true,
    colSpan: colspan == null ? 5 : colspan,
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
  };

  // ===================== Modal =====================
  const ModalProps = {
    table: "products",
    table_id: product,
    select: select,
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
    "pict",
    "name",
    "category",
    "stock",
    "price",
    "discount",
    "description",
    "created_at",
    "updated_at",
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
                <div id="Products" className="rounded-lg text-sm ">
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
                  <ActionModalForm {...ModalProps} />
                  {/* ================ Table ================ */}
                  <MyTableEngine {...MyTableEngineProps} className="rounded-xl">
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
                            hidden={
                              th.key === "created_at" || th.key === "updated_at"
                                ? true
                                : false
                            }
                          ></Th>
                        ))}
                        <Th
                          key={55}
                          name="Action"
                          column="Action"
                          feature={null}
                          className="capitalize px-4"
                        ></Th>
                      </Tr>
                    </Thead>
                    <Tbody className={table_styling.tbody}>
                      {searchResults.map((row, index) => (
                        <Tr
                          key={index}
                          customKey={index}
                          className={"divide-y "}
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
                                className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                              >
                                {parseInt(row.id) == 0
                                  ? parseInt(row.id) + 1
                                  : row.id}
                              </Th>
                            </>
                          )}
                          <Td className={`${table_styling.td} 2/12`}>
                            <ProductImage
                              data={row}
                              onProductPictureClick={() => {
                                handleInfoButton(row, "SHOW_PRODUCT_PICTURE");
                              }}
                            />
                          </Td>
                          <Td className={`${table_styling.td} w-2/12`}>
                            {row.name}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.category}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.stock}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.price}
                          </Td>
                          <Td className={`${table_styling.td} w-1/12`}>
                            {row.discount}
                          </Td>
                          <Td className={`${table_styling.td} w-2/12`}>
                            <div className="line-clamp-5">
                              {row.description}
                            </div>
                          </Td>
                          <Td className="px-4">
                            <ActionButton
                              key={index}
                              data={row}
                              hide={["view, print"]}
                              onClickView={() => {
                                document
                                  .getElementById("ModalForms")
                                  .showModal();
                                handleActionButton(row.id, "DROP_BY_ID");
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
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </MyTableEngine>
                </div>
              ) : (
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
