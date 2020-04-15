import { createSlice } from "@reduxjs/toolkit";

// reducers
let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    // action  => action handlers
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name
      });
    },
    projectRemoved: (projects, action) => {
      let index = projects.indexOf(
        projects.find(x => action.payload.id === x.id)
      );
      projects.splice(index, 1);
    },
    projectResolved: (projects, action) => {
      let selectedproject = projects.find(x => action.payload.id === x.id);

      selectedproject.resolved = true;
    }
  }
});

// actions
export const { projectAdded, projectRemoved, projectResolved } = slice.actions;
// reducer
export default slice.reducer;
