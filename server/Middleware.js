const logMethod = function logServerReceivedRequest(req, res, next) {
  const httpMethod = req.method;
  const url = req.url;

  console.log(`================ Http Method: ' ${httpMethod} ' to url ', ${url}, '================`);
  if (httpMethod === 'get') {
    console.log(req.params);
  } else {
    console.log(req.body);
  }
  next();
};

export default logMethod;
