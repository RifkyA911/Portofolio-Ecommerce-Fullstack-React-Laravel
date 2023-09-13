import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slices/UserSlice"
import adminUIReducer from "./Slices/UISlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        UI: adminUIReducer,
        // statistic: statisticReducer,
        // product: productReducer,
        // settings: settingsReducer,
    },
})

export default store;