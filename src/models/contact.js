const { error } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator")



const userSchema = mongoose.Schema({
    name:{
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
    mobile:{
        type:Number,
        required:true,
      
    },
    subject:{
        type:String,
        required:true,
      
    },
    message:{
        type:String,
        required:true,
      
    }
   
})


//creating collection...........
// const User = mongoose.model("Purchases",userSchema);
const register = mongoose.model("contact",userSchema);
module.exports = register;
