import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  projects: [],
  selectedProject: -1,
  ranks: [],
  tempposts: [],
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
    updateTPosts: (state, action) => {
      state.tempposts = action.payload;
    },
  },
});

export const {
  updateSelectedProject,
  updatePosts,
  updateProjects,
  updateRanks,
  updateTPosts,
} = feedSlice.actions;
export default feedSlice.reducer;
