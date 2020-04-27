import React from "react";
//import Bugs from "./components/Bugs";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import "./App.css";
import BugList from "./components/BugList";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BugList />
    </Provider>
  );
}

export default App;
