import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns"; // Import format dari date-fns
import { ResponsiveContainer } from "recharts";
import { DateFormatter } from "../../utils/Formatter";
import { sareaOptions } from "./Options";
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
  console.log(simplifiedArray);

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
    if (inputData) {
      setSeries({
        ...series,
        first: simplifiedData(
          inputData.map((obj) => ({
            x: DateFormatter("DD/MM", obj.updated_at),
            y: obj.price,
          }))
        ),
      });
    }

    // console.log(inputData);
  }, [inputData]);

  useEffect(() => {
    console.log(series);
  }, [series]);

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
      show: false, // you can either change hear to disable all grids
      borderColor: "#555",
      clipMarkers: false,
      xaxis: {
        lines: {
          show: true, //or just here to disable only x axis grids
        },
      },
      yaxis: {
        lines: {
          show: true, //or just here to disable only y axis
        },
      },
    },
    annotations: {
      points: [
        {
          x: "19 Okt",
          y: 550,
          label: {
            text: "Highest",
            offsetY: 2,
          },
          // image: {
          //   path: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/512px-Flat_tick_icon.svg.png",
          //   width: undefined,
          //   height: undefined,
          //   offsetX: 0,
          //   offsetY: -18,
          // },
        },
      ],
    },
    xaxis: {
      // type: "datetime",
      tickAmount: 10,
      labels: {
        style: {
          colors: chartStyle.text,
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 10,
      labels: {
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

  const BarStackedoptions = {
    series: [
      {
        name: "Marine Sprite",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Striking Calf",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Tank Picture",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Bucket Slope",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: "Reborn Kid",
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Fiction Books Sales",
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
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
                { name: "ProductArea", data: series.first },
              ]}
              sseries={[
                {
                  name: "OrderArea",
                  data: orderData,
                  // Mengatur gradient fill color
                },
                {
                  name: "ProductArea",
                  data: series.first,
                },
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
              options={BarStackedoptions.options}
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
