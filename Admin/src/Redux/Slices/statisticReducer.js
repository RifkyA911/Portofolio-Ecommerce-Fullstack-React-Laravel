import { createSlice } from "@reduxjs/toolkit";

const statisticReducer = createSlice({
    name: "statistic",
    initialState: {
        revenue: null
    },
    extraReducers: (builder)=>{
        builder
        .addCase("")
    }
})