const express = require("express");

// Import jobs controllers
const {
    createNewJobPost,
    getAllJobPosts,
    getJobPostById,
} = require("../controllers/jobs");

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", createNewJobPost);
jobsRouter.get("/", getAllJobPosts);
jobsRouter.get("/:id", getJobPostById);

module.exports = jobsRouter;