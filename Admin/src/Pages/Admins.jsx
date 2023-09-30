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

const initUrl = import.meta.env.VITE_API_URL_GET_ALL_ADMIN_PAGINATE;

export default function Admins(props) {
  const [count, setCount] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [URL, setURL] = useState(`${initUrl}/${paginate}/${rows}`);

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
  const URL = `http://127.0.0.1:8000/api/admins/paginate/${paginate}/${rows}`;

  // const fetchAdmins = (URL) => {
  //   fetchData(URL)
  //     .then((response) => {
  //       setAdmins(response.data);
  //       setLoading(false);
  //       setErrorMessage(null);
  //     })
  //     .catch((error) => {
  //       setLoading(false); // Set loading to false in case of error too
  //       console.error("Error fetching data:", error);
  //       setErrorMessage("Gagal mengambil data", error);
  //     });
  // };

  const fetchAdmins = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Lakukan sesuatu dengan data yang diterima
      setAdmins(data.data);
      setLoading(false);
      setErrorMessage(null);
      setCount(count + 1);
      console.log("fetching data ke-", count);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  // console.table(admins);

  useEffect(() => {
    fetchAdmins(URL);
  }, []);

  // Handler ketika nilai rows diubah
  const handleRowsChange = (newRows) => {
    setLoading(true);
    setRows(newRows);
    // Panggil fetchData dengan URL yang baru
    // fetchAdmins(URL);
    // console.log("admin: ", rows);
  };

  // Panggil fetchData saat komponen pertama kali dimuat atau saat paginate, rows berubah
  useEffect(() => {
    fetchAdmins(URL);
  }, [paginate, rows]);

  return (
    <>
      <Container>
        <Content pageName={"Admins"}>
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
                    {URL}
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
                    {/* <NavLink to={`chat/${admins[0]?.id}`}>kss</NavLink> */}
                  </>
                )}
              </div>
              {/* Baris 1 */}

              <MyTableEngine
                inputData={admins}
                refresh={() => {
                  fetchAdmins();
                  setLoading(true);
                }}
                TabHeader={true}
              />
              <MyTablePagination
                paginate={paginate}
                rows={rows}
                onRowsChange={handleRowsChange}
                BgOuterTable={BgOuterTable}
                textColor={textColor}
              />
              {/* </MyTableEngine> */}
            </div>
          )}
        </Content>
      </Container>
    </>
  );
}
