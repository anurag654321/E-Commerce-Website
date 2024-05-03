const mongoose=require("mongoose");


//creatin a database
mongoose.connect("mongodb://localhost:27017/project",{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connect successfully.....");
}).catch((error)=>{
    console.log(error);
})
