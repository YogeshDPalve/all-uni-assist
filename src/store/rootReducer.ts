import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/store/slice/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
