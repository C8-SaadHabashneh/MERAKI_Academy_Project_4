const express = require("express");

// Import profiles controllers
const {
    getProfileById,

} = require("../controllers/profiles");

// Create profiles Routers
profilesRouter = express.Router();

profilesRouter.get("/:id", getProfileById);

module.exports = profilesRouter;