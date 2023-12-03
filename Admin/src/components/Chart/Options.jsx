import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateFormatter } from "../../utils/Formatter";

export const areaOptions = () => {
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
};

export const BarStackedoptions = () => {
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
      background: "#fff",
      dropShadow: {
        left: 21,
      },
      foreColor: "#373D3F",
      height: 200,
      id: "Un2mw",
      stacked: true,
      toolbar: {
        show: false,
      },
      type: "bar",
      width: 473,
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "36%",
        distributed: true,
        borderRadius: 8,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        hideZeroBarsWhenGrouped: false,
        isDumbbell: false,
        isFunnel: false,
        isFunnel3d: true,
        dataLabels: {
          position: "center",
          total: {
            enabled: false,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#373d3f",
              fontSize: "12px",
              fontWeight: 600,
            },
          },
        },
      },
      bubble: {
        zScaling: true,
      },
      treemap: {
        dataLabels: {
          format: "scale",
        },
      },
      radialBar: {
        hollow: {
          background: "#fff",
        },
        dataLabels: {
          name: {},
          value: {},
          total: {},
        },
      },
      pie: {
        donut: {
          labels: {
            name: {},
            value: {},
            total: {},
          },
        },
      },
    },
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
    series: [
      {
        name: "Bar 1",
        data: [
          {
            x: "Item 1",
            y: 10,
          },
          {
            x: "Item 2",
            y: 20,
          },
          {
            x: "Item 3",
            y: 30,
          },
          {
            x: "Item 4",
            y: 40,
          },
          {
            x: "",
            y: 10,
          },
        ],
        zIndex: 0,
      },
      {
        name: "Bar 2",
        data: [
          {
            x: "Item 1",
            y: 20,
          },
          {
            x: "Item 2",
            y: 10,
          },
          {
            x: "Item 3",
            y: 15,
          },
          {
            x: "Item 4",
            y: 25,
          },
          {
            x: "",
            y: 10,
          },
        ],
        zIndex: 1,
      },
    ],
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
          colors: [null, null, null, null, null],
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

export const LineOptions = () => {
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
      fontFamily: "Roboto",
      height: 250,
      id: "UJUCY",
      toolbar: {
        show: false,
      },
      width: 500,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        hideZeroBarsWhenGrouped: false,
        isDumbbell: false,
        isFunnel: false,
        isFunnel3d: true,
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "#373d3f",
              fontSize: "12px",
              fontWeight: 600,
            },
          },
        },
      },
      bubble: {
        zScaling: true,
      },
      treemap: {
        dataLabels: {
          format: "scale",
        },
      },
      radialBar: {
        hollow: {
          background: "#fff",
        },
        dataLabels: {
          name: {},
          value: {},
          total: {},
        },
      },
      pie: {
        donut: {
          labels: {
            name: {},
            value: {},
            total: {},
          },
        },
      },
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
        right: 20,
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
