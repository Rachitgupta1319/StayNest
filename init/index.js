require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL =
  process.env.ATLASDB_URL ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/wanderlust";
const ownerEmail = process.argv[2]?.trim().toLowerCase();

async function seedListings() {
  if (!ownerEmail) {
    throw new Error("Provide the registered account email: npm run seed -- user@example.com");
  }

  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 });

  try {
    const owner = await User.findOne({ email: ownerEmail });
    if (!owner) {
      throw new Error(`No registered user found for ${ownerEmail}.`);
    }

    const existingListings = await Listing.find({
      owner: owner._id,
      $or: initData.data.map(({ title, location }) => ({ title, location })),
    }).select("title location");
    const existingKeys = new Set(
      existingListings.map((listing) => `${listing.title}\u0000${listing.location}`),
    );
    const newListings = initData.data
      .filter(
        ({ title, location }) =>
          !existingKeys.has(`${title}\u0000${location}`),
      )
      .map(({ owner: _sampleOwner, ...listing }) => ({
        ...listing,
        owner: owner._id,
      }));

    if (newListings.length > 0) {
      await Listing.insertMany(newListings);
    }

    console.log(
      `Added ${newListings.length} demo listings for ${ownerEmail}; skipped ${initData.data.length - newListings.length} already present.`,
    );
  } finally {
    await mongoose.disconnect();
  }
}

seedListings().catch((err) => {
  console.error("Demo data seeding failed:", err.message);
  process.exitCode = 1;
});
