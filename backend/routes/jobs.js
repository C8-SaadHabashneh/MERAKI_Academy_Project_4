const express = require("express");

// Import jobs controllers
const {
    createNewJobPost,
    getAllJobPosts,
} = require("../controllers/jobs");

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", createNewJobPost);


module.exports = jobsRouter