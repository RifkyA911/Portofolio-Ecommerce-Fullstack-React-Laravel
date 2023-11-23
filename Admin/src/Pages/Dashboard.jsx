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
import { refreshAccessToken } from "../Config/Session.jsx";
import TableReview from "../components/Table/MyTableContent.jsx";

const Dashboard = (props) => {
  const [products, setProducts] = useState([]);
  const [length, setLengthData] = useState();
  const [paginate, setPaginate] = useState(1);
  const [rows, setRows] = useState(10);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // REDUX
  //   import * as ReduxState from './path-to-redux-state';
  // console.log(ReduxState.anotherState);

  const {
    DarkMode,
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

  const table = {
    product: {
      all: "products",
      id: "product",
    },
    category: {
      all: "categories",
      id: "category",
    },
    review: {
      all: "reviews",
      id: "review",
    },
    admin: {
      all: "admins",
      id: "admin",
    },
    customer: {
      all: "users",
      id: "user",
    },
  };

  const URL_TABLE = `${table.product.all}/paginate/${paginate}/${rows}/updated_at/asc`;
  const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (url, form = null) => {
    try {
      const { data } = await RequestAPI(url, form ? "POST" : "GET", form);
      // console.log(data.data);
      setLoading(false);
      if (table.product.all == "products") {
        setProducts(data.data);
      }
      setLengthData(data.message.length);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(URL_TABLE);
  }, []);

  return (
    <>
      {/* <button onClick={() => refreshAccessToken()}>FFFFFFF</button> */}

      <Container>
        <Content pageName="Dashboard">
          {loading == false ? (
            <>
              {products ? (
                <div className="">
                  {/* baris-1 */}
                  <DashboardHeader />
                  <div className="divider mb-0"></div>
                  {/* baris-2 */}
                  <div className="flex lg:max-h-[900px]">
                    <div className="flex flex-col lg:flex-row w-full py-2 h-20 lg:h-[450px] overflow-clip">
                      <div
                        className={`${BgColor} ${textColor} rounded-xl w-full lg:w-7/12 mr-4 overflow-clip border`}
                      >
                        <div className="w-full h-full m-auto py-2">
                          <ApexCharts type="area" inputData={products} />
                        </div>
                      </div>
                      <div className="rounded-xl flex flex-col justify-start w-full lg:w-5/12 bg-white border">
                        s
                      </div>
                    </div>
                  </div>

                  {/* baris-3 */}
                  <div className="flex lg:max-h-[900px]">
                    <div className="flex flex-col lg:flex-row w-full py-2">
                      <div
                        className={`${BgColor} ${textColor} rounded-xl h-20 lg:h-96 w-full lg:w-7/12 mr-4`}
                      >
                        <div className="overflow-x-auto border">
                          <TableReview />
                        </div>
                      </div>
                      <div className="rounded-xl h-20 lg:h-96 w-full lg:w-5/12 bg-white border">
                        <ApexCharts type="bar" inputData={products} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
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
