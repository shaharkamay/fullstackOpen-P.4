const jwt = require('jsonwebtoken')
require("dotenv").config();

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const authMiddleware = async (request, response, next) => {
  try {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return next({
        status: 401,
        message: "token has expired invalid"
      });
    }
    request.user = decodedToken;
    next();
  } catch (error) {
    return next({
      status: 401,
      message: "token missing or invalid"
    });
  }
};

module.exports = authMiddleware;