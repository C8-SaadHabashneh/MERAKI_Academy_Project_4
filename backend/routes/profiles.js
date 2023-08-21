const express = require("express");

// Import profiles controllers
const {
    getProfileById,
    updateProfileById,
} = require("../controllers/profiles");
const authentication = require("../middlewares/authentication");

// Create profiles Routers
const profilesRouter = express.Router();

profilesRouter.get("/:id", authentication, getProfileById);
profilesRouter.put("/:id", authentication, updateProfileById);

module.exports = profilesRouter;