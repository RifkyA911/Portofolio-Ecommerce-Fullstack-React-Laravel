import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Content } from "../Layout";
import { ReactIcons } from "../utils/RenderIcons";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme } from "../Redux/Slices/UISlice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);

  // REDUX
  const {
    DarkMode,
    BgColor,
    ContainerBgColor,
    textColor,
    screenWidth,
    ComponentColor,
  } = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Content pageName="Settings">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Application" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel
            className="flex flex-col justify-center items-center"
            value={value}
            index={0}
          >
            <div className="flex flex-row justify-between items-center">
              <h1>Theme</h1>
              {DarkMode == true ? (
                <ReactIcons
                  iconName="MdNightsStay"
                  className="text-sky-800 mr-3 transition-transform fade duration-300"
                  fontSize={24}
                />
              ) : (
                <ReactIcons
                  iconName="MdSunny"
                  className="text-yellow-400 mr-3 transition-transform duration-300"
                  fontSize={24}
                />
              )}
              <input
                type="checkbox"
                className="toggle text-amber-400 checked:text-sky-400"
                onClick={() => {
                  dispatch(darkTheme());
                }}
              />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Content>
    </Container>
  );
}
