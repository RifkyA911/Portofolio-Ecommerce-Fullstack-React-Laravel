import { DateFormatter } from "../utils/Formatter";

export const DateRecord = (props) => {
  const { className, data } = props;
  return (
    <>
      {data && (
        <small className={`${className} flex flex-row gap-2 p-0`}>
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
      )}
    </>
  );
};

export const NumberSpan = (props) => {
  const { className, data, color, message = null } = props;

  return (
    <>
      <div
        className={`${className} inline-flex font-roboto-medium shadow-sm whitespace-nowrap md:line-clamp-1`}
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

export const ReportSpan = (props) => {
  const { className, span, children } = props;
  return (
    <div className="flex flex-col justify-center items-center object-contain min-w-[300px] min-h-[320px] h-[420px] w-[420px] max-w-[500px] max-h-[520px] rounded-md shadow-lg-h">
      {span ? <h3>{span}</h3> : children}
    </div>
  );
};
