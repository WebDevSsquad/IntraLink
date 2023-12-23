import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  fetch: false,
  expires: false,
  theme: "light",
  picture: "/lightUser.png",
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  userID: "",
  isAvailable_Tm: false,
  isAvailable_Con: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    updateFetch: (state, action) => {
      state.fetch = action.payload;
    },
    updateExpires: (state, action) => {
      state.expires = action.payload;
    },
    updatePicture: (state, action) => {
      state.picture = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateUserID: (state, action) => {
      state.userID = action.payload;
    },
    updateIsAvailable_Tm: (state, action) => {
      state.isAvailable_Tm = action.payload;
    },
    updateIsAvailable_Con: (state, action) => {
      state.isAvailable_Con = action.payload;
    },
  },
});

export const {
  updateLoggedIn,
  updateFetch,
  updateExpires,
  updatePicture,
  updateTheme,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateUserName,
  updateUserID,
  updateIsAvailable_Tm,
  updateIsAvailable_Con,
} = userSlice.actions;
export default userSlice.reducer;
