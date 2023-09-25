import React from "react";
import { Container, Content } from "../Layout";
import ReactEcharts from "echarts-for-react";
export default function Statistic() {
  const option = {
    title: {
      text: "Stacked Area Chart",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line",
        areaStyle: {},
        backgroundColor: "rgba(0, 0, 255, 0.2)", // Gunakan warna yang sesuai
        borderColor: "rgba(0, 0, 255, 1)", // Contoh warna garis
        borderWidth: 1, // Lebar garis
        smooth: true,
      },
      // Menambahkan data lain di bawah ini
      {
        data: [90, 150, 100, 60, 50, 80, 100], // Data baru
        type: "line", // Tipe grafik (dalam contoh ini, "line")
        areaStyle: {}, // Opsi tambahan jika diperlukan
        smooth: true, // Opsi tambahan jika diperlukan
      },
      {
        data: [290, 550, 200, 160, 550, 280, 200], // Data baru
        type: "line", // Tipe grafik (dalam contoh ini, "line")
        areaStyle: {}, // Opsi tambahan jika diperlukan
        smooth: true, // Opsi tambahan jika diperlukan
      },
    ],
  };
  // Konten komponen
  return (
    <>
      <Container>
        <Content pageName={"Statistic"}>
          <p>Statistic</p>
          <ReactEcharts option={option} />
        </Content>
      </Container>
    </>
  );
}
