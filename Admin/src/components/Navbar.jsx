import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-lg font-bold">Logo</div>
        {/* <button
          className="toggler flex-shrink-0 p-2 text-gray-500"
          onClick={toggleNavbar} // Menggunakan fungsi toggleNavbar dari props
        ></button> */}
      </div>
    </nav>
  );
};

export default Navbar;
