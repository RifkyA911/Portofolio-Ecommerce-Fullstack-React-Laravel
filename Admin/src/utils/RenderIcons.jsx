import * as MuiIcons from "@mui/icons-material";
// import * as ReactIconsFa from "react-icons/fa";
// import * as ReactIconsFi from "react-icons/fi";
// import * as ReactIconsHi from "react-icons/hi";
import * as ReactIconsBs from "react-icons/bs";
import * as ReactIconsHi2 from "react-icons/hi2";
import * as ReactIconsIo from "react-icons/io";
import * as ReactIconsTb from "react-icons/tb";
import * as ReactIconsPi from "react-icons/pi";

export const getMuiIcon = (iconName) => {
  const MuiIcon = MuiIcons[iconName];
  if (MuiIcon) {
    return <MuiIcon className="m-0" />;
  }
  return null;
};

export const MuiIcon = (props) => {
  const { iconName, fontSize } = props;
  const IconComponent = MuiIcons[iconName]; // Ganti nama variabel

  if (IconComponent) {
    return <IconComponent className="m-0" sx={{ fontSize: fontSize }} />;
  }
  return null;
};

export const getReactIconsBs = (iconName) => {
  const IconComponent = ReactIconsBs[iconName];
  if (IconComponent) {
    return <IconComponent className="mr-4" />;
  }
  return null;
};

export const getReactIconHi2 = (iconName) => {
  const ReactIconHi2 = ReactIconsHi2[iconName];
  if (ReactIconHi2) {
    return <ReactIconHi2 className="m-0" />;
  }
  return null;
};

export const getReactIconsIo = (iconName) => {
  const IconComponent = ReactIconsIo[iconName];
  if (IconComponent) {
    return <IconComponent className="mr-4" />;
  }
  return null;
};

export const getReactIconsTb = (iconName) => {
  const IconComponent = ReactIconsTb[iconName];
  if (IconComponent) {
    return <IconComponent className="mr-4" />;
  }
  return null;
};

export const getReactIconsPi = (iconName) => {
  const IconComponent = ReactIconsPi[iconName];
  if (IconComponent) {
    return <IconComponent className="mr-4" />;
  }
  return null;
};
