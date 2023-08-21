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

// this function renders all job posts
const getAllJobPosts = (req, res) => {
    jobsModel.find().then((result) => {
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

module.exports = {
    createNewJobPost,
    getAllJobPosts,
};