const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email...");
            }
        }
    },
    password: {
        type: String, // ✅ Changed to String
        required: true,
    },
    cpassword: {
        type: String, // ✅ Changed to String
        required: true,
    }
});

const register = mongoose.model("register", userSchema);
module.exports = register;
