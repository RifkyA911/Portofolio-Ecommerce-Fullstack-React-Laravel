import React, { useState, useEffect } from "react";

// Layout
import { Container, Content } from "../Layout"; // ./components/index.jsx
import DashboardHeader from "../components/Dashboard/DashboardHeader";
// Utils
import { getMuiIcon } from "./../utils/RenderIcons.jsx";
import fetchData from "./../utils/API/AsyncFetch.js";
// Data

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
} from "recharts";

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

const Dashboard = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const URLproduct = import.meta.env.VITE_API_URL_GET_ALL_PRODUCT;

  useEffect(() => {
    fetchData(URLproduct)
      .then((response) => {
        // console.log(response); // Cetak seluruh objek respons
        // console.log(response.data); // Akses properti 'data' dari objek respons
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error jika ada
      });
  }, []);
  // console.table(product);
  // console.log(product[0]?.name);
  return (
    <>
      {loading == false ? (
        <>
          <Container className="bg-white">
            {/* <Content pageName="Dashboard"> */}
            <div className="max-w-[1920px] mx-auto py-4 lg:py-5 px-3 lg:px-5">
              <div className="pages-title flex flex-row items-center justify-start text-xl font-roboto-medium mb-4 px-2">
                <h1>Dashboard</h1>
                <i className="px-2 text-md"></i>
              </div>
              {/* baris-1 */}
              <DashboardHeader />
              <div className="divider mb-0"></div>
              {/* baris-2 */}
              <div className="flex flex-col lg:flex-row w-full font-bold justify-between lg:max-h-[600px] py-4 overflow-scroll">
                <div className="rounded-xl bg-white w-full h-96 lg:mr-4">
                  <h3 className="my-4">Line Chart Sales Monthly</h3>
                  <ResponsiveContainer
                    width="100%"
                    height={350}
                    className="font-roboto-regular font-bold"
                  >
                    <LineChart
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
                      <Line
                        type="monotone"
                        dataKey="order"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        strokeWidth={1}
                      />
                      <Line
                        type="monotone"
                        dataKey="product"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className=" bg-white relative w-[700px] h-96">
                  <pre data-prefix="$" className="text-success">
                    <code>Pie Chart Top Selling Product</code>
                  </pre>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="product"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* baris-3 */}
              <div className="flex font-bold justify-between lg:max-h-[450px] py-4 overflow-x-scroll">
                <div className="mockup-code bg-white w-full lg:mr-4 h-96">
                  <pre data-prefix="$" className="text-success">
                    <code>Summary Table Latest Order</code>
                  </pre>
                  <div className="z-40">
                    <div className="overflow-x-auto">
                      <table className="table table-xs text-black">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                            <th>Last Login</th>
                            <th>Favorite Color</th>
                          </tr>
                        </thead>
                        {product && (
                          <tbody>
                            {product.map((product, index) => (
                              <tr key={product.id}>
                                <th>{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>
                                  <div className="rating rating-xs">
                                    <input
                                      type="radio"
                                      name="rating-5"
                                      className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                      type="radio"
                                      name="rating-5"
                                      className="mask mask-star-2 bg-orange-400"
                                      checked
                                    />
                                    <input
                                      type="radio"
                                      name="rating-5"
                                      className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                      type="radio"
                                      name="rating-5"
                                      className="mask mask-star-2 bg-orange-400"
                                    />
                                    <input
                                      type="radio"
                                      name="rating-5"
                                      className="mask mask-star-2 bg-orange-400"
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mockup-code bg-slate-700 w-[700px] h-96">
                  <pre data-prefix="$" className="text-success">
                    <code>Summary Bar Report</code>
                  </pre>
                </div>
              </div>
            </div>
            {/* </Content> */}
          </Container>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Dashboard;
