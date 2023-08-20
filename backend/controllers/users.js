const usersModel = require("../models/users");

// this function registers a user
const register = (req, res) => {
    const {firstName, lastName, phoneNumber, dateOfBirth, country, email, password, role} = req.body;
    const newUser = new usersModel({firstName, lastName, phoneNumber, dateOfBirth, country, email, password, role});
    newUser.save().then((result) => {
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            account: result,
        });
    }).catch((err) => {
        if (err.keyPattern) {
            return res.status(409).json({
                success: false,
                message: "The email already exists",
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Server Error",
                err: err.message,
            });
        }
    });
};

module.exports = {
    register,
};