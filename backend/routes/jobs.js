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

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", authentication , createNewJobPost);
jobsRouter.get("/", getAllJobPosts);
jobsRouter.get("/:id", getJobPostById);
jobsRouter.put("/:id", authentication , updateJobPostById);
jobsRouter.delete("/:id", deleteJobPostById);

module.exports = jobsRouter;