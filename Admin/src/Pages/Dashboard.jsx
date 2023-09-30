import React, { useState, useEffect } from "react";

// Layout
import { Container, Content } from "../Layout"; // ./components/index.jsx
import DashboardHeader from "../components/Dashboard/DashboardHeader";
// Utils
import { MuiIcon } from "./../utils/RenderIcons.jsx";
import fetchData from "./../utils/API/AsyncFetch.js";
// Data
import { RenderAreaChart } from "./../components/Recharts.jsx";
import { useSelector } from "react-redux";
import MyChart from "../components/ApexChartDateTimeX";

const Dashboard = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  // REDUX
  //   import * as ReduxState from './path-to-redux-state';
  // console.log(ReduxState.anotherState);

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
  const URLproduct =
    import.meta.env.VITE_API_URL_GET_ALL_PRODUCT_PAGINATE + "/1/10";

  useEffect(() => {
    fetchData(URLproduct)
      .then((response) => {
        // console.log(response); // Cetak seluruh objek respons
        // console.log(response.data); // Akses properti 'data' dari objek respons
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error jika ada
      });
  }, []);
  // console.table(product);
  // console.log(product[0]?.name);
  return (
    <>
      <Container className="bg-white">
        <Content pageName="Dashboard">
          {loading == false ? (
            <>
              <div className="overflow-scroll">
                {/* baris-1 */}
                <DashboardHeader />
                <div className="divider mb-0"></div>
                {/* baris-2 */}
                <div className="flex bg-gray-400 font-bold lg:max-h-[900px]">
                  <div className="flex flex-col lg:flex-row w-full py-2 h-20 lg:h-[500px] overflow-clip">
                    <div
                      className={`${BgColor} ${textColor} rounded-xl w-full lg:w-7/12 mr-4 overflow-clip`}
                    >
                      <h4>Line Chart Product & Order</h4>
                      <div className="w-full max-w-full h-auto px-4">
                        <MyChart />
                      </div>
                    </div>
                    <div className="rounded-xl h-20 lg:h-96 w-full lg:w-5/12 bg-white"></div>
                  </div>
                </div>

                {/* baris-3 */}
                <div className="flex bg-gray-400 font-bold lg:max-h-[900px]">
                  <div className="flex flex-col lg:flex-row w-full py-2">
                    <div
                      className={`${BgColor} ${textColor} rounded-xl h-20 lg:h-96 w-full lg:w-7/12 mr-4`}
                    >
                      <h4>Table Top Product & Order</h4>
                      <div className="overflow-x-auto">
                        <table className="table table-xs text-black">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Job</th>
                              <th>company</th>
                              <th>location</th>
                              <th>Last Login</th>
                              <th>Favorite Color</th>
                            </tr>
                          </thead>
                          {product && (
                            <tbody>
                              {product.map((product, index) => (
                                <tr key={product.id}>
                                  <th>{index + 1}</th>
                                  <td>{product.name}</td>
                                  <td>{product.category}</td>
                                  <td>{product.price}</td>
                                  <td>
                                    <div className="rating rating-xs">
                                      <input
                                        type="radio"
                                        name="rating-5"
                                        className="mask mask-star-2 bg-orange-400"
                                      />
                                      <input
                                        type="radio"
                                        name="rating-5"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked
                                      />
                                      <input
                                        type="radio"
                                        name="rating-5"
                                        className="mask mask-star-2 bg-orange-400"
                                      />
                                      <input
                                        type="radio"
                                        name="rating-5"
                                        className="mask mask-star-2 bg-orange-400"
                                      />
                                      <input
                                        type="radio"
                                        name="rating-5"
                                        className="mask mask-star-2 bg-orange-400"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                    <div className="rounded-xl h-20 lg:h-96 w-full lg:w-5/12 bg-white">
                      p
                    </div>
                  </div>
                </div>
              </div>
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
