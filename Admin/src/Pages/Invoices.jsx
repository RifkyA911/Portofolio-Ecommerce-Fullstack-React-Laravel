import { useEffect, useState } from "react";
// Components
import Skeleton from "@mui/material/Skeleton";
import { DangerAlert, WarningAlert } from "../components/Alert";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// UTILS
import fetchData from "../utils/API/AsyncFetch";
import { MuiIcon } from "../utils/RenderIcons";
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

export default function Invoices(props) {
  const [transactions, setTransactions] = useState([]);
  // const [admins, setAdmins] = useState([]);
  // const [customer, setCustomer] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

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

  // Custom Const
  const APIGetTransaction = import.meta.env.VITE_API_URL_GET_ALL_TRANSACTION;
  // const URLTransaction = APIGetTransaction + "/paginate/" + 10;
  const URLTransaction = APIGetTransaction;

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
      // setCount(count + 1);
      // console.log("fetching data ke-", count);
    } catch (error) {
      setLoading(false);
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(URLTransaction, "fetch");
  }, []);
  // Handler ketika nilai rows diubah
  const handleRowsChange = (newRows) => {
    setLoading(true);
    setRows(newRows);
  };

  // Handler ketika nilai paginate diubah
  const handlePaginateChange = (newPaginate) => {
    setLoading(true);
    setPaginate(newPaginate);
    console.log(newPaginate);
  };

  const jsonParser = (input) => {
    const parsedAuthority = JSON.parse(input);
    console.log(parsedAuthority);
    // return parsedAuthority
  };
  return (
    <>
      <Container>
        <Content pageName={"Invoices"}>
          {loading == true ? (
            <div className="p-0 bg-white">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="p-4" />
              ))}
            </div>
          ) : (
            <div id="Invoices" className="rounded-lg text-sm ">
              <div>
                {errorMessage && (
                  <>
                    <DangerAlert
                      message={
                        <h1>
                          <MuiIcon
                            iconName={"FiberManualRecordTwoTone"}
                            fontSize={20}
                          />
                          {errorMessage}
                        </h1>
                      }
                    />
                    <button
                      onClick={() => {
                        fetchTransactions();
                        setLoading(true);
                      }}
                      className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                    >
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    </button>
                  </>
                )}
              </div>
              {/* Baris 1 */}

              {/* Baris 2 */}

              <MyTableEngine
                inputData={transactions}
                refresh={() => {
                  fetchTransactions();
                  setLoading(true);
                }}
                TabHeader={false}
              >
                <Table>
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Products</Th>
                      <Th>Quantity</Th>
                      <Th>Total</Th>
                      <Th>Check Out</Th>
                      <Th>Buyer</Th>
                      <Th>Admin</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map((transaction, index) => (
                      <Tr>
                        <Td>{index + 1}</Td>
                        <Td>{transaction.products_id}</Td>
                        <Td>{transaction.products_id}</Td>
                        <Td>{transaction.total_price}</Td>
                        <Td>{transaction.checked_out}</Td>
                        <Td>{transaction.user_id}</Td>
                        <Td>{transaction.admin_id}</Td>
                        <Td>{transaction.sent}</Td>
                        <Td>{transaction.done}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  {/* <MyTablePagination
                    paginate={paginate}
                    onChangePaginate={handlePaginateChange}
                    rows={rows}
                    onRowsChange={handleRowsChange}
                    length={length}
                  /> */}
                </Table>
              </MyTableEngine>
            </div>
          )}
        </Content>
      </Container>
    </>
  );
}
