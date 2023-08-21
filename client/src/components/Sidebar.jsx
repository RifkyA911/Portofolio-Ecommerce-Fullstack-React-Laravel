// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={
        "fixed top-0 m-0 p-0 bg-black h-full w-[40%] duration-700 ease-out " +
        (isOpen ? "translate-x-0" : "-translate-x-full opacity-0")
      }
    >
      <div className="mt-16 px-8 w-full flex flex-col justify-center">
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
        </ul>
        <div className="flex">
          <button className="px-4 rounded-3xl py-1 border-[1px] border-white text-sm text-white hover:bg-white hover:text-black">
            <a href="#">Login</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
