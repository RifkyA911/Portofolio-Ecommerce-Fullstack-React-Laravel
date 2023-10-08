import { MuiIcon } from "../../utils/RenderIcons";
import { DangerAlert } from "../Alert";

export const SetErrorMessage = (props) => {
  const { children, errorMessage, refresh } = props;
  return (
    <>
      <DangerAlert
        message={
          <h1>
            <MuiIcon iconName={"WarningRounded"} fontSize={20} />
            {errorMessage}
          </h1>
        }
      />
      <div className="flex flex-col justify-center">
        {children}
        <button
          onClick={refresh}
          className="m-2 w-auto focus:outline-none bg-gradient-to-r from-lime-500 to-green-400 p-2 rounded-md font-roboto-medium text-white items-center "
        >
          <MuiIcon iconName={"RefreshRounded"} fontSize={20} />
        </button>
      </div>
    </>
  );
};
