const User = require("../model/user.model");

exports.createUser = async (req, resp) => {
  try {
    const user = await User.create(req.body);
    resp.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    resp.status(500).json({ message: "Failed to create user", error: error.message });
  }
};
