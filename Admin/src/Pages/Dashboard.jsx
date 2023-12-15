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
  BarsChart,
  LineCharts,
} from "../components/Dashboard/DashboardCharts.jsx";
import { SkeltonBox } from "../components/Skelton.jsx";
import { CurrencyFormatter, DateFormatter } from "../utils/Formatter.js";
import { OrderIconStatus } from "../components/Orders/OrdersTableBody.jsx";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  // ---- Orders Basic States ----
  const [orders, setOrders] = useState();
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
                          <ReactIcons
                            className="text-cyan-500"
                            fontSize={20}
                            iconName="MdCalendarMonth"
                          />
                          <p className="pl-2 font-roboto-medium">
                            Market Income
                          </p>
                        </>
                      }
                    />
                  </div>
                </div>
                {!orders ? (
                  <SkeltonBox
                    className="h-20 lg:h-[450px] w-full lg:w-5/12 rounded-xl"
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
                          label: (
                            <span className="flex flex-row justify-center items-center gap-2">
                              <ReactIcons
                                iconName="HiOutlineShoppingBag"
                                fontSize={20}
                                className="text-orange-400"
                              />
                              <p>Orders</p>
                            </span>
                          ),
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
                                      <div className="flex flex-row items-center w-10/12 ml-3 overflow-hidden text-left justify-between">
                                        <div className="flex flex-col self-start">
                                          <p
                                            className={`text-sm font-medium ${
                                              DarkMode
                                                ? "text-white"
                                                : "text-slate-900"
                                            }`}
                                          >
                                            {order.user.username}
                                          </p>
                                          <p
                                            className={`text-sm ${
                                              DarkMode
                                                ? "text-white"
                                                : "text-slate-500"
                                            } truncate`}
                                          >
                                            {CurrencyFormatter(
                                              order.total_price
                                            )}
                                          </p>
                                        </div>
                                        <div className="flex flex-col self-end">
                                          <small
                                            className={`text-xs ${
                                              DarkMode
                                                ? "text-white"
                                                : "text-slate-600"
                                            } font-roboto-regular`}
                                          >
                                            {DateFormatter(
                                              "Day",
                                              order.updated_at
                                            )}
                                          </small>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                  <li className="flex items-center py-2 w-full">
                                    <Link
                                      to="/orders"
                                      className="text-center p-2 bg-slate-100 w-full rounded-xl"
                                    >
                                      <div
                                        className={`flex flex-row gap-2 justify-center items-center font-semibold text-slate-700`}
                                      >
                                        <ReactIcons iconName="HiDotsHorizontal" />
                                        <span className="pr-3 text-xs">
                                          Check more Orders
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              )}
                            </>
                          ),
                        },
                        {
                          name: "Products",
                          label: (
                            <span className="flex flex-row justify-center items-center gap-2">
                              <ReactIcons
                                iconName="CgMenuBoxed"
                                fontSize={20}
                                className="text-red-400"
                              />
                              <p>Products</p>
                            </span>
                          ),
                          render: () => (
                            <div className="">
                              <BarsChart
                                segments="bestSeller"
                                classname="justify-center text-center"
                                title={
                                  <>
                                    <ReactIcons
                                      iconName="IoBarChart"
                                      className="text-indigo-500"
                                    />
                                    <p className="pl-2">Best Seller Products</p>
                                  </>
                                }
                              />
                            </div>
                          ),
                        },
                        {
                          name: "Popularity",
                          label: (
                            <span className="flex flex-row justify-center items-center gap-2">
                              <ReactIcons
                                iconName="BsEmojiHeartEyes"
                                fontSize={20}
                                className="text-pink-500"
                              />
                              <p>Popularity</p>
                            </span>
                          ),
                          render: () => (
                            <div className="">
                              <BarsChart
                                segments="mostViewed"
                                classname="justify-center text-center"
                                title={
                                  <>
                                    <ReactIcons
                                      iconName="IoBarChart"
                                      className="text-indigo-500"
                                    />
                                    <p className="pl-2">Most Viewed Products</p>
                                  </>
                                }
                              />
                            </div>
                          ),
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
              <div className="flex flex-col lg:flex-row w-full ">
                <div
                  className={`${BgColor} ${textColor} rounded-xl h-20 lg:h-[500px] w-full lg:w-7/12 mr-4 border`}
                >
                  <div className="my-auto overflow-x-auto h-full py-2">
                    <TableReview
                      url="dashboard/ranking/reviews"
                      title={
                        <>
                          <ReactIcons
                            iconName="FaStar"
                            fontSize={20}
                            className="text-amber-500"
                          />
                          <p className="pl-2">Top Reviews</p>
                        </>
                      }
                    />
                  </div>
                </div>
                <div
                  className={`${BgColor} ${textColor} rounded-xl h-20 px-0 lg:h-[500px] w-full lg:w-5/12 border`}
                >
                  <LineCharts
                    title={
                      <>
                        <ReactIcons
                          iconName="IoBarChart"
                          className="text-indigo-500"
                        />
                        <p className="pl-2">Orders Statistic</p>
                      </>
                    }
                  />
                  <ol role="list" className="divide-y divide-slate-200">
                    <li className="flex items-center py-2 first:pt-0 last:pb-0">
                      <ReactIcons
                        iconName="FaPaypal"
                        className="text-indigo-500"
                      />
                      <p className="pl-2 font-roboto-medium">
                        Orders Statistic
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};
export default Dashboard;
