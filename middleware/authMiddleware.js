const jwt = require("jsonwebtoken");
const UserNameModel = require("../model/user.model");

const userAuth = async (request, response, next) => {
  try {
    const token = request.cookies?.token;

    if (!token) {
      return response.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userInfo = await UserNameModel.findById(decoded.id);
    if (!userInfo) {
      return response.status(401).json({ error: "User not found" });
    }

    request.user = userInfo;
    next();
  } catch (error) {
    response.status(401).json({ error: "Invalid credentials" });
  }
};

module.exports = userAuth;

