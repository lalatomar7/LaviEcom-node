const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email Id is already Present"],
        validator(value){
            if (validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    mobile:{
        type: Number,
        required:true,
        unique: [true, "Mobile number is already exist"]
    },
    password:{
        type: String,
        required:true,
    },
    token: { type: String },
}, { versionKey: false })

const usermodel = new mongoose.model('user_tbs', UserSchema);

module.exports = usermodel;
