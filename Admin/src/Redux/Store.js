import { configureStore } from "@reduxjs/toolkit";
import refreshReducer from "./Slices/RefreshSlice";
import userReducer from "./Slices/UserSlice";
import UIReducer from "./Slices/UISlice";
import navigationReducer from "./Slices/NavigationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    refresh: refreshReducer,
    UI: UIReducer,
    navigation: navigationReducer,
    // statistic: statisticReducer,
    // product: productReducer,
    // settings: settingsReducer,
    // settings: settingsReducer,
  },
});

export default store;
