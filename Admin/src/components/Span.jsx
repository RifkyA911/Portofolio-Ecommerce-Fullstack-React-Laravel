import { convertISODateToJSDate } from "../utils/Formatter";

export const DateRecord = (props) => {
  const { data } = props;
  return (
    <>
      <small className="flex flex-row gap-2">
        <div className="p">
          <span className="font-bold mr-2">Created at:</span>
          {convertISODateToJSDate(data.created_at).toLocaleString()}
        </div>
        |
        <div className="p">
          <span className="font-bold mr-2">Updated at:</span>
          {convertISODateToJSDate(data.updated_at).toLocaleString()}
        </div>
      </small>
    </>
  );
};
