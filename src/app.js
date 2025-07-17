require('dotenv').config(); // Load environment variables first

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// DB connection
require("./db/conn");

// Models
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
      res.redirect("/");
   } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).send("❌ Registration failed");
   }
});

// Login route
app.post("/login", async (req, res) => {
   try {
      const unam = req.body.username;
      const pass = req.body.password;
      const user = await register.findOne({ username: unam });

      if (user && user.password === pass) {
         res.status(200).render("index");
      } else {
         res.status(401).render("register"); // invalid login
      }
   } catch (error) {
      console.error("Login Error:", error);
      res.status(500).render("register");
   }
});

// Purchase route
app.post("/purchase", async (req, res) => {
   try {
      const newPurchase = new product({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         product: req.body.product,
         address: req.body.address,
      });

      await newPurchase.save();
      res.status(201).render("thank");
   } catch (error) {
      console.error("Purchase Error:", error);
      res.status(500).send("❌ Purchase failed");
   }
});

// Contact route
app.post("/contact", async (req, res) => {
   try {
      const newContact = new contact({
         name: req.body.name,
         email: req.body.email,
         mobile: req.body.mobile,
         subject: req.body.subject,
         message: req.body.message,
      });

      await newContact.save();
      res.status(201).render("index");
   } catch (error) {
      console.error("Contact Error:", error);
      res.status(500).send("❌ Contact submission failed");
   }
});

// Start server
app.listen(port, () => {
   console.log(`✅ Server is running at port ${port}`);
});
