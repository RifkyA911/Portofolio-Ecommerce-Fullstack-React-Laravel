import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
        try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/admin/login',
              userCredentials
            );
            // console.log(response)
      
            if (response.status === 200) {
            //   const responseData = response.data.data;
              const responseData = response.data;
              sessionStorage.setItem('token', JSON.stringify(responseData));
            //   decodeJWT(responseData.access_token)
              return responseData;
            }
            
            // Jika status code selain 200, lempar status code sebagai error
            throw response.status;
          } catch (error) {
            const errorMessage = error.response.data.message
            const errorStatus = error.response.status
            console.info(error)
            // Jika error adalah respons dari Axios, Anda dapat mengambil status code
            if (error.response && error.response.status) {
                // throw errorMessage
                throw errorMessage
            }
            
            // Jika bukan respons dari Axios, lempar error tersebut
            throw error;
                }
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
    reducers: {
        updateSession: (state, action)=>{
            state.user = action.payload
        }
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
            console.info('action payload:', action)
            const errorCode = action.error.message
            state.loading = false;
            state.user = null;
            console.error("Response status code: ", parseInt(errorCode));
            if(errorCode === '401'){
                state.error = "Access Denied! Invalid Credentials"
            } else if(errorCode === '500'){
                state.error = "Internal Server Error"
            } else {
                state.error = action.error.message;
            }
        })
    }
})

export default userSlice.reducer;
export const {updateSession} = userSlice.actions;