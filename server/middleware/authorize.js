const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).send("You need to be logged in.");

  try {
    const authToken = req.headers.authorization.split(" ")[1];
    const validatedToken = jwt.verify(authToken, process.env.JWT_KEY);
    if (validatedToken) {
      req.validatedToken = validatedToken;
      next();
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = authorize;
