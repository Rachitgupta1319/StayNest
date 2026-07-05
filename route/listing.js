const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const {  storage } = require("../cloudConfig");
const upload = multer({ storage: storage });


const listingcontroller = require("../controller/listing");

// Model imports
const Listing = require("../models/listing");

// Utility imports
const expressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// Schema imports
const { listingSchema } = require("../schema");

// Middleware imports
const { isLoggedIn, isOwner } = require("../middlevare");

// Validation middleware
const validateListing = (req, res, next) => { 
    let { error } = listingSchema.validate(req.body);
    if (error) {
      console.log(error);
      let msg = error.details.map((el) => el.message).join(",");
      throw new expressError(400, msg);
      }
      else {
        next();
      }
};

//Index Route
router.get("/", wrapAsync(listingcontroller.index));

//Search Route
router.get("/search", wrapAsync(listingcontroller.search));

//New Route
router.get("/new", isLoggedIn, listingcontroller.new); 

//Show Route
router.get("/:id", wrapAsync(listingcontroller.show));

//Create Route
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingcontroller.create));


//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingcontroller.edit));

//Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingcontroller.update));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingcontroller.delete));

// Export router
module.exports = router;
