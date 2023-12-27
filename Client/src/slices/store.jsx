import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedReducer";
import userReducer from "./userReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
export default store;
