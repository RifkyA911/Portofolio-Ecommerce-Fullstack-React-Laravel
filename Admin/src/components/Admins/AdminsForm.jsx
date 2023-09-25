import React, { useState, useEffect } from "react";
// Components
import Skeleton from "@mui/material/Skeleton";
import { Modal } from "../components/Modal";
import { DangerAlert, WarningAlert } from "../components/Alert";
// Layout
import { Container, Content } from "../Layout";
// REDUX
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// UTILS
import { MuiIcon, getReactIconHi2 } from "../utils/RenderIcons";
import fetchData from "../utils/API/AsyncFetch";

export const ComponentName = (props) => {
  return (
    <>
      <div></div>
    </>
  );
};
