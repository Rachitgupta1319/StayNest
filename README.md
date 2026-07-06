# Wanderlust - Airbnb Clone

A full-stack vacation rental platform inspired by Airbnb, built with Node.js, Express, MongoDB, EJS, and Passport authentication. The app lets users browse travel listings, create and manage their own properties, leave reviews, and search for stays by keyword.

## Features

- User registration and login with Passport.js
- Secure session-based authentication
- Create, edit, and delete property listings
- Listing search by title, location, or country
- Review system for listings
- Image upload support through Cloudinary
- Mapbox-powered location geocoding and map display
- Flash messages for success and error feedback
- Responsive UI using EJS templates and custom CSS

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- EJS templating
- Passport.js for authentication
- Joi for validation
- Cloudinary for image hosting
- Mapbox SDK for geocoding/maps
- Connect-Flash and Express Session for notifications

## Project Structure

- app.js — main server entry point
- route/ — Express routes for listings, users, and reviews
- controller/ — request handlers for each feature
- models/ — Mongoose schemas for users, listings, and reviews
- views/ — EJS templates for pages and layouts
- public/ — static CSS/JS assets
- init/ — sample data seeding script
- utils/ — reusable helpers and error handling

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the project root with the following variables:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_token
   ```
4. Start the app:
   ```bash
   node app.js
   ```
5. Open your browser and visit:
   ```text
   http://localhost:8080
   ```

## Seed Sample Data

To populate the database with sample listings, run:

```bash
node init/index.js
```

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

- The app expects a MongoDB database to be available.
- Image uploads and map geocoding require valid Cloudinary and Mapbox credentials.
- The app uses flash-based feedback and session persistence for a smoother user experience.

## Author

Rachit Gupta
