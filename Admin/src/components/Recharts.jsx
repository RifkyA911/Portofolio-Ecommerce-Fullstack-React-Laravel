import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  PieChart,
  Pie,
  Cell,
  Sector,
  Area,
  AreaChart,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const RenderAreaChart = (props) => {
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
  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={300}
        className={`${BgColor} font-roboto-regular font-bold text-xs`}
      >
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="product"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="order"
            stroke="#0a7acf"
            fill="#42a7f5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export const RenderPieChart = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const piedata = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ outline: "none" }}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
          style={{ outline: "none" }}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <ResponsiveContainer width={400} height={400}>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={piedata}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
