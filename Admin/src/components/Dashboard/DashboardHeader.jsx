import React, { useState, useEffect } from "react";
// Utils
import { MuiIcon } from "./../../utils/RenderIcons";
// Data
import { infoMarket } from "./../../Config/Temporary"; //Data
import { useSelector } from "react-redux";
import RequestAPI from "../../Config/API";

const DashboardHeader = (props) => {
  const [chart, setChart] = useState();
  const [loading, setLoading] = useState(true);

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

  const URL_TABLE = `/summary/headers`;
  // const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(url, "GET", form);
      // console.log(data);
      setLoading(false);
      setChart(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("dashboard" + URL_TABLE);
  }, []);

  return (
    <>
      <div className="font-bold justify-center lg:max-h-64 ">
        <div className="flex flex-wrap lg:flex-nowrap flex-row">
          <ul className="flex flex-col lg:flex-row lg:justify-between w-full ">
            {infoMarket.map((item) =>
              item.flex === "row" || item.flex === "col" ? (
                <li
                  key={item.name}
                  className={`relative text-left text-xl text-gray-50 overflow-hidden basis-2/6 shrink rounded-xl ${
                    item.color
                  } p-2 xl:px-8 lg:px-4 lg:py-2 w-full lg:w-96 h-24 lg:h-40 mb-2 lg:mb-0 ${
                    item.name != "User" ? "lg:mr-4" : "lg:mr-0"
                  }`}
                >
                  {/* <span className="absolute top-[20%] right-0">
                    <LineCharts height={100} width="60%" />
                  </span> */}
                  <div className="px-7 lg:px-0 flex lg:block relative bg-transparent w-full h-full bg-opacity-100 z-10">
                    <div className="flex flex-row lg:block">
                      <h1 className="flex product-center text-lg line-clamp-2 py-4 font-roboto-bold z-10">
                        {/* <Link to=""> </Link> */}
                        <i
                          className={`mr-2 text-gray-100 bg-white rounded-lg lg:text-sm lg:p-1 xl:py-1 xl:px-2 bg-opacity-20 backdrop-blur-xl shadow-sm subpixel-antialiased`}
                        >
                          {item.name == "Income" && (
                            <MuiIcon iconName="StoreOutlined" />
                          )}
                          {item.name == "Sales" && (
                            <MuiIcon iconName="SellOutlined" />
                          )}
                          {item.name == "Order" && (
                            <MuiIcon iconName="ShoppingCartOutlined" />
                          )}
                          {item.name == "User" && (
                            <MuiIcon iconName="GroupAddOutlined" />
                          )}
                        </i>
                        <span className="capitalize text-2xl lg:text-base xl:text-xl">
                          {item.name}
                        </span>
                        <i className="px-2 lg:text-sm xl:text-xl text-lime-50">
                          {<MuiIcon iconName="TrendingUp" />}
                        </i>
                        {/* <i className="px-2 text-red-500">
                              {<MuiIcon iconName="TrendingDown" />}
                            </i> */}
                      </h1>
                      <div className="relative text-xl line-clamp-2 ">
                        {item.name == "Income" && (
                          <div className=" xl:flex-col">
                            <div className="pl-4 lg:pl-0 text-4xl lg:text-2xl font-roboto-regular">
                              $ {item.value}
                            </div>
                            <div className="lg:flex-col py-2 font-roboto-bold shadow-sm xl:line-clamp-1">
                              <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                4.20%
                              </span>
                              <small className="text-xs font-roboto-reguler ">
                                Since Last Month
                              </small>
                            </div>
                          </div>
                        )}
                        {item.name == "Sales" && (
                          <div className="flex-col">
                            <div className="pl-4 lg:pl-0 text-4xl lg:text-2xl font-roboto-regular">
                              $ {item.value}
                            </div>
                            <div className=" py-2 font-roboto-bold shadow-sm line-clamp-1">
                              <span className="text-xs text-red-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                -1.20%
                              </span>
                              <small className="text-xs font-roboto-reguler">
                                Since Last Month
                              </small>
                            </div>
                          </div>
                        )}
                        {item.name == "Order" && (
                          <div className="flex-col">
                            <div className="pl-4 lg:pl-0 text-4xl lg:text-2xl font-roboto-regular">
                              + {item.value}
                            </div>
                            <div className="py-2 font-roboto-bold shadow-sm line-clamp-1">
                              <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                160%
                              </span>
                              <small className="text-xs font-roboto-reguler">
                                Since Last Month
                              </small>
                            </div>
                          </div>
                        )}
                        {item.name == "User" && (
                          <div className="flex-col">
                            <div className="pl-4 lg:pl-0 text-4xl lg:text-2xl font-roboto-regular">
                              + {item.value}
                            </div>
                            <div className="py-2 font-roboto-bold shadow-sm line-clamp-1">
                              <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                102%
                              </span>
                              <small className="text-xs font-roboto-reguler">
                                Since Last Month
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Backdrop Images */}
                  <div className="z-0">
                    <div className="absolute left-[-20px] top-[-30px] lg:top-[-55px] w-20 h-20 rounded-full bg-white bg-opacity-[0.04] backdrop-blur-0 z-0"></div>
                    <div className="absolute left-[5px] bottom-[15px] lg:bottom-[-6px] w-5 h-5 rounded-full bg-white bg-opacity-[0.04]  backdrop-blur-0 z-0"></div>
                    <div className="absolute right-[10px] bottom-[-110px] w-40 h-40 rounded-full bg-slate-900 bg-opacity-[0.03] backdrop-blur-0 z-0"></div>
                    <div className="absolute right-[-100px] bottom-[-150px] w-56 h-56 rounded-full bg-slate-800 bg-opacity-[0.05]  backdrop-blur-[0px] z-0"></div>
                  </div>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
