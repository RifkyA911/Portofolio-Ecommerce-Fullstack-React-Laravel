import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
import RequestAPI from "./API";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getUser() {
  // const getToken = sessionStorage.getItem("token");
  const getToken = getCookie("token");

  if (getToken) {
    try {
      const decodeResult = jwtDecode(JSON.parse(getToken).access_token);
      return decodeResult;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  } else {
    return null;
  }
}

export const getAccessToken = () => {
  // const getToken = sessionStorage.getItem("token");
  const getToken = getCookie("token");

  if (getToken) {
    try {
      return JSON.parse(getToken).access_token;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  } else {
    return null;
  }
};

export function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if the cookie starts with the specified name
    if (cookie.startsWith(`${cookieName}=`)) {
      // Return the value of the cookie
      return cookie.substring(cookieName.length + 1);
    }
  }
  // Return null if the cookie is not found
  return null;
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

// Fungsi untuk merefresh token
export const refreshAccessToken = async () => {
  try {
    const request = await RequestAPI("admin/refresh", "POST", {
      getRefreshAccessToken: true,
    });
    const response = request.data;
    console.log(response);
    if (!response.access_token) {
      throw new Error("Failed to refresh token");
    }
    sessionStorage.setItem("token", JSON.stringify(response.data));
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Expires in 1 day
    document.cookie = `token=${JSON.stringify(
      response
    )}; expires=${expirationDate.toUTCString()}`;
  } catch (error) {
    console.error("Error fetching admin data:", error);
  }

  // let getToken = JSON.parse(getCookie("token"));
  // let access_token = getToken.access_token;

  // return axios
  //   .post(
  //     import.meta.env.VITE_API_ID_ADMIN + "/refresh",
  //     {},
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + access_token,
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     if (!response.data.access_token) {
  //       throw new Error("Failed to refresh token");
  //     }
  //     // console.log("refreshedToken", response.data);
  //     sessionStorage.setItem("token", JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.error("Error refreshing token:", error);
  //   });
};

export function logOutUser() {
  console.log("session data are cleared");
  sessionStorage.clear();
  deleteCookie("token");
}
