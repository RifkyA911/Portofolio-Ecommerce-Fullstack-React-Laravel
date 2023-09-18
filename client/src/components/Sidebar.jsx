import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const Sidebar = forwardRef(function Sidebar({ isOpen }, ref) {
  return (
    <div
      className={
        "fixed top-0 left-0 m-0 p-0 bg-black h-full w-[40%] xl:w-1/4 lg:w-1/3 duration-700 ease-out " +
        (isOpen ? "translate-x-0" : "-translate-x-full opacity-0")
      }
      ref={ref}
    >
      <div className="mt-16 w-full flex flex-col justify-center items-center">
        <ul className="flex flex-col justify-center">
          <li className="mb-8">
            <a
              href="#"
              className="text-sm text-white hover:underline hover:underline-offset-4"
            >
              Home
            </a>
          </li>

          <li className="mb-8">
            <a
              href="#"
              className="text-sm text-white hover:underline hover:underline-offset-4"
            >
              FAQ
            </a>
          </li>
          <li className="mb-8">
            <a
              href="#"
              className="text-sm text-white hover:underline hover:underline-offset-4"
            >
              Contact
            </a>
          </li>
          <li className="mb-8">
            <a
              href="#"
              className="px-4 rounded-3xl py-1 border-[1px] border-white text-sm text-white hover:bg-white hover:text-black"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Sidebar;
