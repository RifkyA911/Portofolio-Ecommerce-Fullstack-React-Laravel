import React from "react";
import Dashboard from "./Dashboard";

function Container() {
  // Konten komponen
  return (
    <>
      <div className="bg-white w-full static">
        <div className="p-4 my-4 lg:ml-64 h-full shadow-lg">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
export default Container;
