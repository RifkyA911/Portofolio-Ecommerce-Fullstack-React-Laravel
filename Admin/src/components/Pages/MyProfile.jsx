import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import LinearProgress from "@mui/material/LinearProgress";

export default function MyProfile() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 5 : prevProgress + 5
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <label class="block">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Email
        </span>
        <input
          type="email"
          name="email"
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="you@example.com"
        />
      </label>
      {/* baris-1 */}
      <div className="font-bold justify-center lg:max-h-64">
        <div className="flex flex-wrap lg:flex-nowrap flex-row">
          <div className="flex flex-col lg:flex-row lg:justify-center py-4 lg:py-5 px-3 lg:px-4 w-full ">
            <ul className="flex w-full bg-white">
              <li className="shadow-md w-96">
                <img
                  src="./src/assets/user_avatar/84719630_p1.jpg"
                  className="w-60 h-60 "
                />
              </li>
              <li></li>
            </ul>
            <ul className="flex w-full bg-white"></ul>
          </div>
        </div>
      </div>
      <Input defaultValue="Hello world" className="ring-0" />
      <div className="pt-72">
        {/* <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box> */}
      </div>
    </>
  );
}
