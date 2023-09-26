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
import { MyTableEngine } from "../components/Table/MyTableEngine";

export default function Admins(props) {
  const [admins, setAdmins] = useState([]);
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
  const URLadmins = import.meta.env.VITE_API_URL_GET_ALL_ADMIN;

  const fetchAdmins = () => {
    fetchData(URLadmins)
      .then((response) => {
        setAdmins(response.data);
        setLoading(false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of error too
        console.error("Error fetching data:", error);
        setErrorMessage("Gagal mengambil data", error);
      });
  };
  // console.log(URLadmins);
  useEffect(() => {
    fetchAdmins();
  }, []);

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
              <WarningAlert
                message={
                  "OTW Req SQL SELECT * FROM admins LIMIT dynamic page request"
                }
              />

              {/* Baris 2 */}

              <MyTableEngine
                inputData={admins}
                refresh={() => {
                  fetchAdmins();
                  setLoading(true);
                }}
              />
              {/* <MyTableEngine>
                <Table>
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
                  <Pagination />
                </Table>
              </MyTableEngine> */}
            </div>
          )}
        </Content>
      </Container>
    </>
  );
}
