const express = require("express");
const mongoose =require("mongoose");
const path =require("path");//used with static files
require("./db/conn");

const register =require("./models/register");
const product =require("./models/purchase");
const contact =require("./models/contact");

require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;



mongoose.connect(process.env.DB,{
   useNewUrlParser:true,
   useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify:false
})
.then(()=>{
    
    console.log("data base connection done...")
}).catch(()=>{
    console.log("data base not connect..")
})

//seting path
const staticpath = path.join(__dirname,"../public");
//middle ware

app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");





//routing .................................................................................

app.get("https://anuragecommerce23.netlify.app",(req,res)=>{
   res.render("login");
})
app.get("https://anuragecommerce23.netlify.app/register",(req,res)=>{
   res.render("register");
})
app.get("https://anuragecommerce23.netlify.app/index",(req,res)=>{
   res.render("index");
})
app.get("https://anuragecommerce23.netlify.app/product",(req,res)=>{
   res.render("product");
})

app.get("https://anuragecommerce23.netlify.app/contact",(req,res)=>{
   res.render("contact");
})
app.get("https://anuragecommerce23.netlify.app/about",(req,res)=>{
   res.render("about");
})








app.post("https://anuragecommerce23.netlify.app/register",async(req,res)=>{
   try{
     const reg=new register({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cpassword:req.body.confirm_password,
        
     })

     const ctct= await reg.save();
     res.status(201).render("login");
  
   }catch(error){
      res.status(500).send(error)
   }
})

app.post("https://anuragecommerce23.netlify.app/login",async(req,res)=>{
   try{
       const unam=req.body.username;
       const pass=req.body.password;
      const user=await register.findOne({username:unam});
   //    console.log(user);
      if(user.password==pass){
       res.status(201).render("index");
      }
     else{
       res.render("register")
     }
   }catch(error){
      res.status(500).render("register")
     
   }
})


app.post("https://anuragecommerce23.netlify.app/purchase",async(req,res)=>{
   try{
     const reg=new product({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        product:req.body.product,
        address:req.body.address,
        
     })

     const ctct= await reg.save();
     res.status(201).render("thank");
  
   }catch(error){
      res.status(500).send(error)
   }
})
app.post("https://anuragecommerce23.netlify.app/contact",async(req,res)=>{
   try{
     const reg=new contact({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        subject:req.body.subject,
        message:req.body.message
        
     })

     const ctct= await reg.save();
     res.status(201).render("index");
  
   }catch(error){
      res.status(500).send(error)
   }
})


//server create...
app.listen(port,() =>{
    console.log(`server is running at port ${port}`)
})













