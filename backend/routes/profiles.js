const express = require("express");

// Import profiles controllers
const {
    getProfileById,
    updateProfileById,
} = require("../controllers/profiles");

// Create profiles Routers
const profilesRouter = express.Router();

profilesRouter.get("/:id", getProfileById);
profilesRouter.put("/:id", updateProfileById);

module.exports = profilesRouter;