import * as MuiIcons from "@mui/icons-material";
// import * as ReactIconsFa from "react-icons/fa";
// import * as ReactIconsFi from "react-icons/fi";
// import * as ReactIconsHi from "react-icons/hi";
import * as ReactIconsHi2 from "react-icons/hi2";

export const getMuiIcon = (iconName) => {
  const MuiIcon = MuiIcons[iconName];
  if (MuiIcon) {
    return <MuiIcon className="h-6 w-6 m-0" />;
  }
  return null;
};

export const getReactIconFi = (iconName) => {
  const ReactIconFi = ReactIconsFi[iconName];
  if (ReactIconFi) {
    return <ReactIconFi className="m-0" />;
  }
  return null;
};

export const getReactIconFa = (iconName) => {
  const ReactIconFa = ReactIconsFa[iconName];
  if (ReactIconFa) {
    return <ReactIconFa className="m-0" />;
  }
  return null;
};

export const getReactIconHi = (iconName) => {
  const ReactIconHi = ReactIconsHi[iconName];
  if (ReactIconHi) {
    return <ReactIconHi className="m-0" />;
  }
  return null;
};

export const getReactIconHi2 = (iconName) => {
  const ReactIconHi2 = ReactIconsHi2[iconName];
  if (ReactIconHi2) {
    return <ReactIconHi2 className="h-6 w-6 mr-4" />;
  }
  return null;
};
