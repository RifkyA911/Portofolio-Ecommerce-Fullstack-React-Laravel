import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns"; // Import format dari date-fns
import { ResponsiveContainer } from "recharts";
import { ConvertToDateMonth } from "../../utils/Formatter";
import { sareaOptions } from "./Options";

const orderData = [
  {
    // x: new Date("2023-09-01").getTime(),
    x: ConvertToDateMonth("2023-10-17T09:15:55.000000Z"),
    y: 100,
  },
  {
    x: ConvertToDateMonth("2023-10-18T09:15:55.000000Z"),
    y: 400,
  },
  {
    x: ConvertToDateMonth("2023-10-19T09:15:55.000000Z"),
    y: 150,
  },
  {
    x: ConvertToDateMonth("2023-10-20T09:15:55.000000Z"),
    y: 450,
  },
  {
    x: ConvertToDateMonth("2023-10-21T09:15:55.000000Z"),
    y: 350,
  },
  {
    x: ConvertToDateMonth("2023-10-22T09:15:55.000000Z"),
    y: 150,
  },
  // ...data order lainnya...
];

const productData = [
  {
    // x: new Date("2023-09-01").getTime(),
    x: ConvertToDateMonth("2023-10-17T09:15:55.000000Z"),
    y: 10,
  },
  {
    x: ConvertToDateMonth("2023-10-18T09:15:55.000000Z"),
    y: 60,
  },
  {
    x: ConvertToDateMonth("2023-10-19T09:15:55.000000Z"),
    y: 550,
  },
  {
    x: ConvertToDateMonth("2023-10-20T09:15:55.000000Z"),
    y: 250,
  },
  {
    x: ConvertToDateMonth("2023-10-21T09:15:55.000000Z"),
    y: 450,
  },
  {
    x: ConvertToDateMonth("2023-10-22T09:15:55.000000Z"),
    y: 230,
  },
];

let trigoStrength = 3;
let iteration = 11;

function getRandom() {
  let i = iteration;
  return (
    (Math.sin(i / trigoStrength) * (i / trigoStrength) +
      i / trigoStrength +
      1) *
    (trigoStrength * 2)
  );
}

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = baseval;
    let y =
      (Math.sin(i / trigoStrength) * (i / trigoStrength) +
        i / trigoStrength +
        1) *
      (trigoStrength * 2);

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}

const lineOptions = {
  chart: {
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
    height: 350,
    type: "line",
    stacked: true,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22,
    },
    events: {
      animationEnd: function (chartCtx, opts) {
        const newData1 = chartCtx.w.config.series[0].data.slice();
        newData1.shift();
        const newData2 = chartCtx.w.config.series[1].data.slice();
        newData2.shift();

        // check animation end event for just 1 series to avoid multiple updates
        if (opts.el.node.getAttribute("index") === "0") {
          window.setTimeout(function () {
            chartCtx.updateOptions(
              {
                series: [
                  {
                    data: newData1,
                  },
                  {
                    data: newData2,
                  },
                ],
                subtitle: {
                  text: parseInt(getRandom() * Math.random()).toString(),
                },
              },
              false,
              false
            );
          }, 300);
        }
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  series: [
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
  ],
  xaxis: {
    type: "datetime",
    range: 2700000,
  },
  title: {
    text: "Processes",
    align: "left",
    style: {
      fontSize: "12px",
    },
  },
  subtitle: {
    text: "20",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px",
    },
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: "left",
    onItemClick: {
      toggleDataSeries: false,
    },
    position: "top",
    offsetY: -28,
    offsetX: 60,
  },
};

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
    text: "Area with Annotations",
    align: "left",
    // margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: undefined,
      color: "#263238",
    },
  },
  colors: ["#00BAEC", "#6e44eb"],
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
  },
  yaxis: {
    min: 0,
    tickAmount: 10,
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 3,
    colors: ["#00BAEC", "#6c22b1"],
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
          color: "#6c22b1",
          opacity: 0.2,
        },
        {
          offset: 20,
          color: "#5c6bdb",
          opacity: 0.2,
        },
        {
          offset: 60,
          color: "#00d4ff",
          opacity: 0.2,
        },
        {
          offset: 100,
          color: "#00ffab",
          opacity: 0.2,
        },
      ],
    },
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

export const ApexCharts = ({ type, inputData }) => {
  const [data, setData] = useState([]);
  // {
  //   x: null,
  //   y: null,
  // }
  // useEffect(() => {
  //   // setData({ ...data, x: inputData.stock, y: inputData.created_at });
  //   setData(inputData);
  // }, [inputData]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // useEffect(() => {
  //   // Di sini Anda dapat melakukan permintaan ke API atau sumber data lainnya
  //   // Sebagai contoh, saya akan menggunakan timeout untuk menggambarkan pembaruan data setiap 3 detik
  //   const interval = setInterval(() => {
  //     const newData = [...data];
  //     newData.push(Math.floor(Math.random() * 100)); // Data acak untuk contoh
  //     if (newData.length > 10) {
  //       newData.shift(); // Hanya simpan 10 data terbaru
  //     }
  //     setData(newData);
  //     console.log(newData);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [data]);

  // console.log(inputData);
  return (
    <>
      {data ? (
        <>
          {/* <ResponsiveContainer width="100%" height={400}> */}
          {type == "area" && (
            <Chart
              className="m-auto"
              options={areaOptions}
              series={[
                {
                  name: "OrderArea",
                  data: orderData,
                  // Mengatur gradient fill color
                },
                {
                  name: "ProductArea",
                  data: productData,
                },
              ]}
              type={type} // Menggunakan tipe "area" untuk line chart dengan area diisi
              width="100%" // Atur lebar menjadi 100%
              height={380}
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
              series={[67]}
              width="100%" // Atur lebar menjadi 100%
              height={400}
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
