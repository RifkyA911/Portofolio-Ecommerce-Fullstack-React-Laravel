import * as HeroIcons from "@heroicons/react/24/solid";
import * as MuiIcons from "@mui/icons-material";

export const getMuiIconComponent = (iconName) => {
  const MuiIconComponent = MuiIcons[iconName];
  if (MuiIconComponent) {
    return <MuiIconComponent className="h-6 w-6 mr-4" />;
  }
  return null;
};
