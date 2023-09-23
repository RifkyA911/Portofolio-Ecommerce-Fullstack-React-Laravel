import React, { useState, useEffect } from "react";

// Layout
import { Container } from "../Layout"; // ./components/index.jsx
// Utils
import { getMuiIconComponent } from "./../utils/MuiComponent.jsx";
// Data
import { infoMarket } from "../Config/Temporary"; //Data
import ReactEcharts from "echarts-for-react";
const option = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "line",
      areaStyle: {},
      smooth: true,
    },
  ],
};
const Dashboard = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/product");
      const data = await response.json();
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error too
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  // console.table(product);
  return (
    <>
      {loading == false ? (
        <>
          <Container className="bg-white">
            <div className="max-w-[1700px] mx-auto py-4 lg:py-5 px-3 lg:px-5">
              {/* <h1 className="text-gray-600 text-2xl font-bold font-roboto-medium text-left">
            E-Commerce Dashboard
          </h1> */}
              {/* baris-1 */}
              <div className="font-bold justify-center lg:max-h-64 ">
                <div className="flex flex-wrap lg:flex-nowrap flex-row">
                  <ul className="flex flex-col lg:flex-row lg:justify-between w-full ">
                    {infoMarket.map((item) =>
                      item.flex === "row" || item.flex === "col" ? (
                        <li
                          key={item.name}
                          className={`relative text-left text-xl text-gray-50 overflow-hidden basis-2/6 shrink rounded-xl ${
                            item.color
                          } p-2 lg:px-8 lg:py-3 w-full lg:w-96 h-24 lg:h-44 mb-2 lg:mb-0 ${
                            item.name != "User" ? "lg:mr-4" : "lg:mr-0"
                          }`}
                        >
                          <div className="px-7 lg:px-0 flex lg:block relative bg-transparent w-full h-full bg-opacity-100 z-10">
                            <div className="flex-row lg:block">
                              <h1 className="flex product-center text-lg line-clamp-2 py-4 font-roboto-bold z-10">
                                <i
                                  className={`mr-2 text-gray-100 bg-white rounded-lg py-1 px-2 bg-opacity-20 backdrop-blur-xl shadow-sm subpixel-antialiased`}
                                >
                                  {item.name == "Income" &&
                                    getMuiIconComponent("StoreOutlined")}
                                  {item.name == "Sales" &&
                                    getMuiIconComponent("SellOutlined")}
                                  {item.name == "Order" &&
                                    getMuiIconComponent("ShoppingCartOutlined")}
                                  {item.name == "User" &&
                                    getMuiIconComponent("GroupAddOutlined")}
                                </i>
                                <span className="capitalize text-2xl lg:text-xl">
                                  {item.name}
                                </span>
                                <i className="px-2 text-lime-50">
                                  {getMuiIconComponent("TrendingUp")}
                                </i>
                                {/* <i className="px-2 text-red-500">
                              {getMuiIconComponent("TrendingDown")}
                            </i> */}
                              </h1>
                              <h2 className="text-xl line-clamp-2 ">
                                {item.name == "Income" && (
                                  <div className="lg:flex-col">
                                    <div className="pl-4 lg:pl-0 text-4xl lg:text-2xl font-roboto-regular">
                                      $ {item.value}
                                    </div>
                                    <div className="py-4 font-roboto-bold shadow-sm line-clamp-1">
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
                                    <div className="py-4 font-roboto-bold shadow-sm line-clamp-1">
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
                                    <div className="py-4 font-roboto-bold shadow-sm line-clamp-1">
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
                                    <div className="py-4 font-roboto-bold shadow-sm line-clamp-1">
                                      <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                        102%
                                      </span>
                                      <small className="text-xs font-roboto-reguler">
                                        Since Last Month
                                      </small>
                                    </div>
                                  </div>
                                )}
                              </h2>
                            </div>
                          </div>
                          {/* Backdrop Images */}
                          <div className="z-0">
                            <div className="absolute left-[-20px] top-[-30px] lg:top-[-55px] w-20 h-20 rounded-full bg-white bg-opacity-[0.04] backdrop-blur-0 z-0"></div>
                            <div className="absolute left-[5px] bottom-[15px] lg:bottom-[-6px] w-5 h-5 rounded-full bg-white bg-opacity-[0.04]  backdrop-blur-0 z-0"></div>
                            <div className="absolute right-[10px] bottom-[-110px] w-40 h-40 rounded-full bg-slate-900 bg-opacity-[0.03] backdrop-blur-0 z-0"></div>
                            <div className="absolute right-[-100px] bottom-[-150px] w-56 h-56 rounded-full bg-slate-800 bg-opacity-[0.05]  backdrop-blur-0 z-0"></div>
                          </div>
                        </li>
                      ) : (
                        ""
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="divider mb-0"></div>
              {/* baris-2 */}
              <div className="flex w-full font-bold justify-between lg:max-h-[450px] py-4 overflow-x-scroll">
                <div className=" bg-slate-700 w-full h-96 lg:mr-4 flex-wrap lg:flex-nowrap">
                  <pre data-prefix="$" className="text-success">
                    <code>Line Chart Sales Monthly</code>
                  </pre>

                  <ReactEcharts option={option} />
                </div>
                <div className=" bg-slate-700 relative w-[700px] h-96">
                  <pre data-prefix="$" className="text-success">
                    <code>Pie Chart Top Selling Product</code>
                  </pre>
                </div>
              </div>
              {/* baris-3 */}
              <div className="flex font-bold justify-between lg:max-h-[450px] py-4 overflow-x-scroll">
                <div className="mockup-code bg-slate-700 w-full lg:mr-4 h-96">
                  <pre data-prefix="$" className="text-success">
                    <code>Summary Table Latest Order</code>
                  </pre>
                  <div className="z-40">
                    {product && (
                      <ul>
                        {product.map((product, index) => (
                          <li key={product.id}>
                            <div>
                              <small>{index}</small>
                              <p>{product.name}</p>
                              <p>{product.price}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="mockup-code bg-slate-700 w-[700px] h-96">
                  <pre data-prefix="$" className="text-success">
                    <code>Summary Bar Report</code>
                  </pre>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Dashboard;
