require('dotenv').config(); // Load environment variables first

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("./db/conn");

const register = require("./models/register");
const product = require("./models/purchase");
const contact = require("./models/contact");

const app = express();
const port = process.env.PORT || 3000;

// Paths
const staticpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");

// Middleware
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
app.set("views", viewsPath);
app.set("view engine", "hbs");

// Routes
app.get("/", (req, res) => {
   res.render("login");
});

app.get("/register", (req, res) => {
   res.render("register");
});

app.get("/index", (req, res) => {
   res.render("index");
});

app.get("/product", (req, res) => {
   res.render("product");
});

app.get("/contact", (req, res) => {
   res.render("contact");
});

app.get("/about", (req, res) => {
   res.render("about");
});

// Register route
app.post("/register", async (req, res) => {
   try {
      const reg = new register({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password,
         cpassword: req.body.confirm_password,
      });

      await reg.save();

      // ✅ Redirects to login page after registration
      res.redirect("/");
   } catch (error) {
      console.log(error);
      res.status(500).send("Registration failed");
   }
});


// Login route
app.post("/login", async (req, res) => {
   try {
      const unam = req.body.username;
      const pass = req.body.password;
      const user = await register.findOne({ username: unam });

      if (user.password == pass) {
         res.status(201).render("index");
      } else {
         res.render("register");
      }
   } catch (error) {
      res.status(500).render("register");
   }
});

// Purchase route
app.post("/purchase", async (req, res) => {
   try {
      const reg = new product({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         product: req.body.product,
         address: req.body.address,
      });

      const ctct = await reg.save();
      res.status(201).render("thank");
   } catch (error) {
      res.status(500).send(error);
   }
});

// Contact route
app.post("/contact", async (req, res) => {
   try {
      const reg = new contact({
         name: req.body.name,
         email: req.body.email,
         mobile: req.body.mobile,
         subject: req.body.subject,
         message: req.body.message,
      });

      const ctct = await reg.save();
      res.status(201).render("index");
   } catch (error) {
      res.status(500).send(error);
   }
});

// Start server
app.listen(port, () => {
   console.log(`server is running at port ${port}`);
});
