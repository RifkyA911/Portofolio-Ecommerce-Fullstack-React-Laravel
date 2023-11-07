import { useEffect } from "react";
import * as GetMuiIcons from "@mui/icons-material";
import * as ReactIconsAi from "react-icons/ai";
import * as ReactIconsBi from "react-icons/bi";
import * as ReactIconsBs from "react-icons/bs";
import * as ReactIconsCi from "react-icons/ci";
import * as ReactIconsCg from "react-icons/cg";
import * as ReactIconsDi from "react-icons/di";
import * as ReactIconsFa from "react-icons/fa";
import * as ReactIconsFa6 from "react-icons/fa6";
import * as ReactIconsFc from "react-icons/fc";
import * as ReactIconsFi from "react-icons/fi";
import * as ReactIconsGi from "react-icons/gi";
import * as ReactIconsGo from "react-icons/go";
import * as ReactIconsGr from "react-icons/gr";
import * as ReactIconsHi from "react-icons/hi";
import * as ReactIconsHi2 from "react-icons/hi2";
import * as ReactIconsIm from "react-icons/im";
import * as ReactIconsIo from "react-icons/io";
import * as ReactIconsIo5 from "react-icons/io5";
import * as ReactIconsLia from "react-icons/lia";
import * as ReactIconsLu from "react-icons/lu";
import * as ReactIconsMd from "react-icons/md";
import * as ReactIconsPi from "react-icons/pi";
import * as ReactIconsRx from "react-icons/rx";
import * as ReactIconsRi from "react-icons/ri";
import * as ReactIconsSi from "react-icons/si";
import * as ReactIconsSl from "react-icons/sl";
import * as ReactIconsTb from "react-icons/tb";
import * as ReactIconsTfi from "react-icons/tfi";
import * as ReactIconsTi from "react-icons/ti";
import * as ReactIconsVsc from "react-icons/vsc";
import * as ReactIconsWi from "react-icons/wi";

export const MuiIcon = (props) => {
  const { iconName, fontSize, className } = props;
  if (!iconName) {
    return <small>invalid iconName</small>;
  }
  const IconComponent = GetMuiIcons[iconName];
  if (IconComponent) {
    return <IconComponent className={className} sx={{ fontSize: fontSize }} />;
  } else {
    console.error(`${iconName} icon doesn't match`);
    console.info(iconName.startsWith("Hi2"));
  }
  return <small>Failed Load Icon</small>;
};

export const ReactIcons = (props) => {
  const { iconName, event, fontSize, className } = props;
  let IconComponent;

  if (!iconName) {
    return <small>invalid iconName</small>;
  }

  // Menentukan jenis ikon berdasarkan prefiks
  if (iconName.startsWith("new")) {
    const modifiedIconName = iconName.startsWith("new")
      ? iconName.substring(3)
      : iconName; // mengambil string dibelakangnya setelah string new
    if (modifiedIconName.startsWith("Fa")) {
      IconComponent =
        ReactIconsFa6[modifiedIconName] || ReactIconsFa[modifiedIconName]; // If ReactIcons is null, fallback to old version
    } else if (modifiedIconName.startsWith("Hi")) {
      IconComponent =
        ReactIconsHi2[modifiedIconName] || ReactIconsHi[modifiedIconName]; // If ReactIcons is null, fallback to old version
    } else if (modifiedIconName.startsWith("Io")) {
      IconComponent =
        ReactIconsIo5[modifiedIconName] || ReactIconsIo[modifiedIconName]; // If ReactIconsFa is null, fallback to old version
    } else {
      console.error(`failed get new an icon`);
    }
  } else if (iconName.startsWith("Ai")) {
    IconComponent = ReactIconsAi[iconName];
  } else if (iconName.startsWith("Bs")) {
    IconComponent = ReactIconsBs[iconName];
  } else if (iconName.startsWith("Bi")) {
    IconComponent = ReactIconsBi[iconName];
  } else if (iconName.startsWith("Ci")) {
    IconComponent = ReactIconsCi[iconName];
  } else if (iconName.startsWith("Cg")) {
    IconComponent = ReactIconsCg[iconName];
  } else if (iconName.startsWith("Di")) {
    IconComponent = ReactIconsDi[iconName];
  } else if (iconName.startsWith("Fa")) {
    IconComponent = ReactIconsFa[iconName] || ReactIconsFa6[iconName]; // If ReactIconsFa is null, fallback to ReactIconsFa6;
  } else if (iconName.startsWith("Fc")) {
    IconComponent = ReactIconsFc[iconName];
  } else if (iconName.startsWith("Fi")) {
    IconComponent = ReactIconsFi[iconName];
  } else if (iconName.startsWith("Gi")) {
    IconComponent = ReactIconsGi[iconName];
  } else if (iconName.startsWith("Go")) {
    IconComponent = ReactIconsGo[iconName];
  } else if (iconName.startsWith("Gr")) {
    IconComponent = ReactIconsGr[iconName];
  } else if (iconName.startsWith("Hi")) {
    IconComponent = ReactIconsHi[iconName] || ReactIconsHi2[iconName]; // If ReactIconsHi is null, fallback to ReactIconsHi2
  } else if (iconName.startsWith("Im")) {
    IconComponent = ReactIconsIm[iconName];
  } else if (iconName.startsWith("Io")) {
    IconComponent = ReactIconsIo[iconName] || ReactIconsIo5[iconName]; // If ReactIconsIo is null, fallback to ReactIconsIo5;;
  } else if (iconName.startsWith("Lia")) {
    IconComponent = ReactIconsLia[iconName];
  } else if (iconName.startsWith("Lu")) {
    IconComponent = ReactIconsLu[iconName];
  } else if (iconName.startsWith("Md")) {
    IconComponent = ReactIconsMd[iconName];
  } else if (iconName.startsWith("Pi")) {
    IconComponent = ReactIconsPi[iconName];
  } else if (iconName.startsWith("Rx")) {
    IconComponent = ReactIconsRx[iconName];
  } else if (iconName.startsWith("Ri")) {
    IconComponent = ReactIconsRi[iconName];
  } else if (iconName.startsWith("Si")) {
    IconComponent = ReactIconsSi[iconName];
  } else if (iconName.startsWith("Sl")) {
    IconComponent = ReactIconsSl[iconName];
  } else if (iconName.startsWith("Tb")) {
    IconComponent = ReactIconsTb[iconName];
  } else if (iconName.startsWith("Tfi")) {
    IconComponent = ReactIconsTfi[iconName];
  } else if (iconName.startsWith("Ti")) {
    IconComponent = ReactIconsTi[iconName];
  } else if (iconName.startsWith("Vsc")) {
    IconComponent = ReactIconsVsc[iconName];
  } else if (iconName.startsWith("Wi")) {
    IconComponent = ReactIconsWi[iconName];
  } else {
    console.error(`${iconName} icon doesn't match`);
  }

  if (IconComponent) {
    return (
      <IconComponent event={event} className={className} size={fontSize} />
    );
  }

  return <small>Failed Load Icon</small>;
};

// const iconLibraries = {
//   Ai: ReactIconsAi,
//   Bi: ReactIconsBi,
//   Bs: ReactIconsBs,
//   Ci: ReactIconsCi,
//   Cg: ReactIconsCg,
//   Di: ReactIconsDi,
//   Fa: ReactIconsFa,
//   Fc: ReactIconsFc,
//   Fi: ReactIconsFi,
//   Gi: ReactIconsGi,
//   Go: ReactIconsGo,
//   Gr: ReactIconsGr,
//   Hi: ReactIconsHi,
//   Hi2: ReactIconsHi2, //ReactIconsHi2,
//   Im: ReactIconsIm,
//   Io: ReactIconsIo,
//   Io5: ReactIconsIo5,
//   Lia: ReactIconsLia,
//   Lu: ReactIconsLu,
//   Md: ReactIconsMd,
//   Pi: ReactIconsPi,
//   Rx: ReactIconsRx,
//   Ri: ReactIconsRi,
//   Si: ReactIconsSi,
//   Sl: ReactIconsSl,
//   Tb: ReactIconsTb,
//   Tfi: ReactIconsTfi,
//   Ti: ReactIconsTi,
//   Vsc: ReactIconsVsc,
//   Wi: ReactIconsWi,
// };
