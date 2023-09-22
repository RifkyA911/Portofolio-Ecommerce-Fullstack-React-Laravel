import { infoMarket } from "../Config/Temporary"; //Data
import { Navbar, Sidebar, Container } from "../Layout"; // ./components/index.jsx
// Konten komponen
function Dashboard(pops) {
  // fetch.()

  return (
    <>
      <Container className="bg-white">
        <div className="max-w-[1700px] mx-auto">
          {/* baris-1 */}
          <div className="font-bold justify-center lg:max-h-64 py-4 lg:py-5 px-3 lg:px-4">
            <div className="flex flex-wrap lg:flex-nowrap flex-row">
              <ul className="flex flex-col lg:flex-row lg:justify-between w-full ">
                {infoMarket.map((item) =>
                  item.flex === "row" || item.flex === "col" ? (
                    <li
                      key={item.name}
                      className={`relative text-left text-xl text-gray-800 overflow-hidden basis-2/6 shrink rounded-xl ${item.color} p-2 lg:p-8 w-full lg:w-96 h-24 lg:h-44 mb-2 lg:mb-0 lg:mx-2`}
                    >
                      <div className=" bg-transparent w-full h-full bg-opacity-100 ">
                        <h1 className="text-lg line-clamp-1 uppercase">
                          {item.name}
                        </h1>
                        <h2 className="text-xl line-clamp-1">$500</h2>
                      </div>
                      <div className="absolute left-[-20px] top-[-20px] w-20 h-20 rounded-full bg-white bg-opacity-[0.04] z-99 backdrop-blur-0"></div>
                      {/* <div className="absolute left-[-150px] top-[-120px] w-56 h-56 rounded-full bg-white bg-opacity-5 z-99  backdrop-blur-0"></div> */}
                      <div className="absolute right-[50px] bottom-[-110px] w-40 h-40 rounded-full bg-white bg-opacity-[0.12] z-99 backdrop-blur-0"></div>
                      <div className="absolute right-[-100px] bottom-[-120px] w-56 h-56 rounded-full bg-white bg-opacity-5 z-99  backdrop-blur-0"></div>
                    </li>
                  ) : (
                    ""
                  )
                )}
              </ul>
            </div>
          </div>
          {/* baris-2 */}
          <div className="flex font-bold justify-between lg:max-h-64 py-4 lg:py-5 px-3 lg:px-4">
            <div className="flex-row flex-wrap lg:flex-nowrap text-">
              <div className="relative w-96 h-72 bg-white overflow-hidden rounded-xl">
                Summary Sales Statistic
              </div>
            </div>
            <div className="mockup-code bg-slate-700">
              <pre data-prefix="$">
                <code>npm i daisyui</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>installing...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Done!</code>
              </pre>
            </div>
            <div className="flex-row flex-wrap lg:flex-nowrap">
              <div className="relative w-96 h-72 bg-white overflow-hidden rounded-xl">
                Summary Bar Report
              </div>
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
      </Container>
    </>
  );
}
export default Dashboard;
