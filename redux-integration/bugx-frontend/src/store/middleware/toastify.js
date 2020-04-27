const toastify = state => next => action => {
  // console.log("******* TOASTIFY MIDDLEWARE *******");
  if (action.type === "error") console.log("Toastify", action.payload.message);
  return next(action);
};

export default toastify;
