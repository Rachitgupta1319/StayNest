const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const usercontroller = require("../controller/user");

// Model imports
const User = require("../models/user");

// Utility imports
const expressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// Middleware imports
const { localsReturnTo } = require("../middlevare");

// GET - Register form
router.get("/register", usercontroller.registerForm);

// POST - Register new user
router.post("/register", wrapAsync(usercontroller.postNewUser));

// GET - Login form
router.get("/login", usercontroller.loginForm);

// POST - Login user
router.post("/login", localsReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), usercontroller.loginUser);

// GET - Logout user
router.get("/logout", usercontroller.logOut);

// Export router
module.exports = router;