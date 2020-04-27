// import { createStore, applyMiddleware } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toastify from "./middleware/toastify";
import api from "./middleware/api";

/* using normal Redux */
// export default function configureStore() {
//   return createStore(reducer, applyMiddleware(logger), devToolsEnhancer({ trace: true }));
// }

/* using Redux toolkit */
export default function() {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      toastify,
      api
    ]
  });
}
