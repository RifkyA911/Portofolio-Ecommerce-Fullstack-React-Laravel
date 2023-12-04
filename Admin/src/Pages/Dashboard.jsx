import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Config
// Layout
import { Container, Content } from "../Layout"; // ./components/index.jsx
// Components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
// Utils
import { ReactIcons } from "./../utils/RenderIcons.jsx";
import RequestAPI from "../Config/API.jsx";
import { refreshAccessToken, validateAccessToken } from "../Config/Session.jsx";
import TableReview from "../components/Table/MyTableContent.jsx";
import { MotionTabs } from "../components/Button.jsx";
import {
  AreaCharts,
  LineCharts,
  MostViewedProducts,
} from "../components/Dashboard/DashboardCharts.jsx";
import { SkeltonBox } from "../components/Skelton.jsx";
import { CurrencyFormatter } from "../utils/Formatter.js";
import { OrderIconStatus } from "../components/Orders/OrdersTableBody.jsx";

const Dashboard = (props) => {
  // ---- Orders Basic States ----
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState(1);

  // REDUX
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

  const table = "orders";
  const URL_ORDERS = `${table}/paginate/1/10/updated_at/desc/`;

  const orderStatuses = [
    // queue ordered
    // "Pending",
    // "Awaiting Payment",
    // "Processing",
    // "Shipped",
    // "Delivered",
  ];

  const fetchData = async (url, method = "GET", form = null, params = null) => {
    // console.log(url);
    try {
      const { data } = await RequestAPI(
        url,
        method,
        form,
        form
          ? null
          : {
              status: orderStatuses,
            }
      );
      // console.log(data.data);
      setLoading(false);
      setOrders(data.data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(URL_ORDERS);
  }, []);

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
          <div className="">
            {/* baris-1 */}
            <DashboardHeader />
            <div className="my-4"></div>
            {/* baris-2 */}
            <div className="flex lg:max-h-[900px]">
              <div className="flex flex-col lg:flex-row w-full py-2 h-20 lg:h-[450px] overflow-clip">
                <div
                  className={`${BgColor} ${textColor} rounded-xl w-full lg:w-7/12 mr-4 overflow-clip border`}
                >
                  <div className="w-full h-full m-auto">
                    <AreaCharts
                      title={
                        <>
                          <ReactIcons iconName="MdCalendarMonth" />
                          <p className="pl-2">Monthly Product Sales</p>
                        </>
                      }
                    />
                  </div>
                </div>
                {!orders ? (
                  <SkeltonBox
                    className="h-20 lg:h-[450px] w-full rounded-xl"
                    count={1}
                  />
                ) : (
                  <div className="rounded-xl flex flex-col justify-start w-full lg:w-5/12 bg-white border">
                    <MotionTabs
                      onClick={(tabIndex) => setActiveTab(tabIndex)}
                      checked={activeTab}
                      tabs={[
                        {
                          name: "Orders",
                          label: "Orders",
                          render: () => (
                            <>
                              {!orders ? (
                                <p>no</p>
                              ) : (
                                <ul
                                  role="list"
                                  className="divide-y divide-slate-200"
                                >
                                  {orders.map((order, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center py-2 first:pt-0 last:pb-0"
                                    >
                                      <div className="flex flex-col items-center justify-center w-2/12">
                                        <OrderIconStatus
                                          status={order.status}
                                        />
                                        {/* <small className="whitespace-normal line-clamp-2 break-words text-center text-xs">
                                          {order.status}
                                        </small> */}
                                      </div>
                                      <div className="w-10/12 ml-3 overflow-hidden text-left">
                                        <p className="text-sm font-medium text-slate-900">
                                          {order.user.username}
                                        </p>
                                        <p className=" text-sm text-slate-500 truncate">
                                          {CurrencyFormatter(order.total_price)}
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          ),
                        },
                        {
                          name: "Products",
                          label: "Products",
                          render: () => (
                            <div>
                              {" "}
                              <h1>Top Products Sells</h1>
                              <MostViewedProducts />
                            </div>
                          ),
                        },
                        {
                          name: "Reviews",
                          label: "Reviews",
                          render: () => <p>Content for Tab 3</p>,
                        },
                      ]}
                    />
                    {/* {activeTab === 1 && <div>Tab content 1</div>} */}
                  </div>
                )}
              </div>
            </div>

            {/* baris-3 */}
            <div className="flex lg:max-h-[900px]">
              <div className="flex flex-col lg:flex-row w-full py-2">
                <div
                  className={`${BgColor} ${textColor} rounded-xl h-20 lg:h-96 w-full lg:w-7/12 mr-4 `}
                >
                  <div className="my-auto overflow-x-auto border h-full">
                    <TableReview />
                  </div>
                </div>
                <div
                  className={`${BgColor} ${textColor} rounded-xl h-20 px-4 lg:h-96 w-full lg:w-5/12 border`}
                >
                  <h1>Top Products Sells</h1>
                </div>
              </div>
            </div>
          </div>
          {/* {loading == false ? (
            <>
              {charts ? (
                
              ) : (
                <>No Data</>
              )}
            </>
          ) : (
            ""
          )} */}
        </Content>
      </Container>
    </>
  );
};
export default Dashboard;
