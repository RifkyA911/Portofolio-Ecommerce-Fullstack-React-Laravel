import React from "react";

const infoMarket = [
  { name: "TRAFFIC", value: "???", color: "bg-blue-400" },
  { name: "NEW USERS", value: "???", color: "bg-violet-400" },
  { name: "SALES", value: "???", color: "bg-yellow-400" },
  { name: "PERFORMANCE", value: "???", color: "bg-lime-400" },
];

function Dashboard() {
  // Konten komponen
  return (
    <>
      {/* Isi komponen */}
      {/* <div className="flex pt-16 min-h-screen"> */}
      <div className="flex p-4 m-3 bg-white w-full">
        <div className=""></div>
        <ul className="text-bold flex justify-between w-full p-8">
          {infoMarket.map((item) => (
            <li
              key={item.name}
              className={`flex flex-col container shrink rounded-sm ${item.color} p-4 w-64 h-32 rounded-xl`}
            ></li>
          ))}
        </ul>
      </div>
      {/* </div> */}
    </>
  );
}
export default Dashboard;
