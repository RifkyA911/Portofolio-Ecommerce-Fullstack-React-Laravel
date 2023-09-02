/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const IconHeader = ({ children, data, route, indicator }) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <button className="w-full" onClick={() => navigate(route)}>
        {children}
      </button>
      {indicator && (
        <span
          className={`absolute -top-1 -right-4 text-center w-4 h-4 rounded-full bg-yellow-200 text-xs cursor-default`}
        >
          {data?.length}
        </span>
      )}
    </div>
  );
};

export default IconHeader;
