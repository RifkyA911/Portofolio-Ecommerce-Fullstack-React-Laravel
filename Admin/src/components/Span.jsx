import { useEffect, useLayoutEffect, useState } from "react";
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

// export const DaisyUIRating = (props) => {
//   const {
//     shape = "mask-star-2",
//     size = "rating-xs",
//     bg = "bg-amber-500",
//     max = 5,
//     value = 2,
//     readOnly = false,
//   } = props;
//   const [data, setData] = useState(null);

//   const renderRatingInputs = () => {
//     const ratingInputs = [];

//     for (let i = 1; i <= max; i++) {
//       ratingInputs.push(
//         <>
//           <input
//             key={i}
//             type="radio"
//             name={`rating-${i}`}
//             className={`mask ${shape} ${bg}`}
//             checked={i === value}
//             readOnly={readOnly}
//           />
//           {i === value && "SDSD"}
//         </>
//       );
//     }
//     return ratingInputs;
//   };

//   return (
//     <>
//       {/* {data ? ( */}
//       <div className={`rating ${size}`}>{renderRatingInputs()}</div>
//       {/* ) : (
//         "loading"
//       )} */}
//     </>
//   );
// };

export const DaisyUITimeline = (props) => {
  return (
    <>
      <ul className="timeline timeline-vertical">
        <li>
          <div className="timeline-start">1984</div>
          <div className="timeline-middle">
            <ReactIcons iconName="HiCheckCircle" />
          </div>
          <div className="timeline-end timeline-box">
            First Macintosh computer
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">1998</div>
          <div className="timeline-middle">
            <ReactIcons iconName="HiCheckCircle" />
          </div>
          <div className="timeline-end timeline-box">iMac</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2001</div>
          <div className="timeline-middle">
            <ReactIcons iconName="HiCheckCircle" />
          </div>
          <div className="timeline-end timeline-box">iPod</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2007</div>
          <div className="timeline-middle">
            <ReactIcons iconName="HiCheckCircle" />
          </div>
          <div className="timeline-end timeline-box">iPhone</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2015</div>
          <div className="timeline-middle">
            <ReactIcons iconName="HiCheckCircle" />
          </div>
          <div className="timeline-end timeline-box">Apple Watch</div>
        </li>
      </ul>
    </>
  );
};
