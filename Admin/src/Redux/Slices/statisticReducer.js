import { createSlice } from "@reduxjs/toolkit";

const statisticReducer = createSlice({
    name: "statistic",
    initialState: {
        revenue: null,
        market:null
    },
    extraReducers: (builder)=>{
        builder
        .addCase("")
    }
})