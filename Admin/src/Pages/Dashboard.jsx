import { infoMarket } from "../Config/Temporary"; //Data
import { Container } from "../Layout"; // ./components/index.jsx
import { getMuiIconComponent } from "./../utils/MuiComponent.jsx";

const Dashboard = (pops) => {
  // fetch.()

  return (
    <>
      <h1 className="text-gray-600 text-2xl font-bold">Dashboard</h1>
      <Container className="bg-white">
        <div className="max-w-[1700px] mx-auto py-4 lg:py-5 px-3 lg:px-5">
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
                      } p-2 lg:px-8 lg:py-4 w-full lg:w-96 h-24 lg:h-44 mb-2 lg:mb-0 ${
                        item.name != "User" ? "lg:mr-4" : "lg:mr-0"
                      }`}
                    >
                      <div className="relative bg-transparent w-full h-full bg-opacity-100 z-20">
                        <h1 className="text-lg line-clamp-2 py-4 font-roboto-bold">
                          <i
                            className={`mr-2 text-gray-100 bg-white rounded-lg p-1 bg-opacity-20 backdrop-blur-xl shadow-sm subpixel-antialiased`}
                          >
                            {item.name == "Income" && (
                              <i className="">
                                {getMuiIconComponent("StoreOutlined")}
                              </i>
                            )}
                            {item.name == "Sales" &&
                              getMuiIconComponent("SellOutlined")}
                            {item.name == "Order" &&
                              getMuiIconComponent("ShoppingCartOutlined")}
                            {item.name == "User" &&
                              getMuiIconComponent("GroupAddOutlined")}
                          </i>
                          <span className="capitalize">{item.name}</span>
                          <i className="px-2">
                            {getMuiIconComponent("TrendingUp")}
                          </i>
                        </h1>
                        <h2 className="text-xl line-clamp-2 bg-">
                          {item.name == "Income" && (
                            <div className="flex-col">
                              <div className="">$ {item.value}</div>
                              <div className="text-sm py-4 font-roboto-bold">
                                <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                  4.20%
                                </span>
                                <small className="">Since Last Month</small>
                              </div>
                            </div>
                          )}
                          {item.name == "Sales" && (
                            <div className="flex-col">
                              <div>${item.value}</div>
                              <div className="text-sm py-4 font-roboto-bold">
                                <span className="text-xs text-red-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                  -1.20%
                                </span>
                                <small className="">Since Last Month</small>
                              </div>
                            </div>
                          )}
                          {item.name == "Order" && (
                            <div className="flex-col">
                              <div>${item.value}</div>
                              <div className="text-sm py-4 font-roboto-bold">
                                <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                  +44
                                </span>
                                <small className="">Since Last Month</small>
                              </div>
                            </div>
                          )}
                          {item.name == "User" && (
                            <div className="flex-col">
                              <div>${item.value}</div>
                              <div className="text-sm py-4 font-roboto-bold">
                                <span className="text-xs text-green-600 bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2">
                                  +126
                                </span>
                                <small className="">Since Last Month</small>
                              </div>
                            </div>
                          )}
                        </h2>
                      </div>
                      <div className="z-0">
                        <div className="absolute left-[-20px] top-[-50px] w-20 h-20 rounded-full bg-white bg-opacity-[0.04] backdrop-blur-0"></div>
                        {/* <div className="absolute left-[-150px] top-[-120px] w-56 h-56 rounded-full bg-white bg-opacity-5  backdrop-blur-0"></div> */}
                        <div className="absolute right-[10px] bottom-[-110px] w-40 h-40 rounded-full bg-slate-900 bg-opacity-[0.03] backdrop-blur"></div>
                        <div className="absolute right-[-100px] bottom-[-150px] w-56 h-56 rounded-full bg-slate-800 bg-opacity-[0.05]  backdrop-blur"></div>
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
          <div className="flex w-full font-bold justify-between lg:max-h-[400px] py-4">
            <div className="mockup-code bg-slate-700 w-full h-96 lg:mr-4 flex-wrap lg:flex-nowrap">
              <pre data-prefix="$" className="text-success">
                <code>Line Chart Sales Monthly</code>
              </pre>
            </div>

            <div className="mockup-code bg-slate-700 relative w-[700px] h-96">
              <pre data-prefix="$" className="text-success">
                <code>Pie Chart Top Selling Product</code>
              </pre>
            </div>
          </div>

          {/* baris-3 */}
          <div className="flex font-bold justify-between lg:max-h-[400px] py-4 ">
            <div className="mockup-code bg-slate-700 w-full lg:mr-4 h-96">
              <pre data-prefix="$" className="text-success">
                <code>Summary Table Latest Order</code>
              </pre>
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
  );
};
export default Dashboard;
