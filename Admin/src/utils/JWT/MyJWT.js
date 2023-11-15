import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCredentials } from "../../Redux/Slices/UserSlice";

const URL_REFRESH_JWT = import.meta.env.VITE_API_ID_ADMIN + "/refresh"; // Ganti dengan kunci rahasia Anda
function decodeJWT(token) {
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
    // console.log('token:', decodedToken);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return decodedToken;
}

// Fungsi untuk merefresh token
export const refreshAccessToken = async () => {
  const { refreshToken } = useSelector((state) => state.refresh);
  const { logged, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let getToken = JSON.parse(sessionStorage.getItem("token"));
  let access_token = getToken.access_token;
  // console.log(getToken.access_token);

  useEffect(() => {
    console.log("sdsd");
    doRefreshJWT();
  }, [refreshToken]);

  const doRefreshJWT = async () => {
    console.log("refresh JWT");
    try {
      const response = await axios.post(
        URL_REFRESH_JWT,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        }
      );

      if (!response.data.access_token) {
        throw new Error("Failed to refresh token");
      }
      // console.log("refreshedToken", response.data);
      sessionStorage.setItem("token", JSON.stringify(response.data));
      dispatch(updateCredentials({ user: getUser() }));
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };
};

export default decodeJWT;
