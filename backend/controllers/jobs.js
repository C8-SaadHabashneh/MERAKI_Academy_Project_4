const jobsModel = require("../models/jobs");

// this function creates a new job post
const createNewJobPost = (req, res) => {
  const { title, jobDescription, jobRequirements } = req.body;
  const company = req.token.userId;
  const newJobPost = new jobsModel({
    title,
    jobDescription,
    jobRequirements,
    company,
  });
  newJobPost
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Job Post created",
        jobPost: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

// this function returns all job posts
const getAllJobPosts = (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;

  jobsModel
    .find()
    .populate("company", "firstName lastName country _id")
    .skip(skip)
    .limit(limit)
    .exec()
    .then((result) => {
      jobsModel.countDocuments().then((count) => {
        const totalPages = Math.ceil(count / limit);
        if (result.length) {
          res.status(200).json({
            success: true,
            message: "All the jobs",
            jobs: result,
            totalPages: totalPages,
          });
        } else {
          res.status(200).json({
            success: false,
            message: "No Jobs yet",
            totalPages: 0,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};

// this function returns all job posts that has a title that includes the input from the search bar
const findJobs = (req, res) => {
  const { title, page = 1, limit = 4 } = req.query;
  const titleRegex = new RegExp(title, "i");
  const skip = (page - 1) * limit;

  jobsModel
    .find({ title: titleRegex })
    .populate("company", "firstName lastName country _id")
    .skip(skip)
    .limit(limit)
    .exec()
    .then((result) => {
      jobsModel
        .countDocuments({ title: titleRegex })
        .then((count) => {
          const totalPages = Math.ceil(count / limit);
          if (result.length) {
            res.status(200).json({
              success: true,
              message: "All the jobs",
              jobs: result,
              totalPages: totalPages,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "No Jobs yet",
            });
          }
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function returns a job post by its id
const getJobPostById = (req, res) => {
  const id = req.params.id;
  jobsModel
    .findById(id)
    .populate("company", "firstName lastName country _id")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Job post with id => ${id} isn't found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `The Job post ${id}`,
          jobPost: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function updates a job post by its id
const updateJobPostById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  jobsModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newJob) => {
      if (!newJob) {
        return res.status(404).json({
          success: false,
          message: `The Job post with id => ${id} isn't found`,
        });
      }
      res.status(202).json({
        success: true,
        message: "Job post updated",
        jobPost: newJob,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function deletes a specific job post by its id
const deleteJobPostById = (req, res) => {
  const id = req.params.id;
  jobsModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Job post with id => ${id} isn't found`,
        });
      }
      res.status(200).json({
        success: true,
        message: "Job post deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function lets the user apply for a job
const applyForJob = (req, res) => {
  const jobId = req.params.id;
  const userId = req.token.userId;
  jobsModel
    .findById(jobId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The job post with id => ${jobId} isn't found`,
        });
      }
      if (result.applicants.includes(userId)) {
        return res.status(400).json({
          success: false,
          message: "You have already applied fot this job",
        });
      }
      result.applicants.push(userId);
      result.save().then((result) => {
        res.status(201).json({
          success: true,
          message: "Successfully applied for the job",
          jobPost: result,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function lets a company see the applicants for a job
const getApplicantsForJob = (req, res) => {
  const jobId = req.params.id;
  const companyId = req.token.userId;
  jobsModel
    .findById(jobId)
    .populate("applicants", "firstName lastName country skills phoneNumber email -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Job post with id => ${jobId} isn't found`,
        });
      }
      if (result.company.toString() !== companyId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }
      res.status(200).json({
        success: true,
        message: `Applicants for the job post ${jobId}`,
        applicants: result.applicants,
      });
    })
    .catch((err) => {
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
  findJobs,
  getJobPostById,
  updateJobPostById,
  deleteJobPostById,
  applyForJob,
  getApplicantsForJob,
};
