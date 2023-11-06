import { useEffect } from "react";
import * as GetMuiIcons from "@mui/icons-material";
// import * as ReactIconsFa from "react-icons/fa";
// import * as ReactIconsFi from "react-icons/fi";
// import * as ReactIconsHi from "react-icons/hi";
import * as ReactIconsBs from "react-icons/bs";
import * as ReactIconsHi2 from "react-icons/hi2";
import * as ReactIconsIo from "react-icons/io";
import * as ReactIconsTb from "react-icons/tb";
import * as ReactIconsPi from "react-icons/pi";

export const MuiIcon = (props) => {
  const { iconName, fontSize, className } = props;
  const IconComponent = GetMuiIcons[iconName]; // Ganti nama variabel

  // useEffect(() => {
  //   console.log("iconName", iconName);
  //   // console.log("IconComponent", IconComponent);
  // }, [iconName]);

  if (IconComponent) {
    return <IconComponent className={className} sx={{ fontSize: fontSize }} />;
  }
  return <small>Failed Load Icon</small>;
};

export const IconsBs = (props) => {
  const { iconName, className } = props;
  const IconComponent = ReactIconsBs[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <small>Failed Load Icon</small>;
};

export const IconsHi2 = (props) => {
  const { iconName, className } = props;
  const IconComponent = ReactIconsHi2[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <small>Failed Load Icon</small>;
};

export const IconsIo = (props) => {
  const { iconName, className } = props;
  const IconComponent = ReactIconsIo[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <small>Failed Load Icon</small>;
};

export const IconsTb = (props) => {
  const { iconName, className } = props;
  const IconComponent = ReactIconsTb[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <small>Failed Load Icon</small>;
};

export const IconsPi = (props) => {
  const { iconName, className } = props;
  const IconComponent = ReactIconsPi[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <small>Failed Load Icon</small>;
};
