import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  managerProjects: [],
  taskProjects: [],
  conProjects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateManagerProjects: (state, action) => {
      state.managerProjects = action.payload;
    },
    updateTaskProjects: (state, action) => {
      state.taskProjects = action.payload;
    },
    updateConProjects: (state, action) => {
      state.conProjects = action.payload;
    },
  },
});

export const { updateManagerProjects, updateTaskProjects, updateConProjects } =
  projectSlice.actions;
export default projectSlice.reducer;
