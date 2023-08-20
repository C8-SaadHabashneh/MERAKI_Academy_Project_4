const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = require(process.env.SECRET);

// this function registers a user
const register = (req, res) => {
    const {
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    country,
    email,
    password,
    role,
    } = req.body;
    const newUser = new usersModel({
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    country,
    email,
    password,
    role,
    });
    newUser
    .save()
    .then((result) => {
        res.status(201).json({
        success: true,
        message: "Account created successfully",
        account: result,
        });
    })
    .catch((err) => {
        if (err.keyPattern) {
        return res.status(409).json({
            success: false,
            message: "The email already exists",
        });
        } else {
        res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message,
        });
        }
    });
};

// this function logs in a user
const login = (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
        if (!result) {
        return res.status(403).json({
            success: false,
            message: "The email doesn't exist or The password you've entered is incorrect",
        });
        }
        try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
            return res.status(403).json({
            success: false,
            message: "The email doesn't exist or The password you've entered is incorrect",
            });
        }
        const payload = {
            userId: result._id,
            author: result.firstName,
            role: result.role,
            country: result.country,
        };
        const options = {
            expiresIn: "12h",
        };
        const token = jwt.sign(payload, SECRET, options);
        res.status(200).json({
            success: true,
            message: "Valid login credentials",
            token: token,
        });
        } catch (error) {
        throw new Error(error.message);
        }
    })
    .catch((err) => {
        res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
        });
    });
};

module.exports = {
    register,
    login,
};
