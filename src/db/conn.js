const mongoose=require("mongoose");
require('dotenv').config();

//creatin a database
mongoose.connect(process.env.DB,{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connect successfully.....");
}).catch((error)=>{
    console.log(error);
})
