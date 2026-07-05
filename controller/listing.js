const { response } = require("express");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// Controller function for the index route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings, searchQuery: "" });
}

module.exports.search = async (req, res) => {
  const query = req.query.q?.trim() || "";

  let allListings = [];
  if (query) {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });
  }

  res.render("listings/index.ejs", { allListings, searchQuery: query });
}

// Controller function for the new route
module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

// Controller function for the show route
module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path: "reviews",
    populate: { path: "author", select: "username" },
  }).populate("owner");

  const coordinates = listing.geometry && listing.geometry.coordinates
    ? listing.geometry.coordinates
    : [-71.06776, 42.35816];

  res.render("listings/show.ejs", { listing, coordinates });
};

// Controller function for the create route
module.exports.create = async (req, res) => {
  let geometry = {
    type: "Point",
    coordinates: [-71.06776, 42.35816],
  };

  if (mapToken && req.body?.listing?.location) {
    try {
      const geocodeResponse = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      }).send();

      if (geocodeResponse?.body?.features?.length) {
        geometry = geocodeResponse.body.features[0].geometry;
      }
    } catch (err) {
      console.log("Geocoding failed:", err.message);
    }
  }

  let url = req.file?.path || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80";
  let filename = req.file?.filename || "default-image";

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New listing created successfully!");
  res.redirect("/listings");
};

// Controller function for the edit route
module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};

// Controller function for the update route
module.exports.update = async (req, res) => {
  let { id } = req.params;
  let updateData = { ...req.body.listing };

  if (req.file) {
    updateData.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await Listing.findByIdAndUpdate(id, updateData);
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

// Controller function for the delete route
module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (deletedListing) {
    console.log("deleted listing", deletedListing._id);
  }
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};