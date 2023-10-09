import { useEffect, useState } from "react";
// Components
import Skeleton from "@mui/material/Skeleton";
import { DangerAlert, WarningAlert } from "../components/Alert";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useSelector } from "react-redux";
// UTILS
import { MuiIcon } from "../utils/RenderIcons";
import {
  MyTableEngine,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../components/Table/MyTableEngine";
import { SkeltonTable } from "../components/Skelton/SkeltonTable";
import { ActionModalForm, InfoModal } from "../components/Modal";

// Custom Const
const APIGetTransaction = import.meta.env.VITE_API_URL_GET_ALL_TRANSACTION;

export default function Invoices(props) {
  // ---- Admins Basic States ----
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- MyTableEngine Pagination ----
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
  const [transaction, setTransaction] = useState("");
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

  const URL = `${APIGetTransaction}/paginate/${paginate}/${rows}`;

  const fetchTransactions = async (url, type) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      if (type == "fetch") {
        setTransactions(data.data);
        setErrorMessage(null);
        setLengthData(data.message.length);
        // const parsedProducts_id = JSON.parse(data.data[0].products_id);
        // console.log(JSON.parse(data.data[0].products_id));
      } else if (type == "size") {
        console.log(data.message.length);
      }
    } catch (error) {
      setLoading(false);
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(URL, "fetch");
  }, []);

  const JSONParser = (input) => {
    const parsedAuthority = JSON.parse(input);
    console.log(parsedAuthority);
    // return parsedAuthority
  };

  // ===================== MyTableEngine =====================
  // ---- MyTableEngine Search Filter ----
  useEffect(() => {
    const filteredData = transactions.filter((transactions) =>
      transactions.products_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchTerm, transactions]);

  const MyTableEngineProps = {
    inputData: transactions,
    refresh: () => {
      fetchTransactions(URL, "fetch");
      setLoading(true);
    },
    // ------------- Table Header Menu -------------
    TabHeader: true,
    hideHeaderBtn: "deleteBtn",
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
      setTransactions(newSortedData);
    },
    // ------------ Table Pagination-------------
    TabPagination: true,
    colSpan: 7,
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
    table: "transactions",
    table_id: transaction,
    refresh: () => {
      fetchTransactions(URL, "fetch");
      setLoading(true);
    },
    formType: formType,
    clearData: () => {
      setTransaction(null);
      setToggleSelect(false);
      setSelectedRows([]);
      setFormType(null);
    },
  };

  return (
    <>
      {/* <AdminsContext.Provider value={AdminsContextValue}> */}
      <Container>
        <Content pageName={"Invoices"}>
          {loading == true ? (
            <SkeltonTable />
          ) : (
            <div id="Invoices" className="rounded-lg text-sm ">
              {/* ================ Error ================ */}
              <div>
                {errorMessage && (
                  <SetErrorMessage
                    errorMessage={errorMessage}
                    refresh={() => {
                      fetchTransactions(URL, "fetch");
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
                  <Tr key="TableHead" className="h-8 text-center">
                    <Th
                      column="id"
                      feature="filter"
                      sortOrder="asc"
                      className="px-4"
                    ></Th>
                    <Th name="Checked Out" column="checked_out">
                      Checked Out
                    </Th>
                    <Th
                      name="Products"
                      column="products_id"
                      feature="filter"
                    ></Th>
                    <Th
                      name="Total Price"
                      column="total_price"
                      className="text-center"
                    >
                      Total Price
                    </Th>

                    <Th name="Quantity" column="qty" feature="filter"></Th>
                    <Th name="User" column="user_id" feature="filter"></Th>
                    <Th name="Admin" column="admin_id" feature="filter"></Th>
                  </Tr>
                </Thead>
                <Tbody className={`${BgTable} `}>
                  {searchResults.map((row, index) => (
                    <Tr
                      key={index}
                      customKey={index}
                      className={"divide-y min-h-[40px]:"}
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
                          {selectedRows.some((item) => item.id === row.id) ? (
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
                      <Td className="flex-1 w-2/12 border-2 ">
                        {row.checked_out}
                      </Td>
                      <Td className="flex-1 w-2/12 border-2 ">
                        {row.products_id}
                      </Td>
                      <Td className="flex-1 w-2/12 border-2 ">
                        {row.total_price}
                      </Td>
                      <Td className="flex-1 w-2/12 border-2">{row.user_id}</Td>
                      <Td className="flex-1 w-2/12 border-2 ">
                        {row.admin_id}
                      </Td>
                      <Td className="flex-1 w-2/12 border-2 ">
                        {row.admin_id}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </MyTableEngine>
            </div>
          )}
        </Content>
      </Container>
      {/* </AdminsContext.Provider> */}
    </>
  );
}
