const express = require("express");

// Import users controllers
const {
    register,
    login,
} = require("../controllers/users");

// Create users Router 
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);

module.exports = usersRouter;