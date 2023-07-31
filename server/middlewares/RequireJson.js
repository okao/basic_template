const requireJsonContent = (request, response, next) => {
  if (request.headers["content-type"] !== "application/json") {
    response.status(400).send("Server requires application/json");
  } else {
    console.log("Content-Type OK");
    next();
  }
};

module.exports = requireJsonContent;
