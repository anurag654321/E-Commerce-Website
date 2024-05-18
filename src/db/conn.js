const mongoose=require("mongoose");


//creatin a database
mongoose.connect("mongodb+srv://2k22it32861:uBfA1sRQM55z9253@cluster0.pflbfwf.mongodb.net/2k22it32861?retryWrites=true&w=majority&appName=Cluster0",{
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connect successfully.....");
}).catch((error)=>{
    console.log(error);
})
