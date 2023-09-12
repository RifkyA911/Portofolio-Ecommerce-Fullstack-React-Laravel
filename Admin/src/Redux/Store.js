import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slices/UserSlice"

const store = configureStore({
    reducer:{
        user: userReducer
    },
})

export default store;