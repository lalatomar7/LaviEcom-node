const mongoose = require("mongoose");
const validator = require("validator");


const studentSchema =  new mongoose.Schema({
    name:{
        type:String,
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
    number:{
        type: Number,
        required:true,
        unique: [true, "Mobile number is already exist"]
    },
    address:{
        type: String,
    }
}, { versionKey: false });

const Students = new mongoose.model('cruddb_cl', studentSchema);
module.exports = Students;