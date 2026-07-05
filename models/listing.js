const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const defaultImageUrl = "https://images.unsplash.com/photo-1781795095622-ca97592f416a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true  
    },
    country: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});



const listing = mongoose.model('listing', listingSchema);
module.exports = listing;