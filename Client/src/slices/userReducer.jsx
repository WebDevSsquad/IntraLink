import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  fetch: false,
  expires: false,
  theme: "light",
  picture: "/lightUser.png",
  firstName: "John",
  lastName: "Doe",
  email: "myoussef9366@gmail.com",
  userName: "",
  userID: "",
  isAvailable_Tm: true,
  isAvailable_Con: false,
  location: "Maadi, Cairo",
  phone: "+201140004312",
  about: "",
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "CPP",
    "JQuery",
    "Python",
    "Assembly",
  ],
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
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
    updatePhone: (state, action) => {
      state.phone = action.payload;
    },
    updateAbout: (state, action) => {
      state.about = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills = action.payload;
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
  updateLocation,
  updatePhone,
  updateAbout,
  updateSkills,
} = userSlice.actions;
export default userSlice.reducer;
