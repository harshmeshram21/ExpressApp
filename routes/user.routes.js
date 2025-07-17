const express = require("express");
const { createUser,getAllUsers, getUserById, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUser);



module.exports = router;
