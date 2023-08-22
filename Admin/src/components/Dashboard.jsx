import React from "react";

const infoMarket = [
  { name: "TOTAL ORDER", value: "???", color: "bg-blue-400" },
  { name: "SALES", value: "???", color: "bg-yellow-400" },
];

const infoWorks = [
  { name: "NEW USERS", value: "???", color: "bg-violet-400" },
  { name: "PERFORMANCE", value: "???", color: "bg-lime-400" },
];

function Dashboard() {
  // Konten komponen
  return (
    <>
      <div className="bg-white w-full static">
        <div className="p-2 ml-64 h-full shadow-lg">
          <div className="bg-gray-100 mt-4 rounded-xl">
            <div className="flex flex-col md:flex-row">
              <ul className="text-bold flex flex-col md:flex-row md:justify-between py-4 md:py-8 px-2 md:px-4">
                {infoMarket.map((item) => (
                  <li
                    key={item.name}
                    className={`shrink rounded-xl ${item.color} p-2 md:p-4 w-full md:w-96 h-24 md:h-48 mb-2 md:mb-0 md:mr-5`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <ul className="text-bold flex flex-col md:justify-between py-4 md:py-8 px-2 md:px-6">
                {infoWorks.map((item) => (
                  <li
                    key={item.name}
                    className={`shrink rounded-xl ${item.color} p-2 md:p-4 w-full md:w-96 h-16 md:h-20 mb-2`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
