const profilesModel = require("../models/profiles");

// this function returns a profile by its id
const getProfileById = (req, res) => {
    const id = req.params.id;
    profilesModel.findById(id).populate("user", "-_id -dateOfBirth -password -role").exec().then((result) => {
        if (!result) {
            res.status(404).json({
                success: false,
                message: `The profile with id => ${id} isn't found`,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `The profile ${id}`,
                profile: result,
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
    getProfileById,
};