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
      {/* Dashboard */}
      <div className="bg-gray-100 rounded-xl shadow-sm">
        {/* baris-1 */}
        <div className="font-bold justify-center lg:max-h-64">
          <div className="flex flex-wrap lg:flex-nowrap flex-row">
            <ul className="flex flex-col lg:flex-row lg:justify-start py-4 lg:py-8 px-2 lg:px-4 w-full ">
              {infoMarket.map((item) => (
                <li
                  key={item.name}
                  className={`basis-2/6 shrink rounded-xl ${item.color} p-2 lg:p-4 w-full lg:w-96 h-24 lg:h-48 mb-2 lg:mb-0 lg:mr-5`}
                >
                  <p>{item.name}</p>
                  <h1 className="text-2xl">$500</h1>
                </li>
              ))}
              <li className="flex basis-2/6 flex-col justify-between">
                {infoWorks.map((item) => (
                  <div
                    key={item.name}
                    className={`flex rounded-xl justify-center max-h-20 h-20 p-3 mb-2 lg:m-0 ${item.color}`}
                  >
                    <p className="">{item.name}</p>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
        {/* baris-2 */}
        <div className="font-bold justify-center lg:max-h-64">
          <div className="flex flex-wrap lg:flex-nowrap flex-row">
            <ul className="flex flex-col lg:flex-row lg:justify-start py-4 lg:py-0 px-2 lg:px-4 w-full ">
              {infoMarket.map((item) => (
                <li
                  key={item.name}
                  className={`basis-2/6 shrink rounded-xl ${item.color} p-2 lg:p-4 w-full lg:w-96 h-24 lg:h-48 mb-2 lg:mb-0 lg:mr-5`}
                >
                  <p>{item.name}</p>
                  <h1 className="text-2xl">$500</h1>
                </li>
              ))}
              <li className="flex basis-2/6 flex-col justify-between">
                {infoWorks.map((item) => (
                  <div
                    key={item.name}
                    className={`flex rounded-xl justify-center max-h-20 h-20 p-3 mb-2 lg:m-0 ${item.color}`}
                  >
                    <p className="">{item.name}</p>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
export default Dashboard;
