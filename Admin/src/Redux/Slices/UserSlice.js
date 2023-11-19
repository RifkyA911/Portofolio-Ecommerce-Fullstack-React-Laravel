import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import RequestAPI from "../../Config/API";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    try {
      const { data } = await RequestAPI("auth/login", "POST", userCredentials);
      // console.log(request);
      // const response = request.data;
      const expirationDate = new Date(); // Set the token as a cookie with an expiration time (e.g., 1 day)
      expirationDate.setDate(expirationDate.getDate() + 1); // Expires in 1 day
      document.cookie = `token=${JSON.stringify(
        data
      )}; expires=${expirationDate.toUTCString()}`;

      sessionStorage.setItem("token", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    id: null,
    username: null,
    email: null,
    role: null,
    pict: null,
    authority: null,
    user: null,
    logged: false,
    error: null,
  },
  reducers: {
    updateCredentials: (state, action) => {
      // console.log(action.payload.user);
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.pict = action.payload.user.pict;
      state.authority = action.payload.user.authority;
      state.logged = true;
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
        console.error("action payload:", action);
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
export const { updateCredentials, clearSession } = userSlice.actions;
