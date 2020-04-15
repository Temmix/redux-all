const logger = param => state => next => action => {
  // param can determine whattype of logger
  // you want to use depending on environment
  // console.log("******** LOGGER MIDDLEWARE ********");
  // console.log(param, state);
  return next(action);
};

export default logger;
