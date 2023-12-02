import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns"; // Import format dari date-fns
import { ResponsiveContainer } from "recharts";
import { DateFormatter } from "../../utils/Formatter";
import { BarStackedoptions, sareaOptions } from "./Options";
import { useSelector } from "react-redux";
import { orderData } from "../../Config/Temporary";

export const simplifiedData = (inputObject) => {
  // Menggunakan objek untuk menyimpan nilai y berdasarkan nilai x
  const simplifiedData = inputObject.reduce((result, { x, y }) => {
    // Menambahkan nilai y untuk nilai x yang sama
    result[x] = (result[x] || 0) + y;
    return result;
  }, {});

  // Mengonversi objek kembali menjadi array
  const simplifiedArray = Object.keys(simplifiedData).map((x) => ({
    x,
    y: simplifiedData[x],
  }));
  // console.log(simplifiedArray);

  return simplifiedArray;
};

export const ApexCharts = ({ type, inputData }) => {
  const [data, setData] = useState(inputData);
  const [series, setSeries] = useState({
    first: [],
    second: [],
  });
  const [chartStyle, setChartStyle] = useState({
    text: "black",
    areaChart: ["#00BAEC", "#6c22b1"],
  });

  // REDUX
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

  useEffect(() => {
    // console.log(inputData);
    if (inputData) {
      if ("products" in inputData) {
        setSeries({
          ...series,
          first: simplifiedData(
            inputData.products.map((obj) => ({
              x: DateFormatter("DD/MM", obj.updated_at).slice(0, 6),
              y: obj.price,
            }))
          ),
          second: simplifiedData(
            inputData.orders.map((obj) => ({
              x: DateFormatter("DD/MM", obj.updated_at).slice(0, 6),
              y: obj.total_price,
            }))
          ),
        });
      }
    }

    // console.log(inputData);
  }, [inputData]);

  // useEffect(() => {
  //   console.log(series);
  // }, [series]);

  useEffect(() => {
    DarkMode
      ? setChartStyle({
          ...chartStyle,
          text: "white",
        })
      : setChartStyle({
          ...chartStyle,
          text: "black",
        });
  }, [DarkMode]);

  const areaOptions = {
    chart: {
      id: "area-chart",
      fontFamily: "Helvetica, Arial, sans-serif",
      toolbar: {
        show: true,
        foreColor: "#ccc",
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    title: {
      text: "Product Orders Monitor",
      align: "left",
      // margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: 300,
        color: chartStyle.text,
      },
    },
    colors: ["#00BAEC", "#6e44eb"], // Line color
    legend: {
      show: true,
      labels: {
        colors: chartStyle.text,
        useSeriesColors: false,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    stroke: {
      width: 3,
    },
    grid: {
      show: false,
      borderColor: "#555",
      clipMarkers: false,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      tickAmount: 10,
      labels: {
        style: {
          colors: chartStyle.text,
        },
      },
    },
    yaxis: {
      min: 0,
      // max: 100000 ?? 1000000,
      tickAmount: 12, // Jumlah patokan (ticks) pada sumbu Y
      labels: {
        formatter: function (val) {
          return Math.round(String(val).slice(0, 3)) + "K";
        },
        style: {
          colors: chartStyle.text,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
      colors: chartStyle.areaChart,
      strokeColor: "#ffffff",
      strokeWidth: 2,
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.8,
        colorStops: [
          {
            offset: 0,
            color: "#00ffab",
            opacity: 0.2,
          },
          {
            offset: 20,
            color: "#00d4ff",
            opacity: 0.2,
          },
          {
            offset: 60,
            color: "#5c6bdb",
            opacity: 0.2,
          },
          {
            offset: 100,
            color: "#6c22b1",
            opacity: 0.2,
          },
        ],
      },
    },

    responsive: [
      {
        breakpoint: undefined,
        options: {},
      },
    ],
  };

  return (
    <>
      {data && series ? (
        <>
          {/* <ResponsiveContainer width="100%" height={400}> */}
          {type == "area" && series.first && (
            <Chart
              className="m-auto"
              options={areaOptions}
              series={[
                { name: "ProductArea", data: series.first },
                { name: "OrderArea", data: series.second },
              ]}
              type={type} // Menggunakan tipe "area" untuk line chart dengan area diisi
              width="100%" // Atur lebar menjadi 100%
              height={400}
            />
          )}
          {type == "line" && (
            <Chart
              className="m-auto"
              // options={areaOptions}
              options={lineOptions}
              series={[
                {
                  name: "Running",
                  data: generateMinuteWiseTimeSeries(
                    new Date("12/12/2016 00:20:00").getTime(),
                    12,
                    {
                      min: 30,
                      max: 110,
                    }
                  ),
                },
                {
                  name: "Waiting",
                  data: generateMinuteWiseTimeSeries(
                    new Date("12/12/2016 00:20:00").getTime(),
                    12,
                    {
                      min: 30,
                      max: 110,
                    }
                  ),
                },
              ]}
              type={type} // Menggunakan tipe "area" untuk line chart dengan area diisi
              width="100%" // Atur lebar menjadi 100%
              height={400}
            />
          )}
          {type == "radialBar" && (
            <Chart
              className="m-auto"
              // options={areaOptions}
              options={sareaOptions}
              type={type} // Menggunakan tipe "area" untuk line chart dengan area diisi
              series={[74]}
              width="100%" // Atur lebar menjadi 100%
              height={400}
            />
          )}
          {type == "bar" && (
            <Chart
              className="m-auto w-full"
              options={BarStackedoptions}
              series={BarStackedoptions.series}
              type={type} // Menggunakan tipe "area" untuk line chart dengan area diisi
              width="100%" // Atur lebar menjadi 100%
              height={380}
            />
          )}
          {/* </ResponsiveContainer> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
