const mongoose = require("mongoose");

const profilesModel = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},  
    profession: {type: String, required: true},
    education: {type: String, required: true},
});

module.exports = mongoose.model("Profile", profilesModel);