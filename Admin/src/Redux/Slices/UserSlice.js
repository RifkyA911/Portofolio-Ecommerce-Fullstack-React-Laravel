import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        // try {
            const request = await axios.post(
              "http://127.0.0.1:8000/api/admins/login",
              userCredentials
            );
            const response = await request.data.data;
            sessionStorage.setItem('user', JSON.stringify(response)); //rdnom name will
    
            // console.log('response:', request)
            console.log('response code:', request.status)
            console.log('response status:', request.data.status)
            console.log('response message:', request.data.message)
            //console.log('response:', response) // data from server
            return response;

        //   } catch (error) {
        //     console.error("Error during login:", error);
        //   }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user:null,
        logged: false,
        error:null
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.logged = true;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error = "Access Denied! Invalid Credentials"
            } else {
                state.error = action.error.message;
            }
        })
    }
})

export default userSlice.reducer;