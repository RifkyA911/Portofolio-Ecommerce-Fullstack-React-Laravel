import React, { useState, useEffect } from "react";

// Layout
import { Container } from "../Layout"; // ./components/index.jsx
import DashboardHeader from "../components/Dashboard/DashboardHeader";
// Utils
import { getMuiIcon } from "./../utils/RenderIcons.jsx";
// Data
import ReactEcharts from "echarts-for-react";

const Dashboard = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const option = {
    title: {
      text: "Stacked Area Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
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

  async function fetchData() {
    const URLproduct = import.meta.env.VITE_API_URL_GET_ALL_PRODUCT;
    try {
      const response = await fetch(URLproduct);
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
  // console.log(product[0]?.name);
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
              <DashboardHeader />
              <div className="divider mb-0"></div>
              {/* baris-2 */}
              <div className="flex w-full font-bold justify-between lg:max-h-[450px] py-4 overflow-x-scroll">
                <div className=" bg-white w-full h-96 lg:mr-4 ">
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
