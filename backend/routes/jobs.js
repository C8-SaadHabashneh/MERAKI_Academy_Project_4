const express = require("express");

// Import jobs controllers
const {
    createNewJobPost,
    getAllJobPosts,
} = require("../controllers/jobs");
const jobs = require("../models/jobs");

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", createNewJobPost);
jobsRouter.get("/", getAllJobPosts);

module.exports = jobsRouter