import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import { MarketInbox } from "../Data/Inbox";

export default function Inbox() {
  return (
    <>
      <div className="container max-w-[1920px] mx-auto p-8 h-full">
        <div className="flex bg-slate-800 min-h-[280px]">
          {/* people */}
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex grow p-4 text-white font-medium border-blue-300 border-b-[1px] bg-slate-600 ">
                <h1 className="w-full ">Customer Chat</h1>
              </div>
              <div className="people mb-2 bg-slate-200">
                <div className="p-2">
                  <span>searchbar </span>
                  <input type="text" className="h-6" />
                </div>

                <ul>
                  {MarketInbox.map((user) => (
                    <li key={user.id} className="">
                      <Link
                        to="#"
                        className="flex flex-row py-4 hover:bg-slate-300 px-6"
                      >
                        <img
                          src={`./src/assets/user_avatar/${user.img}`}
                          alt="user_avatar"
                          className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                        />
                        <div className="flex flex-col px-4 text-left">
                          <p className="font-bold">{user.name}</p>
                          <p className="w-80 overflow-hidden text-sm text-gray-500 truncate">
                            {user.message}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* chat */}
          <div className="flex bg-grey-400">
            <div className="flex">
              <div className="flex">g</div>
            </div>
          </div>
        </div>
      </div>
      <img src="../src/assets/example.png" className="mx-auto mt-24 w-[60%]" />
      <Button variant="">INBOX</Button>
    </>
  );
}
