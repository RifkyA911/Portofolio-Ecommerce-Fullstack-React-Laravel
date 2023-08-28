import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MarketInbox } from "../Data/Inbox";
// import axios from "axios";

import {
  MoreVert,
  Search,
  Circle,
  Send,
  AttachFile,
  Sms,
  Person,
} from "@mui/icons-material";
import { Menu } from "@headlessui/react";

export default function Inbox() {
  const [user, setuser] = useState([]);

  // useEffect()

  return (
    <>
      <div className="lg:px-10 lg:py-1 max-w-[1920px] mx-auto h-full">
        <div className="relative mb-12 bg-white sbg-slate-800 min-h-[280px] shadow-md">
          <div className="flex content mt-8">
            {/* people */}
            <div className="flex">
              <div className="lg:flex flex-col hidden md:block">
                <nav className="flex sticky top-0 bg-slate-500 z-5 w-full shadow-sm max-h-[60px] min-h-[58px]">
                  <div className="flex flex-row w-full p-4 bg-slate-600 text-white font-medium justify-between">
                    <div className="text-white font-medium bg-slate-600">
                      <h3 className="">
                        <Sms className="mr-4" />
                        Customer Chat
                      </h3>
                    </div>
                  </div>
                </nav>
                <div className="people bg-slate-200">
                  <div className="p-3 ">
                    {/* <span>searchbar </span> */}
                    <input
                      type="search"
                      name="search"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Cari nama orang..."
                    />
                  </div>
                  <ul className="max-h-[600px] overflow-y-scroll">
                    {MarketInbox.map((user) => (
                      <li key={user.id} className="">
                        <Link
                          to="#"
                          className="flex flex-row py-3 hover:bg-slate-300 px-6"
                        >
                          <img
                            src={`./src/assets/user_avatar/${user.img}`}
                            alt="user_avatar"
                            className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                          />
                          <div className="flex flex-col px-4 text-left">
                            <p className="font-bold">{user.name}</p>
                            <p className="w-40 lg:w-80 overflow-hidden text-sm text-gray-500 truncate">
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
            <div className="flex-1 grow relative">
              <div className=""></div>
              <nav className="flex sticky top-0 bg-slate-500 z-5 w-full shadow-sm max-h-[60px] min-h-[58px]">
                <div className="flex flex-row w-full p-4 bg-slate-600 text-white font-medium justify-between">
                  <span>
                    <Person className="mr-2" />
                    {MarketInbox[0].name}
                    <Circle
                      className="text-lime-500 ml-2"
                      sx={{ fontSize: 12 }}
                    />
                  </span>
                  <Link>
                    <MoreVert className="" />
                  </Link>
                </div>
              </nav>
              <div className="flex flex-wrap flex-col max-h-[600px] overflow-y-scroll">
                <ul className="text-white py-4">
                  <li className="font-semibold text-slate-700 py-4">
                    <span className=" bg-slate-100 px-4 py-2 rounded-xl">
                      17 Agustus 2023
                    </span>
                  </li>
                  {MarketInbox.slice(0, 1).map((user) => (
                    <li key={user.id} className="flex justify-start">
                      <div className="flex flex-row py-3 px-6">
                        <div className="relative">
                          <img
                            src={`./src/assets/user_avatar/${user.img}`}
                            alt="user_avatar"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-5"
                          />
                          <Circle
                            className="absolute top-[30px] left-[20px] shadow-lg text-lime-500 ml-2"
                            sx={{ fontSize: 12 }}
                          />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-slate-800 font-semibold">
                            {user.name}
                          </span>
                          {/* iter */}
                          <div className="flex flex-col px-4 py-2 text-left bg-slate-400 rounded-r-lg rounded-bl-2xl">
                            <p className="w-full">{user.message}</p>
                            <small className="text-right font-semibold">
                              4:40
                            </small>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {MarketInbox.slice(1, 2).map((user) => (
                    <li key={user.id} className="flex justify-end">
                      <div className="flex flex-row py-4 px-6">
                        <div className="flex flex-col text-right">
                          <span className="text-slate-800 font-semibold">
                            {user.name}
                          </span>
                          <div className="flex flex-col px-4 py-2 text-right bg-green-600 rounded-l-lg rounded-br-2xl">
                            <p className="w-full">{user.message}</p>
                            <small className="text-right font-semibold">
                              4:43
                            </small>
                          </div>
                        </div>
                        <img
                          src={`./src/assets/user_avatar/${user.img}`}
                          alt="user_avatar"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full ml-5"
                        />
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
                    <AttachFile />
                  </button>
                  <input
                    type="text"
                    name="text"
                    className="mt-1 mx-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Tulis pesan..."
                  />
                  <button className="rounded-full bg-gray-300 w-[40px] h-[40px] p-2">
                    <Send />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
