import React from "react";
import { Container, Content } from "../Layout";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { RenderAreaChart } from "../components/Recharts";

const data = [
  {
    name: "Page A",
    product: 4000,
    order: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    product: 3000,
    order: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    product: 2000,
    order: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    product: 2780,
    order: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    product: 1890,
    order: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    product: 2390,
    order: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    product: 3490,
    order: 4300,
    amt: 2100,
  },
];

export default function Statistic() {
  // REDUX
  const {
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

  // Konten komponen
  return (
    <>
      <Container>
        <Content pageName={"Statistic"}>
          <p>Statistic</p>
          <ResponsiveContainer
            width="100%"
            height={350}
            className={`${BgColor} py-4 font-roboto-regular font-bold text-xs`}
          >
            <LineChart
              width={500}
              height={350}
              data={data}
              margin={{
                top: 15,
                right: 35,
                left: 0,
                bottom: 15,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="order"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={1}
                fill="#8884d8"
              />
              <Line type="monotone" dataKey="product" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex bg-gray-400 font-bold lg:max-h-[900px]">
            <div className="flex flex-col lg:flex-row w-full py-2">
              <div
                className={`${BgColor} ${textColor} rounded-xl h-20 lg:h-96 w-full lg:w-7/12 mr-4`}
              >
                <h4>Line Chart Product & Order</h4>
              </div>
              <div className="rounded-xl h-20 lg:h-96 w-full lg:w-5/12 bg-white">
                <RenderAreaChart />
              </div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
}
