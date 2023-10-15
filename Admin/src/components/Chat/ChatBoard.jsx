import { Link } from "react-router-dom";
import { MuiIcon } from "../../utils/RenderIcons";
import { DateFormatter } from "../../utils/Formatter";

export const ChatBoard = (props) => {
  const { messages } = props;
  return (
    <>
      <div className="flex-1 grow relative">
        <div className=""></div>
        <nav className="flex sticky top-0 bg-slate-500 z-5 w-full shadow-sm max-h-[60px] min-h-[58px]">
          <div className="flex flex-row w-full p-4 bg-slate-600 text-white font-medium justify-between">
            <span>
              <MuiIcon iconName="Person" className="mr-2" />
              {/* {messages[1].customer_name} */}FF
              <MuiIcon iconName="Circle" className="text-lime-500 ml-2" />
            </span>
            <Link>
              <MuiIcon iconName="MoreVert" className="" />
            </Link>
          </div>
        </nav>
        <div className="flex flex-wrap flex-col max-h-[600px] overflow-y-scroll">
          <ul className="text-white py-4 max-h-[550px] lg:max-h-full">
            <li className="font-semibold text-slate-700 py-4">
              <small className=" bg-slate-200 px-4 py-2 rounded-xl">
                {/* {DateFormatter(messages[0].created_at)} */}
                12 Februari 2022
              </small>
            </li>
            {messages.slice(0, 1).map((message, index) => (
              <li key={message.id} className="flex justify-end">
                <div className="flex flex-row py-2 px-6">
                  <div className="flex flex-col text-right">
                    <span className="text-slate-800 font-semibold">
                      {/* {message.name} */}
                    </span>
                    <div className="relative flex flex-col pr-10 pl-4 py-2 text-right bg-green-600 rounded-lg">
                      <p className="w-full">
                        {message.message}
                        <small className="absolute self-end right-2 bottom-[2px] text-white font-semibold text-[10px]">
                          4:40
                        </small>
                      </p>
                    </div>
                  </div>
                  <img
                    src={`./src/assets/admin_avatar/${message.admin_pict}`}
                    alt="user_avatar"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full ml-5"
                  />
                </div>
              </li>
            ))}
            {messages.slice(1, 2).map((message, index) => (
              <li key={message.id} className="flex justify-start">
                <div className="flex flex-row py-2 px-6">
                  <div className="relative">
                    <img
                      src={`./src/assets/user_avatar/${message.user_pict}`}
                      alt="user_avatar"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-5"
                    />
                    <MuiIcon
                      iconName="Circle"
                      className="absolute top-[30px] left-[20px] shadow-lg text-lime-500 ml-2"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-slate-800 font-semibold">
                      {/* {message.name} */}
                    </span>
                    {/* iter */}
                    <div className="relative flex flex-col items-center justify-center pl-4 pr-10 py-2 text-left bg-slate-500 rounded-lg">
                      <p className=" w-full p-0 m-0">{message.message}</p>
                      <small className="absolute self-end right-2 bottom-[2px] text-white font-semibold text-[10px]">
                        4:40
                      </small>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {/* dummy */}
            <li>
              {Array.from({ length: 30 }, (_, index) => (
                <br key={index} />
              ))}
            </li>
          </ul>
        </div>
        {/* input */}
        <div className="flex sticky top-0">
          <div className="flex bg-slate-200 w-full px-6 py-3 justify-between items-center">
            <button className="rounded-full bg-gray-300 w-[40px] h-[40px] p-2">
              <MuiIcon iconName="AttachFile" />
            </button>
            <input
              type="text"
              name="text"
              className="mt-1 mx-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Tulis pesan..."
            />
            <button className="rounded-full bg-gray-300 w-[40px] h-[40px] p-2">
              <MuiIcon iconName="Send" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
