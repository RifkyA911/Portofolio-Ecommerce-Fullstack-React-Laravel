import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Config
// Layout
import { Container, Content } from "../Layout"; // ./components/index.jsx
// Components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { RenderAreaChart } from "./../components/Chart/Recharts.jsx";
import { ApexCharts } from "../components/Chart/ApexCharts";
// Utils
import { ReactIcons } from "./../utils/RenderIcons.jsx";
import RequestAPI from "../Config/API.jsx";
import { refreshAccessToken, validateAccessToken } from "../Config/Session.jsx";
import TableReview from "../components/Table/MyTableContent.jsx";
import { MotionTabs } from "../components/Button.jsx";
import {
  AreaCharts,
  MostViewedProducts,
} from "../components/Dashboard/DashboardCharts.jsx";

const Dashboard = (props) => {
  const [charts, setCharts] = useState({
    products: [],
    orders: [],
  });
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  const [activeTab, setActiveTab] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // REDUX
  //   import * as ReduxState from './path-to-redux-state';
  // console.log(ReduxState.anotherState);

  const {
    DarkMode,
    container,
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

  const URL_TABLE = `/paginate/${paginate}/${rows}/updated_at/asc`;
  // const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (table, url, form = null) => {
    try {
      const { data } = await RequestAPI(url, form ? "POST" : "GET", form);
      // console.log(data.data);
      setLoading(false);
      if (table === "products") {
        setCharts((prevCharts) => ({
          ...prevCharts,
          products: data.data,
        }));
      } else if (table === "orders") {
        setCharts((prevCharts) => ({
          ...prevCharts,
          orders: data.data,
        }));
      }
      setLengthData(data.message.length);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("orders", "orders" + URL_TABLE);
    fetchData("products", "products" + URL_TABLE);
  }, []);

  // useEffect(() => {
  //   console.log("charts.products", charts.products);
  //   console.log("charts.orders", charts.orders);
  // }, [charts]);

  return (
    <>
      <button
        className="bg-red-300 absolute left-1/2 top-12 z-[99]"
        onClick={() => validateAccessToken()}
      >
        Check Token
      </button>

      <Container>
        <Content pageName="Dashboard" Bg={`${container}`}>
          {loading == false ? (
            <>
              {charts ? (
                <div className="">
                  {/* baris-1 */}
                  <DashboardHeader />
                  <div className="my-4"></div>
                  {/* baris-2 */}
                  <div className="flex lg:max-h-[900px]">
                    <div className="flex flex-col lg:flex-row w-full py-2 h-20 lg:h-[450px] overflow-clip">
                      <div
                        className={`${BgColor} ${textColor} rounded-md w-full lg:w-7/12 mr-4 overflow-clip border`}
                      >
                        <div className="w-full h-full m-auto py-2">
                          {/* <ApexCharts type="area" inputData={charts} /> */}
                          <AreaCharts />
                        </div>
                      </div>
                      <div className="rounded-md flex flex-col justify-start w-full lg:w-5/12 bg-white border">
                        <MotionTabs
                          onClick={(tabIndex) => setActiveTab(tabIndex)}
                          checked={activeTab}
                          tabs={[
                            {
                              name: "Orders",
                              label: "Orders",
                              render: () => <p>Content for Tab 1</p>,
                            },
                            {
                              name: "Products",
                              label: "Products",
                              render: () => <p>Content for Tab 2</p>,
                            },
                            {
                              name: "Reviews",
                              label: "Reviews",
                              render: () => (
                                <ApexCharts type="bar" inputData={charts} />
                              ),
                            },
                          ]}
                        />
                        {/* {activeTab === 1 && <div>Tab content 1</div>} */}
                      </div>
                    </div>
                  </div>

                  {/* baris-3 */}
                  <div className="flex lg:max-h-[900px]">
                    <div className="flex flex-col lg:flex-row w-full py-2">
                      <div
                        className={`${BgColor} ${textColor} rounded-md h-20 lg:h-96 w-full lg:w-7/12 mr-4 `}
                      >
                        <div className="my-auto overflow-x-auto border h-full">
                          <TableReview />
                        </div>
                      </div>
                      <div
                        className={`${BgColor} ${textColor} rounded-md h-20 px-4 lg:h-96 w-full lg:w-5/12 border`}
                      >
                        <h1>Top Products Sells</h1>
                        <MostViewedProducts inputData={charts} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>No Data</>
              )}
            </>
          ) : (
            ""
          )}
        </Content>
      </Container>
    </>
  );
};
export default Dashboard;
