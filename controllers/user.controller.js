const User = require("../model/user.model");
const bcrypt = require("bcrypt");

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { userId, email } = req.body;

    console.log(userId, email)

    const existingUserId = await User.findOne({ userId });
    if (existingUserId) {
      return res.status(400).json({ message: "UserId already exists" });
    }
  

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const user = await User.create(req.body);
    const { password: _, ...userData } = user.toObject(); 
    res.status(201).json({ message: "User created successfully", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get user by userId
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// Delete user by userId
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully", userInfo: user });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

// Update user by userId

exports.updateUser = async (req, res) => {
  try {
    const { email, password ,userId} = req.body;
    console.log(userId, email)  

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    if (email) {
      const exists = await User.findOne({ email });
      if (exists && exists.userId !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updateData = { ...req.body,userId};

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findOneAndUpdate(
      { userId },
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};


// exports.updateUser = async (req, res) => {
//   try {
//     const { email,  password } = req.body;

//     // Check if userId/email already exists (other than current)
//     // if (userId) {
//     //   const exists = await User.findOne({ userId });
//     //   if (exists && exists.userId !== req.params.userId) {
//     //     return res.status(400).json({ message: "userId already in use" });
//     //   }
//     // }

//     if (email) {
//       const exists = await User.findOne({ email });
//       if (exists && exists.userId !== req.params.userId) {
//         return res.status(400).json({ message: "Email already in use" });
//       }
//     }

//     const updateData = { ...req.body };

//     // Hash new password if updating
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       updateData.password = await bcrypt.hash(password, salt);
//     }

//     const user = await User.findOneAndUpdate(
//       { userId: req.params.userId },
//       updateData,
//       { new: true, runValidators: true }
//       // { new: true } returns the updated document
//       // { runValidators: true } ensures that the update respects the schema
//     ).select("-password");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update user", error: error.message });
//   }
// };
