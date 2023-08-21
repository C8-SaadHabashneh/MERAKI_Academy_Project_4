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

// this function updates a profile by its id
const updateProfileById = (req, res) => {
    const id = req.params.id;
    const filter = req.body;
    Object.keys(filter).forEach((key) => {
        filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
    });
    profilesModel.findByIdAndUpdate({_id: id}, req.body, {new: true}).then((newProfile) => {
        if (!newProfile) {
            res.status(404).json({
                success: false,
                message: `The profile with id => ${id} isn't found`,
            });
        }
        else {
            res.status(202).json({
                success: true,
                message: "Profile updated",
                profile: newProfile,
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
    updateProfileById,
};