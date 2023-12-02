export const BarStackedoptions = {
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
    height: 361,
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

export const sareaOptions = {
  chart: {
    height: 280,
    type: "radialBar",
  },

  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#293450",
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "13px",
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"],
};
