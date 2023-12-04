import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Config
import RequestAPI from "../../Config/API.jsx";
import {
  BarStackedoptions,
  LineOptions,
  areaOptions,
} from "../Chart/Options.jsx";
// Layout
import Chart from "react-apexcharts";
import { SkeltonBox } from "../Skelton.jsx";
// Components
// Utils

export const AreaCharts = (props) => {
  const { title } = props;
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

  const URL_TABLE = `/chart/area`;
  // const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (table, url, form = null) => {
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
    fetchData("products", "dashboard" + URL_TABLE);
  }, []);

  // useEffect(() => {
  //   console.log(chart);
  // }, [chart]);

  let chartOptions = areaOptions();
  return (
    <>
      {!chart ? (
        <SkeltonBox className="h-20 lg:h-[450px] w-full rounded-xl" count={1} />
      ) : (
        <div className="px-2">
          <div className="flex flex-row items-center text-left font-roboto-bold pt-2 px-2">
            {title}
          </div>
          <Chart
            className="m-auto w-full"
            options={chartOptions}
            series={[chart.products, chart.orders]}
            type="area" // Menggunakan tipe "area" untuk line chart dengan area diisi
            width="100%" // Atur lebar menjadi 100%
            height={380}
          />
        </div>
      )}
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

  const URL_TABLE = `/chart/bars`;
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
    fetchData("products", "dashboard" + URL_TABLE);
  }, []);

  let chartOptions = BarStackedoptions();

  return (
    <>
      {!charts.products[0].data ? (
        <SkeltonBox className="h-20 lg:h-[450px] w-full rounded-xl" count={1} />
      ) : (
        <>
          <Chart
            className="m-auto w-full"
            options={chartOptions}
            series={charts.products}
            type="bar" // Menggunakan tipe "area" untuk line chart dengan area diisi
            width="100%" // Atur lebar menjadi 100%
            height={320}
          />
          {/* ) : (
            <>Loading</>
          )} */}
        </>
      )}
    </>
  );
};

export const LineCharts = (props) => {
  const { height = 300, width = "100%" } = props;

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

  const URL_TABLE = `/chart/line`;
  // const URL_TABLE_FILTER = `${table}/filter`;

  const fetchData = async (table, url, form = null) => {
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
    fetchData("products", "dashboard" + URL_TABLE);
  }, []);

  // useEffect(() => {
  //   console.log(chart);
  // }, [chart]);

  let chartOptions = LineOptions();
  return (
    <>
      {!chart ? (
        <p>s</p>
      ) : (
        <>
          <Chart
            className="m-auto w-full"
            options={chartOptions}
            series={chartOptions.series}
            type="line" // Menggunakan tipe "area" untuk line chart dengan area diisi
            width={width} // Atur lebar menjadi 100%
            height={height}
          />
        </>
      )}
    </>
  );
};
