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
} from "../components/Table/MyTableEngine";

export default function Invoices(props) {
  // const [admins, setAdmins] = useState([]);
  // const [customer, setCustomer] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [length, setLengthData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log(JSON.parse(data.data[0].products_id));
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
            <div id="Admins" className="rounded-lg text-sm ">
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
                        fetchAdmins();
                        setLoading(true);
                      }}
                      className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                    >
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    </button>
                    <NavLink to={`chat/${admins[0]?.id}`}>kss</NavLink>
                  </>
                )}
              </div>
              {/* Baris 1 */}

              {/* Baris 2 */}

              {/* <MyTableEngine
                inputData={admins}
                refresh={() => {
                  fetchAdmins();
                  setLoading(true);
                }}
              /> */}
              {/* <Table>
                <Thead>
                  <Th>
                    <Td></Td>
                  </Th>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td></Td>
                  </Tr>
                </Tbody>
              </Table> */}
            </div>
          )}
        </Content>
      </Container>
    </>
  );
}
