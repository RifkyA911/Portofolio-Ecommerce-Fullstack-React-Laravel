import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Container = (props) => {
  // REDUX
  const { sidebarOpen } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  // Konten wrapper komponen
  return (
    <>
      <main className="bg-white w-full static">
        <div
          className={`p-4 my-4 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-0"
          } h-full flex-shrink-0 duration-300`}
        >
          {/*max-w-[1700px] mx-auto */}
          <div className="bg-slate-100 rounded-xl shadow-sm ">
            {props.children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Container;
