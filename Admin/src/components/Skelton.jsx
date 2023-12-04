import Skeleton from "@mui/material/Skeleton";

export const SkeltonTable = (props) => {
  return (
    <>
      <div className="p-0 bg-white">
        {Array.from({ length: 16 }).map((_, index) => (
          <Skeleton key={index} className="p-4" />
        ))}
      </div>
    </>
  );
};

export const SkeltonCircle = (props) => {
  const {
    className,
    Bg = "bg-slate-200",
    height = "h-12",
    weight = "w-12",
  } = props;
  return (
    <>
      <div
        className={className ?? `rounded-full ${Bg} ${height} ${weight}`}
      ></div>
    </>
  );
};

export const SkeltonBox = (props) => {
  const {
    className,
    Bg = "bg-slate-200",
    height = "h-12",
    weight = "w-12",
    count = 1,
  } = props;
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`animate-pulse ${className} ${Bg} ${height} ${weight}`}
        ></div>
      ))}
    </>
  );
};

export const SkeltonMyProfile = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[800px] w-full">
      <div className="border border-gray-300 shadow rounded-md p-4 w-full h-full">
        <div className="animate-pulse flex flex-row space-x-4 md:p-8 h-full">
          <div className="flex flex-col justify-start items-center md:w-7/12">
            <div className="rounded-full bg-slate-200 h-96 w-96"></div>
          </div>
          <div className="flex flex-col md:w-5/12">
            <div className="flex-1 space-y-12 py-1 xgap-12">
              {children}
              <div className="h-10 bg-slate-200 rounded"></div>
              <div className="grid grid-cols-3">
                <div className="h-10 bg-slate-200 rounded col-span-2"></div>
                <div className="h-10 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded"></div>
              <div className="h-10 bg-slate-200 rounded"></div>
              <div className="space-y-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
