import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Container = (props) => {
  // REDUX
  const { sidebarOpen, BackBgColor, textColor, container, ContainerBgColor } =
    useSelector((state) => state.UI);
  const dispatch = useDispatch();
  // Konten wrapper komponen
  return (
    <>
      <div className={container}>
        <main
          className={`${BackBgColor} ${textColor} w-full static transition-all duration-300 mb-2`}
        >
          <div
            className={`p-4 my-4 ${
              sidebarOpen ? "lg:ml-64" : "lg:ml-0"
            } h-full flex-shrink-0 duration-300`}
          >
            {/*max-w-[1700px] mx-auto */}
            <div
              className={`${ContainerBgColor} ${textColor} rounded-xl shadow-sm`}
            >
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Container;
