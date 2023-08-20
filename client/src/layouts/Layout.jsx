// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-md min-h-screen w-screen items-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
