import { combineReducers } from "redux";
import bugReducer from "./bugs";
import projectReducer from "./project2";
import userReducer from "./users";

export default combineReducers({
  bugs: bugReducer,
  projects: projectReducer,
  users: userReducer
});
