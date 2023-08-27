const express = require("express");

// Import jobs controllers
const {
    createNewJobPost,
    getAllJobPosts,
    findJobs,
    getJobPostById,
    updateJobPostById,
    deleteJobPostById,
    applyForJob,
    getApplicantsForJob,
} = require("../controllers/jobs");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// Create jobs Router
const jobsRouter = express.Router();

jobsRouter.post("/", authentication, authorization("CREATE_JOB_POSTS"), createNewJobPost);
jobsRouter.get("/", getAllJobPosts);
jobsRouter.get("/search", findJobs);
jobsRouter.get("/:id", getJobPostById);
jobsRouter.put("/:id", authentication, authorization("UPDATE_JOB_POSTS"), updateJobPostById);
jobsRouter.delete("/:id", authentication, authorization("DELETE_JOB_POSTS"), deleteJobPostById);
jobsRouter.post("/:id/apply", authentication, authorization("APPLY"), applyForJob);
jobsRouter.get("/:id/applicants", authentication, authorization("SEE_APPLICANTS"), getApplicantsForJob);

module.exports = jobsRouter;