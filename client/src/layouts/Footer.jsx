const Footer = () => {
  return (
    <footer className="bg-black w-full text-white mt-auto">
      <div className="mx-auto px-8 py-4 w-full max-w-screen-xl">
        <div className="flex justify-between pb-8 border-b-[1px] border-gray-600">
          <div className="">
            <h1 className="text-xl font-bold">BRAND</h1>
          </div>
          <ul className="ml-12 text-sm flex flex-col items-start">
            <li className="mb-1">
              <a href="#" className="hover:underline hover:underline-offset-4">
                Home
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="hover:underline hover:underline-offset-4">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:underline-offset-4">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center my-6">
          <p className="text-sm">&copy; 2023 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
