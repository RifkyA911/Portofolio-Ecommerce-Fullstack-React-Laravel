import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_LOGIN_ADMIN = import.meta.env.VITE_API_LOGIN_ADMIN;
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    try {
      const response = await axios.post(URL_LOGIN_ADMIN, userCredentials);
      // console.log(response)

      if (response.status === 200) {
        //   const responseData = response.data.data;
        const responseData = response.data;
        sessionStorage.setItem("token", JSON.stringify(responseData));
        //   decodeJWT(responseData.access_token)
        return responseData;
      }

      // Jika status code selain 200, lempar status code sebagai error
      throw response.status;
    } catch (error) {
      const errorMessage = error.response.data.message;
      const errorStatus = error.response.status;
      console.info(error);
      // Jika error adalah respons dari Axios, Anda dapat mengambil status code
      if (error.response && error.response.status) {
        // throw errorMessage
        throw errorMessage;
      }

      // Jika bukan respons dari Axios, lempar error tersebut
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    id: null,
    adminsId: null,
    username: null,
    email: null,
    role: null,
    pict: null,
    authority: null,
    user: null,
    logged: false,
    jwtExp: 0,
    error: null,
  },
  reducers: {
    updateCredentials: (state, action) => {
      // console.log(action.payload.user);
      state.id = action.payload.user.id;
      state.adminsId = action.payload.user.id;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.pict = action.payload.user.pict;
      state.authority = action.payload.user.authority;
      state.logged = true;
    },
    updateSession: (state, action) => {
      //   console.log(action.payload.user);
      state.user = action.payload.user;
    },
    updateJWT: (state, action) => {
      state.jwtExp = action.payload;
    },
    clearSession: (state, action) => {
      state.username = null;
      state.email = null;
      state.role = null;
      state.pict = null;
      state.authority = null;
      state.logged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // kenapa state tidak berubah???
        state.loading = false;
        state.user = action.payload;
        state.logged = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.info("action payload:", action);
        const errorCode = action.error.message;
        state.loading = false;
        state.user = null;
        console.error("Response status code: ", parseInt(errorCode));
        if (errorCode === "401") {
          state.error = "Access Denied! Invalid Credentials";
        } else if (errorCode === "500") {
          state.error = "Internal Server Error";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
export const { updateSession, updateCredentials, clearSession } =
  userSlice.actions;
