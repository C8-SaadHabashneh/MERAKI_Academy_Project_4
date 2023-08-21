const express = require("express");

// Import jobs controllers
const {
    createNewJobPost,
    getAllJobPosts,
    getJobPostById,
    updateJobPostById,
    deleteJobPostById,
} = require("../controllers/jobs");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", authentication, authorization, createNewJobPost);
jobsRouter.get("/", getAllJobPosts);
jobsRouter.get("/:id", getJobPostById);
jobsRouter.put("/:id", authentication, authorization, updateJobPostById);
jobsRouter.delete("/:id", authentication, deleteJobPostById);

module.exports = jobsRouter;