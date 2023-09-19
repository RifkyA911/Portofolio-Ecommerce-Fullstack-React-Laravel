import Container from "../layout/Container";
import { infoMarket } from "../Config/Temporary"; //Data
import { Navbar, Sidebar } from "../Layout"; // ./components/index.jsx
// Konten komponen
function Dashboard(pops) {
  return (
    <>
      <Container>
        <div className="max-w-[1700px] mx-auto">
          {/* baris-1 */}
          <div className="font-bold justify-center lg:max-h-64">
            <div className="flex flex-wrap lg:flex-nowrap flex-row">
              <ul className="flex flex-col lg:flex-row lg:justify-start py-4 lg:py-5 px-3 lg:px-4 w-full ">
                {infoMarket.map((item) =>
                  item.flex === "row" ? (
                    <li
                      key={item.name}
                      className={`basis-2/6 shrink rounded-xl ${item.color} p-2 lg:p-4 w-full lg:w-96 h-24 lg:h-48 mb-2 lg:mb-0 lg:mr-5`}
                    >
                      <p>{item.name}</p>
                      <h1 className="text-2xl">$500</h1>
                    </li>
                  ) : (
                    ""
                  )
                )}
                <li
                  key="rows"
                  className="flex basis-2/6 flex-col justify-between"
                >
                  {infoMarket
                    .filter((item) => item.flex === "col")
                    .map((workItem) => (
                      <div
                        key={workItem.name}
                        className={`flex rounded-xl justify-center max-h-20 h-20 p-3 mb-2 lg:m-0 ${workItem.color}`}
                      >
                        <p>{workItem.name}</p>
                      </div>
                    ))}
                </li>
              </ul>
            </div>
          </div>

          {/* baris-2 */}
          <div className="font-bold justify-center lg:max-h-64">
            <div className="flex flex-wrap lg:flex-nowrap flex-row"></div>
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
