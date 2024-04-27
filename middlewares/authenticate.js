const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JSON_WEB_TOKEN, (err, user) => {
    console.log(req.path, "from");
    if (err) {
      return res
        .status(401)
        .json({ error: "Forbidden: Failed to authenticate token" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticate;
