const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.postReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review({
    ...req.body.review,
    author: req.user._id,
  });

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New review added successfully!");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review || !review.author || !req.user || !review.author.equals(req.user._id)) {
    req.flash("error", "You can only delete your own review!");
    return res.redirect(`/listings/${id}`);
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};