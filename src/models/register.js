const { error } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator")



const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email...")
            }
        }
    },
    password:{
        type:Number,
        required:true,
      
    },
    cpassword:{
        type:Number,
        required:true,
      
    }
   
})


//creating collection...........
// const User = mongoose.model("Purchases",userSchema);
const register = mongoose.model("register",userSchema);
module.exports = register;
