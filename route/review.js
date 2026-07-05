const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const reviewcontroller = require("../controller/review");

// Model imports
const Listing = require("../models/listing");
const Review = require("../models/review");

// Utility imports
const expressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

// Schema imports
const { reviewSchema } = require("../schema");

// Middleware imports
const { isLoggedIn } = require("../middlevare");

// Validation middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    let msg = error.details.map((el) => el.message).join(",");
    throw new expressError(400, msg);
  } else {
    next();
  }
};

// POST - Create new review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewcontroller.postReview));

// DELETE - Remove review
router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewcontroller.deleteReview));

// Export router
module.exports = router;