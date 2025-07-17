const express = require("express");
const {createUser,getAllUsers,getUserById,deleteUser,updateUser} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUser);
router.put("/:userId", updateUser);

module.exports = router;
