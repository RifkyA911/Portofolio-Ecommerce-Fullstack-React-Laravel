import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateFormatter } from "../../utils/Formatter";

export const areaOptions = (text) => {
  const [chartStyle, setChartStyle] = useState({
    text: "black",
    areaChart: ["#00BAEC", "#9e4ee8"],
  });

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
  return {
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
      text: text ?? "Area Chart",
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
      offsetY: -2,
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
      width: 2,
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
          if (val >= 1000) {
            const formattedValue =
              val % 1000 === 0
                ? (val / 1000).toFixed(0)
                : (val / 1000).toFixed(1);
            return `${formattedValue}K`;
          }
          return val;
          // return Math.round(String(val).slice(0, 3)) + "K";
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
        opacityTo: 0.3,
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
            color: "#0088ec",
            opacity: 0.2,
          },
          {
            offset: 100,
            color: "#00edff",
            opacity: 0.2,
          },
        ],
      },
      // gradient: {
      //   shadeIntensity: 1,
      //   opacityFrom: 0.7,
      //   opacityTo: 0.9,
      //   stops: [0, 100],
      // },
    },

    responsive: [
      {
        breakpoint: undefined,
        options: {},
      },
    ],
  };
};

export const BarStackedoptions = (object) => {
  const { colors, plotOptions } = object;
  const [chartStyle, setChartStyle] = useState({
    text: "black",
    areaChart: ["#00BAEC", "#6c22b1"],
  });

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
  return {
    annotations: {},
    chart: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: 22,
      animations: {
        enabled: false,
        easing: "swing",
      },
      foreColor: "#373D3F",
      height: 300,
      id: "Un2mw",
      stacked: true,
      toolbar: {
        show: false,
      },
      type: "bar",
      width: 500,
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        vertical: plotOptions.bar.vertical ?? true,
        horizontal: plotOptions.bar.horizontal ?? false,
        barHeight: "50%",
        distributed: true,
        borderRadius: 8,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        hideZeroBarsWhenGrouped: false,
        isDumbbell: false,
        isFunnel: false,
        isFunnel3d: true,
        colors: {
          backgroundBarColors: ["#f1f2f3"],
        },
      },
    },
    colors: colors ?? ["#893FD3", "#7A31E8", "#5D3FD3", "#3F44D3", "#2B55EB"],
    dataLabels: {
      offsetY: 1,
      style: {
        colors: ["#fff"],
      },
      background: {
        enabled: false,
      },
    },
    fill: {},
    grid: {
      show: false,
      padding: {
        right: 25,
        left: 15,
      },
    },
    legend: {
      show: false,
      fontSize: 14,
      offsetY: -6,
      markers: {
        shape: "square",
        size: 8,
      },
      itemMargin: {
        vertical: 0,
      },
    },
    stroke: {
      show: false,
      width: 3,
      colors: ["#fff"],
      fill: {
        type: "solid",
        opacity: 0.85,
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
    xaxis: {
      labels: {
        trim: true,
        style: {
          colors: DarkMode ? "#fff" : "#000",
        },
        formatter: function (val) {
          // Fungsi ini akan memformat nilai sumbu X
          // Contoh: 20000 -> 20k
          if (val >= 1000) {
            return (val / 1000).toFixed(0) + "k";
          }
          return val;
        },
      },
      group: {
        groups: [],
        style: {
          colors: [],
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "",
        },
      },
      tickPlacement: "between",
      title: {
        style: {
          fontWeight: 700,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          // colors: [null, null, null, null, null],
          colors: DarkMode ? "#fff" : "#000",
          fontWeight: 600,
        },
        formatter: function (val) {
          // Batasi jumlah karakter hingga 10 dan tambahkan ...
          if (val.length > 6) {
            return val.slice(0, 6) + "...";
          }
          return val;
        },
      },
      title: {
        style: {},
      },
    },
    theme: {
      palette: "palette2",
    },
  };
};

export const LineOptions = (props) => {
  const [chartStyle, setChartStyle] = useState({
    text: "black",
    areaChart: ["#00BAEC", "#6c22b1"],
  });

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
  return {
    annotations: {},
    chart: {
      animations: {
        enabled: false,
        easing: "swing",
      },
      // background: "#fff",
      dropShadow: {
        enabled: true,
        color: "#FFFFFF",
      },
      foreColor: "#373D3F",
      fontFamily: "Helvetica, Arial, sans-serif",

      height: 250,
      id: "UJUCY",
      toolbar: {
        show: false,
      },
      width: 500,
    },
    colors: ["#16B6EB", "#c7f464", "#81D4FA", "#fd6a6a", "#546E7A"],
    dataLabels: {
      enabled: false,
      style: {
        fontWeight: 700,
      },
    },
    grid: {
      show: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        right: 0,
        left: 0,
      },
    },
    legend: {
      show: false,
      fontSize: 14,
      offsetY: 0,
      itemMargin: {
        vertical: 0,
      },
    },
    markers: {
      hover: {
        sizeOffset: 6,
      },
    },
    series: [
      {
        name: "Likes",
        data: [
          {
            x: "1/11",
            y: 4,
          },
          {
            x: "2/11",
            y: 3,
          },
          {
            x: "3/11",
            y: 10,
          },
          {
            x: "4/11",
            y: 9,
          },
          {
            x: "5/11",
            y: 29,
          },
          {
            x: "6/11",
            y: 19,
          },
          {
            x: "7/11",
            y: 22,
          },
          {
            x: "8/11",
            y: 9,
          },
          {
            x: "9/11",
            y: 12,
          },
          {
            x: "10/11",
            y: 7,
          },
          {
            x: "11/11",
            y: 19,
          },
          {
            x: "12/11",
            y: 5,
          },
        ],
      },
    ],
    stroke: {
      lineCap: "round",
      width: 4,
      curve: "smooth",
      fill: {
        type: "solid",
        opacity: 0.85,
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
    },
    xaxis: {
      type: "numeric",
      labels: {
        show: false,
        style: {
          fontSize: 15,
        },
      },
      group: {
        groups: [],
        style: {
          colors: [],
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: "dataPoints",
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
    yaxis: {
      show: false,
      tickAmount: 5,
      labels: {
        style: {},
      },
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
  };
};

export const DonutOptions = () => {
  const [chartStyle, setChartStyle] = useState({
    text: "black",
    areaChart: ["#00BAEC", "#6c22b1"],
  });

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
  return {
    annotations: {},
    chart: {
      animations: {
        enabled: false,
      },
      foreColor: "#fff",
      fontFamily: "Helvetica, Arial, sans-serif",

      height: 250,
      id: "k79el",
      stackOnlyBar: true,
      toolbar: {
        show: false,
      },
      type: "donut",
      width: 300,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            name: {},
            value: {},
            total: {},
          },
        },
      },
    },
    colors: ["#B561E9", "#7F50EC", "#6C7DE8", "#5AD4D8", "#5CD075"],
    dataLabels: {
      enabled: false,
      style: {
        fontWeight: 700,
        colors: ["#fff"],
      },
    },
    fill: {
      opacity: 1,
      gradient: {
        colorStops: [
          {
            opacity: 1,
            offset: 0,
            color: "#008ffb",
          },
          {
            opacity: 1,
            offset: 100,
            color: "#775dd0",
          },
        ],
      },
    },
    grid: {
      padding: {
        right: 0,
        bottom: 12,
        left: 10,
      },
    },
    labels: ["A", "B", "C", "D", "E"],
    legend: {
      show: false,
      position: "right",
      fontSize: 14,
      offsetY: 0,
      itemMargin: {
        vertical: 0,
      },
    },
    series: [11, 24, 32, 13, 32],
    stroke: {
      fill: {
        type: "solid",
        opacity: 0.85,
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
    },
    tooltip: {
      hideEmptySeries: true,
      fillSeriesColor: true,
      y: {
        formatter: function (val) {
          return val + " units"; // Formatter untuk nilai di tooltip
        },
        style: {
          color: "#fff", // Warna teks pada tooltip saat hover
        },
      },
    },
    xaxis: {
      labels: {
        trim: true,
        style: {},
      },
      group: {
        groups: [],
        style: {
          colors: [],
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "",
        },
      },
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
    yaxis: {
      labels: {
        style: {},
      },
      title: {
        style: {
          fontWeight: 700,
        },
      },
    },
    theme: {
      palette: "palette2",
    },
    _chartInstances: [
      {
        id: "k79el",
        chart: {
          opts: {
            annotations: {
              position: "front",
              yaxis: [],
              xaxis: [],
              points: [],
            },
            chart: {
              type: "donut",
              background: "",
              foreColor: "#333",
              offsetX: 0,
              offsetY: 0,
              toolbar: {
                show: false,
              },
              animations: {
                enabled: false,
              },
              dropShadow: {
                enabled: false,
                top: 2,
                left: 2,
                blur: 4,
                color: "#000",
                opacity: 0.35,
              },
              fontFamily: "Roboto",
              height: 250,
              width: 300,
              id: "k79el",
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "70%",
                barHeight: "70%",
                distributed: false,
                borderRadius: 10,
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "last",
                colors: {
                  ranges: [],
                  backgroundBarColors: [],
                  backgroundBarOpacity: 1,
                },
                dataLabels: {
                  position: "top",
                },
              },
              heatmap: {
                radius: 2,
                enableShades: true,
                shadeIntensity: 0.5,
              },
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                offsetX: 0,
                offsetY: 0,
                hollow: {
                  margin: 5,
                  size: "50%",
                  background: "#fff",
                  position: "front",
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    color: "#000",
                    opacity: 0.5,
                  },
                },
                track: {
                  show: true,
                  background: "#f2f2f2",
                  strokeWidth: "97%",
                  opacity: 1,
                  margin: 5,
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    color: "#000",
                    opacity: 0.5,
                  },
                },
                dataLabels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: 16,
                    offsetY: 0,
                  },
                  value: {
                    show: true,
                    fontSize: 14,
                    offsetY: 16,
                  },
                  total: {
                    show: false,
                    label: "Total",
                    fontSize: 16,
                  },
                },
              },
              pie: {
                startAngle: 0,
                endAngle: 360,
                offsetX: 0,
                offsetY: 0,
                dataLabels: {
                  offset: 0,
                },
                donut: {
                  size: "65%",
                  labels: {
                    show: false,
                    name: {
                      show: true,
                      fontSize: 16,
                      offsetY: -10,
                    },
                    value: {
                      show: true,
                      fontSize: 20,
                      offsetY: 10,
                    },
                    total: {
                      show: false,
                      showAlways: false,
                      label: "Total",
                      fontSize: 16,
                    },
                  },
                },
              },
              radar: {
                offsetX: 0,
                offsetY: 0,
                polygons: {
                  strokeColors: "#e8e8e8",
                  connectorColors: "#e8e8e8",
                  fill: {},
                },
              },
            },
            theme: {
              mode: "light",
              palette: "palette4",
            },
            dataLabels: {
              enabled: true,
              textAnchor: "middle",
              offsetX: 0,
              offsetY: 0,
              style: {
                fontSize: 12,
                fontWeight: 700,
              },
              background: {
                enabled: true,
                foreColor: "#fff",
                borderRadius: 2,
                padding: 4,
                opacity: 0.9,
                borderWidth: 1,
                borderColor: "#fff",
              },
              dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: "#000",
                opacity: 0.45,
              },
            },
            markers: {
              size: 0,
              strokeColors: "#fff",
              strokeWidth: 2,
              strokeOpacity: 0.9,
              strokeDashArray: 0,
              fillOpacity: 1,
              shape: "circle",
              radius: 2,
              offsetX: 0,
              offsetY: 0,
              hover: {},
            },
            xaxis: {
              type: "category",
              offsetX: 0,
              offsetY: 0,
              position: "bottom",
              labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                trim: true,
                offsetX: 0,
                offsetY: 0,
                style: {
                  fontSize: 12,
                  fontWeight: 400,
                },
              },
              axisBorder: {
                show: true,
                color: "#e0e0e0",
              },
              axisTicks: {
                show: true,
                color: "#e0e0e0",
              },
              title: {
                style: {
                  fontSize: 12,
                  fontWeight: 700,
                },
              },
              crosshairs: {
                show: true,
                width: 1,
                position: "back",
                opacity: 0.9,
                stroke: {
                  color: "#b6b6b6",
                  width: 1,
                },
                fill: {
                  type: "solid",
                  color: "#B1B9C4",
                  gradient: {
                    colorFrom: "#D8E3F0",
                    colorTo: "#BED1E6",
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  },
                },
                dropShadow: {
                  enabled: false,
                  left: 0,
                  top: 0,
                  blur: 1,
                  opacity: 0.4,
                },
              },
              convertedCatToNumeric: false,
            },
            yaxis: [null],
            grid: {
              show: true,
              borderColor: "#e0e0e0",
              strokeDashArray: 0,
              position: "back",
              xaxis: {
                lines: {
                  show: false,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
              row: {
                opacity: 0.5,
              },
              column: {
                opacity: 0.5,
              },
              padding: {
                top: 0,
                right: 25,
                bottom: 0,
                left: 20,
              },
            },
            stroke: {
              show: true,
              curve: "smooth",
              lineCap: "butt",
              width: 2,
              dashArray: 0,
            },
            fill: {
              type: "solid",
              opacity: 1,
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 100],
              },
              pattern: {
                style: "squares",
                width: 6,
                height: 6,
                strokeWidth: 2,
              },
            },
            legend: {
              show: true,
              showForSingleSeries: false,
              floating: false,
              position: "right",
              horizontalAlign: "center",
              fontSize: 14,
              fontWeight: 400,
              offsetX: -20,
              offsetY: 0,
              labels: {
                useSeriesColors: false,
              },
              markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: "#fff",
                radius: 12,
              },
              itemMargin: {
                horizontal: 5,
                vertical: 0,
              },
              onItemClick: {
                toggleDataSeries: true,
              },
              onItemHover: {
                highlightDataSeries: true,
              },
            },
          },
          w: {
            globals: {
              chartID: "k79el",
              cuid: "z71bs3xi",
              events: {
                beforeMount: [],
                mounted: [],
                updated: [],
                clicked: [],
                selection: [],
                dataPointSelection: [],
                zoomed: [],
                scrolled: [],
              },
              clientX: null,
              clientY: null,
              fill: {
                colors: [
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                  "#B561E9",
                  "#7F50EC",
                  "#6C7DE8",
                  "#5AD4D8",
                  "#5CD075",
                ],
              },
              stroke: {},
              dataLabels: {
                style: {},
              },
              radarPolygons: {
                fill: {
                  colors: [
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                    "none",
                  ],
                },
              },
              markers: {
                size: [0, 0, 0, 0, 0, 0],
                largestSize: 0,
              },
              animationEnded: true,
              isDirty: true,
              isExecCalled: false,
              initialConfig: {
                forecastDataPoints: {
                  count: 0,
                  fillOpacity: 0.5,
                  dashArray: 4,
                },
                markers: {
                  discrete: [],
                  size: 0,
                  strokeColors: "#fff",
                  strokeWidth: 2,
                  strokeOpacity: 0.9,
                  strokeDashArray: 0,
                  fillOpacity: 1,
                  shape: "circle",
                  width: 8,
                  height: 8,
                  radius: 2,
                  offsetX: 0,
                  offsetY: 0,
                  showNullDataPoints: true,
                  hover: {
                    sizeOffset: 3,
                  },
                },
                noData: {
                  align: "center",
                  verticalAlign: "middle",
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                    fontSize: "14px",
                  },
                },
                responsive: [],
                states: {
                  normal: {
                    filter: {
                      type: "none",
                      value: 0,
                    },
                  },
                  hover: {
                    filter: {
                      type: "lighten",
                      value: 0.1,
                    },
                  },
                  active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                      type: "darken",
                      value: 0.5,
                    },
                  },
                },
                title: {
                  align: "left",
                  margin: 5,
                  offsetX: 0,
                  offsetY: 0,
                  floating: false,
                  style: {
                    fontSize: "14px",
                    fontWeight: 900,
                    foreColor: "#00A6FF",
                  },
                },
                subtitle: {
                  align: "left",
                  margin: 5,
                  offsetX: 0,
                  offsetY: 30,
                  floating: false,
                  style: {
                    fontSize: "12px",
                    fontWeight: 400,
                  },
                },
              },
              initialSeries: [11, 24, 32, 13, 32],
              lastXAxis: [],
              lastYAxis: [],
              columnSeries: null,
              labels: ["A", "B", "C", "D", "E"],
              timescaleLabels: [],
              noLabelsProvided: false,
              allSeriesCollapsed: false,
              collapsedSeries: [],
              collapsedSeriesIndices: [],
              ancillaryCollapsedSeries: [],
              ancillaryCollapsedSeriesIndices: [],
              risingSeries: [],
              dataFormatXNumeric: false,
              capturedSeriesIndex: -1,
              capturedDataPointIndex: -1,
              selectedDataPoints: [],
              goldenPadding: 35,
              invalidLogScale: false,
              ignoreYAxisIndexes: [],
              yAxisSameScaleIndices: [],
              maxValsInArrayIndex: 0,
              radialSize: 105.21951219512196,
              zoomEnabled: true,
              panEnabled: false,
              selectionEnabled: false,
              yaxis: null,
              mousedown: false,
              lastClientPosition: {},
              yValueDecimal: 0,
              total: 0,
              SVGNS: "http://www.w3.org/2000/svg",
              svgWidth: 300,
              svgHeight: 250,
              noData: false,
              locale: {
                months: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                shortMonths: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                days: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                toolbar: {
                  exportToSVG: "Download SVG",
                  exportToPNG: "Download PNG",
                  exportToCSV: "Download CSV",
                  menu: "Menu",
                  selection: "Selection",
                  selectionZoom: "Selection Zoom",
                  zoomIn: "Zoom In",
                  zoomOut: "Zoom Out",
                  pan: "Panning",
                  reset: "Reset Zoom",
                },
              },
              dom: {
                baseEl: {
                  _prevClass: "k79el",
                },
                elWrap: {},
                Paper: {
                  _stroke: "#000000",
                  _event: null,
                  dom: {},
                  node: {},
                  type: "svg",
                  _defs: {
                    _stroke: "#000000",
                    _event: null,
                    dom: {},
                    node: {},
                    type: "defs",
                  },
                },
                elLegendForeign: {},
                elLegendWrap: {},
                elGraphical: {
                  _stroke: "#000000",
                  _event: null,
                  dom: {},
                  node: {},
                  type: "g",
                },
                elGridRectMask: {},
                elGridRectMarkerMask: {},
                elForecastMask: {},
                elNonForecastMask: {},
                elGridRect: {
                  _stroke: "none",
                  _event: null,
                  dom: {},
                  node: {},
                  type: "rect",
                },
                elGridRectMarker: {
                  _stroke: "none",
                  _event: null,
                  dom: {},
                  node: {},
                  type: "rect",
                },
              },
              memory: {
                methodsToExec: [],
              },
              shouldAnimate: true,
              skipLastTimelinelabel: false,
              skipFirstTimelinelabel: false,
              delayedElements: [],
              axisCharts: false,
              isDataXYZ: false,
              resized: true,
              resizeTimer: null,
              comboCharts: false,
              dataChanged: true,
              previousPaths: [11, 24, 32, 13, 32],
              allSeriesHasEqualX: true,
              pointsArray: [],
              dataLabelsRects: [],
              lastDrawnDataLabelsIndexes: [],
              hasNullValues: false,
              easing: "<>",
              zoomed: false,
              gridWidth: 230,
              gridHeight: 228,
              rotateXLabels: false,
              defaultLabels: false,
              yLabelFormatters: [null],
              LINE_HEIGHT_RATIO: 1.618,
              xAxisLabelsHeight: 0,
              xAxisGroupLabelsHeight: 0,
              xAxisLabelsWidth: 0,
              yAxisLabelsWidth: 0,
              scaleX: 1,
              scaleY: 1,
              translateX: 40,
              translateY: 0,
              translateYAxisX: [],
              yAxisWidths: [],
              translateXAxisY: 0,
              translateXAxisX: 0,
              tooltip: {
                tooltipUtil: {},
                tooltipLabels: {
                  tooltipUtil: {},
                },
                tooltipPosition: {},
                marker: {
                  tooltipPosition: {},
                },
                intersect: {
                  isVerticalGroupedRangeBar: false,
                },
                axesTooltip: {},
                showOnIntersect: false,
                showTooltipTitle: false,
                fixedTooltip: false,
                xaxisTooltip: null,
                yaxisTTEls: null,
                isBarShared: true,
                lastHoverTime: 1701683447329,
                xyRatios: null,
                isXAxisTooltipEnabled: false,
                yaxisTooltips: [false],
                allTooltipSeriesGroups: [],
                dataPointsDividedHeight: null,
                dataPointsDividedWidth: null,
                legendLabels: {},
                ttItems: [{}, {}, {}, {}, {}],
              },
              series: [11, 24, 32, 13, 32],
              seriesCandleO: [],
              seriesCandleH: [],
              seriesCandleM: [],
              seriesCandleL: [],
              seriesCandleC: [],
              seriesRangeStart: [],
              seriesRangeEnd: [],
              seriesRange: [],
              seriesPercent: [
                [9.821428571428571],
                [21.428571428571427],
                [28.571428571428573],
                [11.607142857142858],
                [28.571428571428573],
              ],
              seriesGoals: [],
              seriesX: [],
              seriesZ: [],
              seriesNames: ["A", "B", "C", "D", "E"],
              seriesTotals: [11, 24, 32, 13, 32],
              seriesLog: [],
              seriesColors: [],
              stackedSeriesTotals: [],
              seriesXvalues: [[], [], [], [], []],
              seriesYvalues: [[], [], [], [], []],
              hasXaxisGroups: false,
              groups: [],
              hasSeriesGroups: false,
              seriesGroups: [],
              categoryLabels: [],
              selectionResizeTimer: null,
              isXNumeric: false,
              isMultiLineX: false,
              isMultipleYAxis: false,
              maxY: -1.7976931348623157e308,
              minY: 5e-324,
              minYArr: [],
              maxYArr: [],
              maxX: -1.7976931348623157e308,
              minX: 1.7976931348623157e308,
              initialMaxX: -1.7976931348623157e308,
              initialMinX: 1.7976931348623157e308,
              maxDate: 0,
              minDate: 1.7976931348623157e308,
              minZ: 1.7976931348623157e308,
              maxZ: -1.7976931348623157e308,
              minXDiff: 1.7976931348623157e308,
              yAxisScale: [],
              xAxisScale: null,
              xAxisTicksPositions: [],
              yLabelsCoords: [],
              yTitleCoords: [],
              barPadForNumericAxis: 0,
              padHorizontal: 0,
              xRange: 0,
              yRange: [],
              zRange: 0,
              dataPoints: 0,
              xTickAmount: 0,
              xyCharts: false,
              isBarHorizontal: false,
              chartClass: ".apexchartsk79el",
              comboBarCount: 0,
            },
          },
          publicMethods: [
            "updateOptions",
            "updateSeries",
            "appendData",
            "appendSeries",
            "isSeriesHidden",
            "toggleSeries",
            "showSeries",
            "hideSeries",
            "setLocale",
            "resetSeries",
            "zoomX",
            "toggleDataPointSelection",
            "dataURI",
            "exportToCSV",
            "addXaxisAnnotation",
            "addYaxisAnnotation",
            "addPointAnnotation",
            "clearAnnotations",
            "removeAnnotation",
            "paper",
            "destroy",
          ],
          eventList: [
            "click",
            "mousedown",
            "mousemove",
            "mouseleave",
            "touchstart",
            "touchmove",
            "touchleave",
            "mouseup",
            "touchend",
          ],
          animations: {},
          axes: {},
          core: {},
          config: {
            opts: {},
          },
          data: {
            twoDSeries: [],
            threeDSeries: [],
            twoDSeriesX: [],
            seriesGoals: [],
            coreUtils: {},
            fallbackToCategory: false,
          },
          grid: {
            xaxisLabels: ["A", "B", "C", "D", "E"],
            axesUtils: {},
            isRangeBar: 0,
          },
          graphics: {},
          coreUtils: {},
          crosshairs: {},
          events: {},
          exports: {},
          localization: {},
          options: {
            yAxis: {
              show: true,
              showAlways: false,
              showForNullSeries: true,
              opposite: false,
              reversed: false,
              logarithmic: false,
              logBase: 10,
              forceNiceScale: false,
              floating: false,
              labels: {
                show: true,
                minWidth: 0,
                maxWidth: 160,
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                padding: 20,
                style: {
                  colors: [],
                  fontSize: "11px",
                  fontWeight: 400,
                  cssClass: "",
                },
              },
              axisBorder: {
                show: false,
                color: "#e0e0e0",
                width: 1,
                offsetX: 0,
                offsetY: 0,
              },
              axisTicks: {
                show: false,
                color: "#e0e0e0",
                width: 6,
                offsetX: 0,
                offsetY: 0,
              },
              title: {
                rotate: -90,
                offsetY: 0,
                offsetX: 0,
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  cssClass: "",
                },
              },
              tooltip: {
                enabled: false,
                offsetX: 0,
              },
              crosshairs: {
                show: true,
                position: "front",
                stroke: {
                  color: "#b6b6b6",
                  width: 1,
                  dashArray: 0,
                },
              },
            },
            pointAnnotation: {
              x: 0,
              y: null,
              yAxisIndex: 0,
              seriesIndex: 0,
              marker: {
                size: 4,
                fillColor: "#fff",
                strokeWidth: 2,
                strokeColor: "#333",
                shape: "circle",
                offsetX: 0,
                offsetY: 0,
                radius: 2,
                cssClass: "",
              },
              label: {
                borderColor: "#c2c2c2",
                borderWidth: 1,
                borderRadius: 2,
                textAnchor: "middle",
                offsetX: 0,
                offsetY: 0,
                style: {
                  background: "#fff",
                  fontSize: "11px",
                  fontWeight: 400,
                  cssClass: "",
                  padding: {
                    left: 5,
                    right: 5,
                    top: 2,
                    bottom: 2,
                  },
                },
              },
              customSVG: {
                offsetX: 0,
                offsetY: 0,
              },
              image: {
                width: 20,
                height: 20,
                offsetX: 0,
                offsetY: 0,
              },
            },
            yAxisAnnotation: {
              y: 0,
              y2: null,
              strokeDashArray: 1,
              fillColor: "#c2c2c2",
              borderColor: "#c2c2c2",
              borderWidth: 1,
              opacity: 0.3,
              offsetX: 0,
              offsetY: 0,
              width: "100%",
              yAxisIndex: 0,
              label: {
                borderColor: "#c2c2c2",
                borderWidth: 1,
                borderRadius: 2,
                textAnchor: "end",
                position: "right",
                offsetX: 0,
                offsetY: -3,
                style: {
                  background: "#fff",
                  fontSize: "11px",
                  fontWeight: 400,
                  cssClass: "",
                  padding: {
                    left: 5,
                    right: 5,
                    top: 2,
                    bottom: 2,
                  },
                },
              },
            },
            xAxisAnnotation: {
              x: 0,
              x2: null,
              strokeDashArray: 1,
              fillColor: "#c2c2c2",
              borderColor: "#c2c2c2",
              borderWidth: 1,
              opacity: 0.3,
              offsetX: 0,
              offsetY: 0,
              label: {
                borderColor: "#c2c2c2",
                borderWidth: 1,
                borderRadius: 2,
                textAnchor: "middle",
                orientation: "vertical",
                position: "top",
                offsetX: 0,
                offsetY: 0,
                style: {
                  background: "#fff",
                  fontSize: "11px",
                  fontWeight: 400,
                  cssClass: "",
                  padding: {
                    left: 5,
                    right: 5,
                    top: 2,
                    bottom: 2,
                  },
                },
              },
            },
            text: {
              x: 0,
              y: 0,
              text: "",
              textAnchor: "start",
              fontSize: "13px",
              fontWeight: 400,
              appendTo: ".apexcharts-annotations",
              backgroundColor: "transparent",
              borderColor: "#c2c2c2",
              borderRadius: 0,
              borderWidth: 0,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 2,
              paddingBottom: 2,
            },
          },
          responsive: {},
          series: {
            legendInactiveClass: "legend-mouseover-inactive",
          },
          theme: {
            colors: [],
            isColorFn: false,
            isHeatmapDistributed: false,
            isBarDistributed: false,
          },
          formatters: {
            tooltipKeyFormat: "dd MMM",
          },
          titleSubtitle: {},
          legend: {
            isBarsDistributed: false,
            legendHelpers: {},
          },
          toolbar: {
            ev: {},
            selectedClass: "apexcharts-selected",
            minX: 1.7976931348623157e308,
            maxX: -1.7976931348623157e308,
          },
          tooltip: {
            tooltipUtil: {},
            tooltipLabels: {
              tooltipUtil: {},
            },
            tooltipPosition: {},
            marker: {
              tooltipPosition: {},
            },
            intersect: {
              isVerticalGroupedRangeBar: false,
            },
            axesTooltip: {},
            showOnIntersect: false,
            showTooltipTitle: true,
            fixedTooltip: false,
            xaxisTooltip: null,
            yaxisTTEls: null,
            isBarShared: true,
            lastHoverTime: 1701683447328,
          },
          dimensions: {
            lgRect: {
              x: 0,
              y: 0,
              height: 0,
              width: 0,
            },
            yAxisWidth: 0,
            yAxisWidthLeft: 0,
            yAxisWidthRight: 0,
            xAxisHeight: 0,
            isSparkline: false,
            dimHelpers: {},
            dimYAxis: {},
            dimXAxis: {},
            dimGrid: {},
            lgWidthForSideLegends: 0,
            xPadRight: 0,
            xPadLeft: 0,
          },
          updateHelpers: {},
          zoomPanSelection: {
            selectedClass: "apexcharts-selected",
            minX: 1.7976931348623157e308,
            maxX: -1.7976931348623157e308,
            dragged: false,
            graphics: {},
            eventList: [
              "mousedown",
              "mouseleave",
              "mousemove",
              "touchstart",
              "touchmove",
              "mouseup",
              "touchend",
            ],
            clientX: 0,
            clientY: 0,
            startX: 0,
            endX: 0,
            dragX: 0,
            startY: 0,
            endY: 0,
            dragY: 0,
            moveDirection: "none",
          },
          pie: {
            chartType: "donut",
            initialAnim: false,
            dynamicAnim: false,
            animBeginArr: [0, 0, 0, 0, 0, 0],
            animDur: 0,
            defaultSize: 228,
            centerY: 114,
            centerX: 115,
            fullAngle: 360,
            initialAngle: 0,
            donutSize: 84.17560975609757,
            maxY: 32,
            sliceLabels: [],
            sliceSizes: [
              105.21951219512196, 105.21951219512196, 105.21951219512196,
              105.21951219512196, 105.21951219512196,
            ],
            prevSectorAngleArr: [
              35.357142857142854, 77.14285714285714, 102.85714285714286,
              41.785714285714285, 102.85714285714286,
            ],
            ret: {
              _stroke: "#000000",
              _event: null,
              dom: {},
              node: {},
              type: "g",
            },
            strokeWidth: 2,
          },
          rangeBar: {
            isHorizontal: false,
            strokeWidth: 2,
            isNullValue: false,
            isRangeBar: 0,
            isVerticalGroupedRangeBar: 0,
            isFunnel: false,
            xyRatios: null,
            yaxisIndex: 0,
            seriesLen: 0,
            pathArr: [],
            lastActiveBarSerieIndex: 0,
            stackedSeriesTotals: [],
            barHelpers: {},
          },
          annotations: {
            graphics: {},
            helpers: {},
            xAxisAnnotations: {
              helpers: {},
            },
            yAxisAnnotations: {
              helpers: {},
            },
            pointsAnnotations: {
              helpers: {},
            },
            xDivision: null,
          },
        },
      },
    ],
  };
};
