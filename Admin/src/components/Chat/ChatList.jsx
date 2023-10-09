import { Link } from "react-router-dom";
import { MuiIcon } from "../../utils/RenderIcons";

export const ChatList = (props) => {
  const { messages } = props;

  return (
    <>
      <div className="flex">
        <div className="lg:flex flex-col hidden md:block min-w-[450px]">
          <nav className="flex sticky top-0 bg-slate-500 z-5 w-full shadow-sm max-h-[60px] min-h-[58px]">
            <div className="flex flex-row w-full p-4 bg-slate-600 text-white font-medium justify-between">
              <div className="text-white font-medium bg-slate-600">
                <h3 className="">
                  <MuiIcon iconName="Sms" className="mr-4" />
                  Customer Chat
                </h3>
              </div>
            </div>
          </nav>
          <div className="people bg-slate-200">
            <div className="p-3 ">
              <input
                type="search"
                name="search"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Cari nama pelanggan..."
              />
            </div>
            <ul className="min-h-[600px] max-h-[600px] overflow-y-scroll">
              {messages.map((message, index) => (
                <li key={message.id} className="">
                  {message.user_id && message.customer_name && (
                    <Link
                      to="#"
                      className="flex flex-row py-3 hover:bg-slate-300 px-6"
                    >
                      <img
                        src={`./src/assets/user_avatar/${message.user_pict}`}
                        alt="user_avatar"
                        className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                      />
                      <div className="flex flex-col px-4 text-left">
                        <p className="font-bold">{message.customer_name}</p>
                        <p className="w-40 lg:w-80 text-sm text-gray-500 overflow-hidden truncate">
                          {message.message}
                        </p>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
