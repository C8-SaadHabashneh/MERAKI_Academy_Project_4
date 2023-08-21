const express = require("express");

// Import profiles controllers
const {
    getProfileById,

} = require("../controllers/profiles");

// Create profiles Routers
const profilesRouter = express.Router();

profilesRouter.get("/:id", getProfileById);

module.exports = profilesRouter;