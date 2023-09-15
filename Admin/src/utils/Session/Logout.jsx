import { Link, Outlet } from "react-router-dom";

const logout = () => {
  return (
    <>
      <Link
        to="/logout"
        className="flex flex-1 items-center py-3 px-6 transition duration-150 ease-in-out hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      >
        Logout
      </Link>
      ;
    </>
  );
};

export default logout;
