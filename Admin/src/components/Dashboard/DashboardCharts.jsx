import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

// Layout
// Components
import { ApexCharts } from "../Chart/ApexCharts.jsx";
// Utils
import RequestAPI from "../../Config/API.jsx";
import { BarStackedoptions } from "../Chart/Options.jsx";
// Data

export const ProductsCharts = (props) => {
  return (
    <>
      <div></div>
    </>
  );
};

export const MostViewedProducts = (props) => {
  const [charts, setCharts] = useState({
    products: [
      {
        name: "Products",
        data: [],
        zIndex: 0,
      },
    ],
    orders: [
      {
        name: "Orders",
        data: [],
        zIndex: 0,
      },
    ],
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

  const URL_TABLE = `/most/viewed`;
  // const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (table, url, form = null) => {
    try {
      const { data } = await RequestAPI(url, "GET", form);
      // console.log(data.data);
      setLoading(false);
      if (table === "products") {
        setCharts((prevCharts) => ({
          ...prevCharts,
          products: [
            {
              ...prevCharts.products[0], // Menyalin properti yang ada
              data: data.data,
            },
          ],
        }));
        // console.log(data);
      } else if (table === "orders") {
        setCharts((prevCharts) => ({
          ...prevCharts,
          orders: data.data,
        }));
      }
      setLengthData(data.length);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Gagal Fetching '${url}'`);
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchData("orders", "orders" + URL_TABLE);
    fetchData("products", "products" + URL_TABLE);
  }, []);

  useEffect(() => {
    console.log(charts.products[0].data.slice(0, 5));
  }, [charts]);

  return (
    <>
      {!charts.products[0].data ? (
        <p>s</p>
      ) : (
        <>
          {/* {charts.products[0].data.map((d, i) => (
            <p key={i}>{d.x}</p>
          ))} */}
          {/* <ApexCharts
            type="bar"
            inputData={charts}
            series2={charts.products.data}
          /> */}
          {/* {!charts.products ? ( */}
          <Chart
            className="m-auto w-full"
            options={BarStackedoptions}
            series={charts.products}
            type="bar" // Menggunakan tipe "area" untuk line chart dengan area diisi
            width="100%" // Atur lebar menjadi 100%
            height={380}
          />
          {/* ) : (
            <>Loading</>
          )} */}
        </>
      )}
    </>
  );
};
