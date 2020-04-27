import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";

// reducers
let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    // action  => action handlers
    userAdded: (user, action) => {
      user.push({
        id: ++lastId,
        name: action.payload.name
      });
    },
    userRemoved: (user, action) => {
      let index = user.indexOf(user.find(x => action.payload.id === x.id));
      user.splice(index, 1);
    }
  }
});

// actions
export const { userAdded, userRemoved } = slice.actions;
// reducer
export default slice.reducer;
