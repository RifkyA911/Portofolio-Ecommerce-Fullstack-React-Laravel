import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Utils
import { ReactIcons } from "./../../utils/RenderIcons";
// Data
import RequestAPI from "../../Config/API";
import { DateFormatter } from "../../utils/Formatter";
import { SkeltonBox } from "../Skelton";

const DashboardHeader = (props) => {
  const [summary, setSummary] = useState(null);
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

  const thisYear = DateFormatter("thisYear");
  const thisMonth = DateFormatter("thisMonth");

  const URL_TABLE = `/summary/headers`;
  // const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(url, "GET", form);
      // console.log(data);
      setLoading(false);
      setSummary(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("dashboard" + URL_TABLE);
  }, []);

  // useEffect(() => {
  //   if (summary) {
  //     console.log(summary[thisYear][thisMonth]);
  //   }
  // }, [summary]);
  const colors = {
    Income: "bg-gradient-to-r from-indigo-500 to-purple-500",
    Sales: "bg-gradient-to-r from-blue-500 to-cyan-500",
    Orders:
      "bg-gradient-to-r from-orange-400 from-[-40%] via-yellow-500 to-yellow-400 to-[100%]",
    Users: "bg-gradient-to-r from-green-500 to-lime-400",
  };

  return (
    <>
      {!summary ? (
        <div className="flex flex-row min-h-[160px] gap-4">
          <SkeltonBox className="min-h-[160px] w-full rounded-xl" count={4} />
        </div>
      ) : (
        <div className="flex flex-wrap lg:flex-nowrap flex-row font-bold justify-center lg:max-h-64 min-h-[160px]">
          {!summary[thisYear][thisMonth] ? (
            <>fetching by Date are not Match</>
          ) : (
            <ul className="flex flex-col lg:flex-row lg:justify-between w-full ">
              {summary[thisYear][thisMonth].map((item, index) => (
                <li
                  key={item.name}
                  className={`${
                    colors[item.name]
                  } relative text-left text-xl text-gray-50 overflow-hidden basis-2/6 shrink rounded-xl p-2 xl:px-8 lg:px-4 lg:py-2 w-full lg:w-96 h-24 lg:h-40 mb-2 lg:mb-0 ${
                    item.name != "Users" ? "lg:mr-4" : "lg:mr-0"
                  }`}
                >
                  {/* <span className="absolute top-[20%] right-0">
                    <LineCharts height={100} width="60%" />
                  </span> */}
                  <div className="px-7 lg:px-0 flex lg:block relative bg-transparent w-full h-full bg-opacity-100 z-10">
                    <div className="flex flex-row lg:block">
                      <h1 className="flex product-center text-lg line-clamp-2 py-4 font-roboto-bold z-10">
                        <i
                          className={`mr-2 text-gray-100 bg-white rounded-lg lg:text-sm lg:p-1 xl:py-1 xl:px-2 bg-opacity-20 backdrop-blur-xl shadow-sm subpixel-antialiased`}
                        >
                          <ReactIcons iconName={item.icon} fontSize={24} />
                        </i>
                        <span className="capitalize text-2xl lg:text-base xl:text-xl">
                          {item.name}
                        </span>
                        <i className="px-2 lg:text-sm xl:text-xl text-lime-50">
                          {
                            <ReactIcons
                              iconName={
                                item.growth.startsWith("-")
                                  ? "MdOutlineTrendingDown"
                                  : "MdOutlineTrendingUp"
                              }
                              fontSize={22}
                            />
                          }
                        </i>
                      </h1>
                      <div className="relative text-xl line-clamp-2 ">
                        <div className="flex xl:flex-col">
                          <div className="pl-4 lg:pl-0 text-4xl lg:text-2xl font-roboto-regular">
                            {`${item.prefix} ${item.value}`}
                          </div>
                          <div className="lg:flex-col py-2 font-roboto-bold shadow-sm xl:line-clamp-1">
                            <span
                              className={`text-xs ${
                                item.growth.startsWith("-")
                                  ? "text-red-500"
                                  : "text-green-600"
                              }  bg-white px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2`}
                            >
                              {item.growth}
                            </span>
                            <small className="text-xs font-roboto-reguler ">
                              {item.period}
                            </small>
                          </div>
                        </div>
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
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
