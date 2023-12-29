import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  projects: [],
  selectedProject: -1,
  ranks: [],
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
    updateRanks: (state, action) => {
      state.ranks = action.payload;
    },
  },
});

export const {
  updateSelectedProject,
  updatePosts,
  updateProjects,
  updateRanks,
} = feedSlice.actions;
export default feedSlice.reducer;
