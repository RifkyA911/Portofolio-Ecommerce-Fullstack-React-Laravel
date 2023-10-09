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

  // ===================== MyTableEngine =====================
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
      document.getElementById("AdminForm").showModal();
      handleActionButton(null, "INSERT");
    },
    setDeleteModal: () => {
      // console.table(Object.assign({}, selectedRows));
      document.getElementById("AdminForm").showModal();
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
    table_id: products,
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

  let table_styling = {};
  if (products !== null && products.length > 0) {
    table_styling = {
      tbody: `${BgTable}`,
      th: Object.keys(products[0]).map((key) => ({
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
      tr: `h-8 text-center`,
      td: `flex-1 w-2/12 border-2 py-2 px-2 `,
    };
    console.table(table_styling);
  }

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
                  <MyTableEngine {...MyTableEngineProps}>
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
                            <Th
                              key={index}
                              feature={"select"}
                              onChange={() => handleCheckboxChange(row.id)}
                              selectedRows={selectedRows}
                              rowId={row.id}
                              className=""
                            >
                              {selectedRows.some(
                                (item) => item.id === row.id
                              ) ? (
                                <button
                                  onClick={() => handleCheckboxChange(row.id)}
                                  className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-20 cursor-pointer"
                                ></button>
                              ) : (
                                <button
                                  onClick={() => handleCheckboxChange(row.id)}
                                  className="absolute top-0 left-0 w-full h-full bg-transparent hover:bg-gray-500 opacity-10 cursor-pointer"
                                ></button>
                              )}
                            </Th>
                          ) : (
                            <Th
                              key={index}
                              className={`{BgOuterTable} bg-slate-100 text-gray-600 text-center w-0 p-0 font-roboto-bold border-b-[2px] border-white`}
                            >
                              {parseInt(row.id) == 0
                                ? parseInt(row.id) + 1
                                : row.id}
                            </Th>
                          )}
                          <Td className={table_styling.td}>{row.name}</Td>
                          <Td className="flex-1 w-2/12 border-2 ">
                            {row.category}
                          </Td>
                          <Td className="flex-1 w-2/12 border-2 ">
                            {row.price}
                          </Td>
                          <Td className="flex-1 w-2/12 border-2">
                            {row.stock}
                          </Td>
                          <Td className="flex-1 w-2/12 border-2 ">
                            {row.discount}
                          </Td>
                          <Td className="flex-1 w-2/12 border-2 max-h-[40px]">
                            {row.description}
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
