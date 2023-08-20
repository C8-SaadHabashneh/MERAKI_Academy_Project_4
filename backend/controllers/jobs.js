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

module.exports = {
    createNewJobPost,

};