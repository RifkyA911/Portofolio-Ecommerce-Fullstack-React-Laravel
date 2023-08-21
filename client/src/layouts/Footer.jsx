const Footer = () => {
  return (
    <footer className="bg-black w-full text-white">
      <div className="mx-8 py-4">
        <div className="flex justify-between pb-8 border-b-[1px] border-gray-600">
          <div className="">
            <h1 className="text-xl font-bold">BRAND</h1>
          </div>
          <ul className="ml-12 text-sm flex flex-col items-start">
            <li className="mb-1">Home</li>
            <li className="mb-1">FAQ</li>
            <li>Contact</li>
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
