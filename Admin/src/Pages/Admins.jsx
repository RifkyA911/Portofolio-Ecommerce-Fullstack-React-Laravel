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
import { MyTableEngine, Th } from "../components/Table/MyTableEngine";
import { MyTablePagination } from "../components/Table/MyTablePagination";

// define fetch data URL by admins
const initUrl = import.meta.env.VITE_API_URL_GET_ALL_ADMIN;

export default function Admins(props) {
  const [count, setCount] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);
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

  // Buat URL berdasarkan rows dan paginate
  const URL = `${initUrl}/paginate/${paginate}/${rows}`;

  const fetchAdmins = async (url, type) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      if (type == "fetch") {
        setAdmins(data.data);
        setErrorMessage(null);
        setLengthData(data.message.length);
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
  // console.table(admins);

  // fetch data pertama kali saat masuk ke halaman admins
  useEffect(() => {
    fetchAdmins(URL, "fetch");
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

  // Panggil fetchData saat komponen pertama kali dimuat atau saat value paginate, rows berubah
  useEffect(() => {
    fetchAdmins(URL, "fetch");
  }, [paginate, rows]);

  return (
    <>
      <Container>
        <Content pageName={"Admins"}>
          {loading == true ? (
            <div className="p-0 bg-white">
              {Array.from({ length: 16 }).map((_, index) => (
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
                    {URL}
                    <button
                      onClick={() => {
                        fetchAdmins(URL, "fetch");
                        setLoading(true);
                      }}
                      className="mx-1 grow-0 shrink-0 focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
                    >
                      <MuiIcon
                        iconName={"FiberManualRecordTwoTone"}
                        fontSize={20}
                      />
                    </button>
                    {/* <NavLink to={`chat/${admins[0]?.id}`}>kss</NavLink> */}
                  </>
                )}
              </div>
              {/* Baris 1 */}

              <MyTableEngine
                inputData={admins}
                refresh={() => {
                  fetchAdmins(URL, "fetch");
                  setLoading(true);
                }}
                TabHeader={true}
              />
              <MyTablePagination
                paginate={paginate}
                onChangePaginate={handlePaginateChange}
                rows={rows}
                onRowsChange={handleRowsChange}
                length={length}
              />
              {/* </MyTableEngine> */}
            </div>
          )}
        </Content>
      </Container>
    </>
  );
}
