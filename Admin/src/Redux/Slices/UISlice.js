import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
    name: "adminUI",
    initialState: {
        theme: "default"
    },
    extraReducers: (builder)=>{
        builder
        .addCase("")
    }
})