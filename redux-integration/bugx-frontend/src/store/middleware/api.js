import axios from "axios";
import * as actions from "../api";

const api = store => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, onSuccess, data, method, onStart, onError } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
      onSuccess,
      onError
    });
    // console.log("api bugs", response.data);
    // specific success handler
    store.dispatch(actions.apiCallSuccess(response.data));
    // general
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // general error handler
    store.dispatch(actions.apiCallFailed(error.message));
    // specific error handler
    if (onError) store.dispatch({ type: onError, payload: error.message });
  }
};

export default api;
