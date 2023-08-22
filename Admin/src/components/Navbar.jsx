import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-200 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center max-h-24 py-3 px-8">
        <div className="text-lg font-bold">Admin Panel</div>
        {/* <button
          className="toggler flex-shrink-0 p-2 text-gray-500"
          onClick={toggleNavbar} // Menggunakan fungsi toggleNavbar dari props
        ></button> */}

        {/* Profile */}
        <div className="">
          <button>
            <img
              src="\src\assets\user.png"
              alt="profile"
              srcset=""
              className="w-8 h-8 rounded-full shadow-2xl"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
