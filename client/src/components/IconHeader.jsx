/* eslint-disable react/prop-types */
const IconHeader = ({ children, data }) => {
  return (
    <div className="relative">
      <button className="w-full">{children}</button>
      <span
        className={`absolute -top-1 -right-4 text-center w-4 h-4 rounded-full bg-yellow-200 text-xs cursor-default`}
      >
        {data?.length}
      </span>
    </div>
  );
};

export default IconHeader;
