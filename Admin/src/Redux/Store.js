import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slices/UserSlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        // statistic: statisticReducer,
        // product: productReducer,
        // settings: settingsReducer,
        // UI: UIReducer,
    },
})

export default store;