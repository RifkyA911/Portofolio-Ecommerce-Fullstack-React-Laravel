// store.js
import { createStore } from "redux";
import authReducer from "../Reducers/authReducers";

const store = createStore(authReducer);

export default store;
