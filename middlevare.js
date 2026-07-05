const Listing = require("./models/listing.js");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash("error", "You must be signed in first!");
      return res.redirect("/login");
    }
    next();
  },

  localsReturnTo: (req, res, next) => {
    if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
    }
    next();
  },

  isOwner: async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing || !listing.owner || !res.locals.currentUser || !listing.owner.equals(res.locals.currentUser._id)) {
      req.flash("error", "You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
    }

    next();
  }
};