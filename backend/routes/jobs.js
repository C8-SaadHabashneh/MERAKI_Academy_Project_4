const express = require("express");

// Import jobs controllers
const {
    createNewJobPost,
    getAllJobPosts,
    getJobPostById,
    updateJobPostById,
    deleteJobPostById,
} = require("../controllers/jobs");

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", createNewJobPost);
jobsRouter.get("/", getAllJobPosts);
jobsRouter.get("/:id", getJobPostById);
jobsRouter.put("/:id", updateJobPostById);
jobsRouter.delete("/:id", deleteJobPostById);

module.exports = jobsRouter;