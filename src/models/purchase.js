const { error } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator")



const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,

    },
    lastname:{
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
    product:{
        type:String,
        required:true,
      
    },
    address:{
        type:String,
        required:true,
      
    }
   
})


//creating collection...........
// const User = mongoose.model("Purchases",userSchema);
const register = mongoose.model("purchase",userSchema);
module.exports = register;
