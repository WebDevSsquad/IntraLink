import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  projects: [],
  selectedProject: -1,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.posts = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { updateSelectedProject, updatePosts,updateProjects } = feedSlice.actions;
export default feedSlice.reducer;
