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
