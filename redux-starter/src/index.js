import configureStore from "./store/configureStore";
import customReduxStore from "./custom/customReduxStore"; // customReduxStore
import * as bugActionCreator from "./store/bugs";
import {
  loadBugs,
  addBug,
  resolveBug,
  assignBug,
  bugRemoved,
  unresolvedBugs,
  getBugsByUser
} from "./store/bugs2";
import * as actions from "./store/api";
import { userAdded } from "./store/users";
import * as projectActionCreator2 from "./store/project2";

// PLEASE NOTE
// bugActionCreator is using normal action type, action creator and reducers
// bugActionCreator2 is using redux-toolkit's createAction to create action and createReducer to create reducer

//*********************** NORMAL REDUX SECTION WITH REDUX TOOLKIT'S CREATEACTION & CREATEREDUCER ***********************/
const store = configureStore();
const unSubscribe = store.subscribe(() => {
  console.log("************* Store Changed *************", store.getState());
});

// console.log("************* Dispatching Bug added *************");

// user
store.dispatch(userAdded({ name: "Tilla Man" }));
store.dispatch(userAdded({ name: "Lisa Gen" }));
store.dispatch(userAdded({ name: "Sandra Quilox" }));

// trigger api call to get list of bugs
store.dispatch(loadBugs());

// bugs
setTimeout(() => {
  store.dispatch(addBug({ description: "Bug 5" }));
}, 3000);
setTimeout(() => {
  store.dispatch(addBug({ description: "Bug 6" }));
}, 3000);
setTimeout(() => {
  store.dispatch(addBug({ description: "Bug 7" }));
}, 3000);

// project
// store.dispatch(projectActionCreator2.projectAdded({ name: "Project one" }));
// store.dispatch(projectActionCreator2.projectAdded({ name: "Project two" }));
// store.dispatch(projectActionCreator2.projectAdded({ name: "Project three" }));

// bug assigned
setTimeout(() => {
  store.dispatch(assignBug({ bugId: 1, userId: 1 }));
}, 3000);

setTimeout(() => {
  store.dispatch(assignBug({ bugId: 5, userId: 1 }));
}, 3000);

// bugs resolved
setTimeout(() => {
  store.dispatch(resolveBug(1));
}, 3000);
setTimeout(() => {
  store.dispatch(resolveBug(5));
}, 3000);

store.dispatch(resolveBug(3));

// projects
store.dispatch(projectActionCreator2.projectResolved({ id: 1 }));
store.dispatch(projectActionCreator2.projectResolved({ id: 2 }));
// console.log(store.getState());

// console.log("************* Dispatching Bug Removed *************");

// bugs
store.dispatch(bugRemoved({ id: 4 }));
// projects
store.dispatch(projectActionCreator2.projectRemoved({ id: 1 }));
// console.log(store.getState());

// get list of unresolved bugs using selector in the bug reducer
const unResolvedBugs = unresolvedBugs(store.getState());
const unResolvedBugs2 = unresolvedBugs(store.getState());
console.log("Unresolved bugs are list ", unResolvedBugs);
console.log("is Memoization working ? : ", unResolvedBugs === unResolvedBugs2);

// get list of bugs assigned to user member
const bugs = getBugsByUser(1)(store.getState());
console.log("User 1 bugs", bugs);

// trigger toastify middleware
store.dispatch({ type: "error", payload: { message: "error really occured" } });

// To prevent memory leak
unSubscribe();

//*********************** CUSTOM REDUX WITH NORMAL ACTION CREATOR AND ACTION TYPE ***********************/
customReduxStore.subscribe(() =>
  console.log(
    "****** customReduxStore changed ******",
    customReduxStore.getState()
  )
);
customReduxStore.dispatch(bugActionCreator.bugAdded("Bug by custom Redux"));
customReduxStore.dispatch(
  bugActionCreator.bugAdded("Another bub by custom Redux")
);
customReduxStore.dispatch(bugActionCreator.bugResolved(3));
console.log(customReduxStore.getState());

// To prevent memory leak
customReduxStore.unSubscribe();
