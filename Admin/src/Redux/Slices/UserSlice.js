import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name: "user",
    initialState: {
        loading: false,
        user:null,
        error:null
    },
    reducers: {

    }
})

export default userSlice.reducer;