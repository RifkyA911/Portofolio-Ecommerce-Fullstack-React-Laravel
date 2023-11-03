import { DateFormatter } from "../utils/Formatter";

export const DateRecord = (props) => {
  const { data } = props;
  return (
    <>
      <small className="flex flex-row gap-2">
        <div className="p">
          <span className="font-bold mr-2">Created at:</span>
          {DateFormatter("YYYY-MM-DD-hh-mm-ss", data.created_at)}
        </div>
        |
        <div className="p">
          <span className="font-bold mr-2">Updated at:</span>
          {DateFormatter("YYYY-MM-DD-hh-mm-ss", data.updated_at)}
        </div>
      </small>
    </>
  );
};

export const NumberSpan = (props) => {
  const { className, data, color, message = null } = props;

  return (
    <>
      <div
        className={`${className} lg:flex-col font-roboto-medium shadow-sm xl:line-clamp-1`}
      >
        <span
          className={`
           bg-slate-100 px-[4px] py-[2px] bg-opacity-80 rounded-sm mr-2`}
        >
          {data}
        </span>
        <small className="text-xs font-roboto-reguler ">{message}</small>
      </div>
    </>
  );
};
