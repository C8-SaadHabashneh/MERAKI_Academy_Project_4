const express = require("express");

// Import users controllers
const {
    register,
    login,
    getUserById,
    updateUserById,
} = require("../controllers/users");

// Create users Router 
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/user/:id", getUserById);
usersRouter.put("/user/:id", updateUserById);

module.exports = usersRouter;