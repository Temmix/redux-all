import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import * as actions from "./api";

// reducers
const url = "/bugs";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    // action  => action handlers
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugRemoved: (bugs, action) => {
      let index = bugs.list.indexOf(
        bugs.list.find(x => action.payload.id === x.id)
      );
      bugs.list.splice(index, 1);
    },
    bugResolved: (bugs, action) => {
      let selectedBug = bugs.list.find(x => action.payload.id === x.id);
      if (selectedBug) selectedBug.resolved = true;
    },
    bugAssigned: (bugs, action) => {
      const { id, userId } = action.payload;
      let selectedBug = bugs.list.find(x => x.id === id);
      if (selectedBug) selectedBug.userId = userId;
    },
    bugsReceived: (bugs, action) => {
      const receivedBugs = action.payload;
      bugs.list = [...receivedBugs];
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    }
  }
});

// actions
const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  bugsReceived,
  bugRequested,
  bugRequestFailed
} = slice.actions;

// reducer
export default slice.reducer;

// action creators
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // caching strategy, 10 minutes since last fetched
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    actions.apiCallBegan({
      url,
      onStart: bugRequested.type,
      onError: bugRequestFailed.type,
      onSuccess: bugsReceived.type
    })
  );
};

export const addBug = bug =>
  actions.apiCallBegan({
    url,
    method: "post",
    data: bug,
    //onStart: bugRequested.type,
    //onError: bugRequestFailed.type,
    onSuccess: bugAdded.type
  });

export const resolveBug = id =>
  actions.apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolve: true },
    //onStart: bugRequested.type,
    //onError: bugRequestFailed.type,
    onSuccess: bugResolved.type
  });

export const assignBug = ({ bugId, userId }) =>
  actions.apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    //onStart: bugRequested.type,
    //onError: bugRequestFailed.type,
    onSuccess: bugAssigned.type
  });

/* 
    // selectors (using selectors )
export const unresolvedBugs = state => {
  return state.entities.bugs.filter(bug => !bug.resolved);
}; 
*/

// Memoization (Enhancing the performance of the selectors)
export const unresolvedBugs = createSelector(
  state => state.entities.bugs,
  //state => state.entities.projects,
  //state => state.entities.team,
  bugs => bugs.list.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
  );
