import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedReducer";
import marketReducer from "./marketReducer";
import projectReducer from "./projectReducer";
import userReducer from "./userReducer";
const store = configureStore({
  reducer: {
    market: marketReducer,
    user: userReducer,
    feed: feedReducer,
    project: projectReducer,
  },
});
export default store;
