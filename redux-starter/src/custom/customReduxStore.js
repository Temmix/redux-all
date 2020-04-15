import reducer from "../store/bugs";

const customReduxStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => listeners.push(listener);
  const unSubscribe = () => {
    listeners = [];
  };
  return {
    getState,
    dispatch,
    subscribe,
    unSubscribe
  };
};

export default customReduxStore(reducer);
