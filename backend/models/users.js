const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersModel = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    dateOfBirth: {type: Date, required: true},
    country: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true},
});

// register MW
usersModel.pre("save", async function() {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", usersModel);