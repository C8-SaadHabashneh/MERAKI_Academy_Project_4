const jobsModel = require("../models/jobs");

// this function creates a new job post
const createNewJobPost = (req, res) => {
    const {title, jobDescription, jobRequirements} = req.body;
    const company = req.token.userId;
    const newJobPost = new jobsModel({title, jobDescription, jobRequirements, company});
    newJobPost.save().then((result) => {
        res.status(201).json({
            success: true,
            message: "Job Post created",
            jobPost: result,
        });
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message,
        });
    });
};

// this function returns all job posts
const getAllJobPosts = (req, res) => {
    jobsModel.find().populate("company", "firstName lastName country -_id").exec().then((result) => {
        if (result.length) {
            res.status(200).json({
                success: true,
                message: "All the jobs",
                jobs: result,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: "No Jobs yet",
            });
        }
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err,
        });
    });
};

// this function returns a job post by its id
const getJobPostById = (req, res) => {
    let id = req.params.id;
    jobsModel.findById(id).populate("company", "firstName lastName country -_id").exec().then((result) => {
        if (!result) {
            res.status(404).json({
                success: false,
                message: `The Job post with id => ${id} isn't found`,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `The Job post ${id}`,
                jobPost: result,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message,
        });
    });
};

module.exports = {
    createNewJobPost,
    getAllJobPosts,
    getJobPostById,
};