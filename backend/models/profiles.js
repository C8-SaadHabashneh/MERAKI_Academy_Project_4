const mongoose = require("mongoose");

const profilesModel = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},  
    profession: {type: String},
    education: {type: String},
    skills: {type: String},
    about: {type: String},
});

module.exports = mongoose.model("Profile", profilesModel);