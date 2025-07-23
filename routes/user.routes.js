const express = require("express");
const {createUser,getAllUsers,getUserById,deleteUser,updateUser} = require("../controllers/user.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); 


router.post("/", createUser);


// Protect all user routes with auth middleware
router.use(authMiddleware);


router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUser);
router.put("/:userId", updateUser);

module.exports = router;
