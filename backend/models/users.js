const mongoose = require("mongoose");

const usersModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    dateOfBirth: {type: Date, required: true},
    country: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: mongoose.Schema.Types.ObjectId, ref: "Role"},
});

module.exports = mongoose.model("User", usersModel);