# Wanderlust

Wanderlust is a full-stack vacation rental web application inspired by Airbnb. It allows users to browse travel stays, create and manage listings, leave reviews, and search properties by keyword.

## Overview

This project demonstrates a complete Node.js and Express application with:

- user authentication and authorization
- CRUD operations for property listings
- review functionality for each listing
- image uploads and cloud storage integration
- location-based map and geocoding support
- flash notifications and session-based user experience

## Features

- User registration and login with Passport.js
- Secure session-based authentication
- Create, edit, and delete property listings
- Search listings by title, location, or country
- Add and delete reviews for listings
- Upload listing images via Cloudinary
- Display interactive location data with Mapbox
- Responsive UI built with EJS templates and custom CSS

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating engine
- Passport.js for authentication
- Joi for request validation
- Cloudinary for image hosting
- Mapbox SDK for geocoding and map display
- Connect-Flash and Express Session

## Project Structure

- app.js — main server entry point
- route/ — application routes for listings, reviews, and users
- controller/ — business logic for each route group
- models/ — Mongoose schemas for users, listings, and reviews
- views/ — EJS templates and layouts
- public/ — static CSS and JavaScript assets
- init/ — sample data seeding script
- utils/ — reusable error handling and helper utilities

## Prerequisites

Before running this project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- Cloudinary account credentials
- Mapbox access token

## How It Works

1. Users can register or log in to access listing management features.
2. Authenticated users can create new stays, edit existing ones, or delete their own listings.
3. Visitors and users can browse listings and view detailed property pages.
4. Each listing supports user reviews and rating-based feedback.
5. Listing locations are enhanced with location data and map support through external APIs.

## Main Routes

- GET /listings — view all listings
- GET /listings/new — create a new listing (requires login)
- GET /listings/:id — view a specific listing
- POST /listings — create a listing
- PUT /listings/:id — update a listing
- DELETE /listings/:id — delete a listing
- POST /listings/:id/reviews — add a review
- DELETE /listings/:id/reviews/:reviewId — delete a review
- GET /register — register a new account
- GET /login — login
- GET /logout — logout

## Notes

- The app expects a working MongoDB connection.
- Image uploads and map geocoding require valid Cloudinary and Mapbox credentials.
- Flash messages provide feedback for successful actions and errors.

## Author

Rachit Gupta
