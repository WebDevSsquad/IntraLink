import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedReducer";
import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    project: projectReducer
  },
});
export default store;
