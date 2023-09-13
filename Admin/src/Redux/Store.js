import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slices/UserSlice"
import UIReducer from "./Slices/UISlice"

const store = configureStore({
    reducer:{
        user: userReducer,
        UI: UIReducer,
        // statistic: statisticReducer,
        // product: productReducer,
        // settings: settingsReducer,
    },
})

export default store;