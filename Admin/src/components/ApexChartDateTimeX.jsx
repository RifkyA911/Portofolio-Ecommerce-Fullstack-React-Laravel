import React from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns"; // Import format dari date-fns
import { ResponsiveContainer } from "recharts";

const orderData = [
  {
    x: new Date("2023-09-01").getTime(),
    y: 100,
  },
  {
    x: new Date("2023-09-02").getTime(),
    y: 200,
  },
  {
    x: new Date("2023-09-03").getTime(),
    y: 150,
  },
  {
    x: new Date("2023-09-04").getTime(),
    y: 450,
  },
  {
    x: new Date("2023-09-05").getTime(),
    y: 350,
  },
  {
    x: new Date("2023-09-06").getTime(),
    y: 150,
  },
  // ...data order lainnya...
];

const productData = [
  {
    x: new Date("2023-09-01").getTime(),
    y: 50,
  },
  {
    x: new Date("2023-09-02").getTime(),
    y: 150,
  },
  {
    x: new Date("2023-09-03").getTime(),
    y: 450,
  },
  {
    x: new Date("2023-09-04").getTime(),
    y: 350,
  },
  {
    x: new Date("2023-09-05").getTime(),
    y: 150,
  },
  {
    x: new Date("2023-09-06").getTime(),
    y: 450,
  },
  // ...data product lainnya...
];

const chartOptions = {
  chart: {
    id: "line-chart",
  },
  xaxis: {
    type: "datetime",
    labels: {
      rotate: 0, // Mengatur rotasi label
      formatter: function (value) {
        // Menggunakan formatter untuk menampilkan tanggal dengan format yang sesuai
        const date = new Date(value);
        const day = date.getDate();
        const month = format(date, "MMM");
        const year = date.getFullYear();
        return `${day}-${month}`;
      },
    },
  },
  grid: {
    show: false, // you can either change hear to disable all grids
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
  // ...konfigurasi lainnya...
};

function MyChart() {
  return (
    <>
      {/* <ResponsiveContainer width="100%" height={400}> */}
      <Chart
        options={chartOptions}
        series={[
          {
            name: "OrderArea",
            data: orderData,
            // Mengatur gradient fill color
            fill: {
              type: "gradient", // Jenis fill gradient
              gradient: {
                shade: "light", // Atur bayangan (light atau dark)
                type: "vertical", // Jenis gradient (vertical atau horizontal)
                shadeIntensity: 0.5, // Intensitas bayangan
                gradientToColors: ["#FF5733"], // Warna akhir gradient
                inverseColors: false, // Urutan warna (true jika ingin terbalik)
                opacityFrom: 0.7, // Opacity awal
                opacityTo: 0.9, // Opacity akhir
                stops: [0, 100], // Poin berhenti gradient (0-100)
              },
            },
            stroke: "rgba(0,0,0,0)",
          },
          {
            name: "ProductArea",
            data: productData,
            // Mengatur gradient fill color
            fill: {
              type: "gradient", // Jenis fill gradient
              gradient: {
                shade: "light", // Atur bayangan (light atau dark)
                type: "vertical", // Jenis gradient (vertical atau horizontal)
                shadeIntensity: 0.5, // Intensitas bayangan
                gradientToColors: ["#bd1743"], // Warna akhir gradient
                inverseColors: true, // Urutan warna (true jika ingin terbalik)
                opacityFrom: 0.7, // Opacity awal
                opacityTo: 0.9, // Opacity akhir
                stops: [0, 100], // Poin berhenti gradient (0-100)
              },
            },
          },
        ]}
        type="area" // Menggunakan tipe "area" untuk line chart dengan area diisi
        width="100%" // Atur lebar menjadi 100%
        height={450}
      />
      {/* </ResponsiveContainer> */}
    </>
  );
}

export default MyChart;
