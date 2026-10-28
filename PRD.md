# Product Requirements Document (PRD)

## 1. Product Name
Wanderlust – A Full-Stack Vacation Rental Booking Platform

## 2. Product Overview
Wanderlust is a web application inspired by Airbnb that allows users to browse, list, and manage vacation rentals. The platform provides a digital marketplace where hosts can publish property listings and travelers can search for accommodation based on location, price, and other details.

The objective of the product is to simplify accommodation discovery and listing management while demonstrating the practical use of full-stack web development.

## 3. Problem Statement
Travelers often struggle to find reliable and user-friendly accommodation platforms that make booking easy and transparent. Similarly, property owners need a simple way to advertise their homes or rooms online. Existing commercial platforms may be complex or inaccessible for academic use. This project addresses that need by creating a simplified, feature-rich rental marketplace that supports both listing management and accommodation discovery.

## 4. Product Goals
- Create a user-friendly rental marketplace for travelers and hosts
- Enable users to create, update, and delete property listings
- Allow travelers to search and explore available properties
- Support user authentication and secure access
- Enable review and rating functionality
- Build a scalable and maintainable full-stack application

## 5. Target Users
### Primary Users
- Travelers looking for vacation rentals
- Property owners or hosts wanting to list accommodation

### Secondary Users
- Admin users managing content or platform operations
- Visitors browsing listings without logging in

## 6. User Needs
- Easy registration and login
- Quick access to property listings
- Search by location, title, and country
- Detailed information about each property
- Clear pricing and listing details
- Trust through reviews and ratings
- Ability to add and manage property entries

## 7. Core Features

### 7.1 User Authentication
- Register new user
- Login/logout
- Secure session-based authentication
- Restrict listing creation and editing to logged-in users

### 7.2 Listing Management
- Create listing with title, description, location, country, price, and image
- Edit listing
- Delete listing
- View detailed listing page

### 7.3 Search and Browse
- Search listings by keyword
- Filter by title, location, or country
- Display all listings on the homepage

### 7.4 Reviews and Ratings
- Add review for a listing
- Rate the property
- View all reviews on the listing page
- Remove a user review only if authorized

### 7.5 Media Support
- Upload listing images
- Store images using cloud-based storage
- Display images on listing pages

### 7.6 Flash Notifications
- Show success/error messages after actions like login, listing creation, deletion, review submission, and logout

### 7.7 Map Integration
- Use geolocation data for listings
- Display property locations with map support

## 8. Functional Requirements

### FR1: Registration
The system shall allow a new user to create an account using email and password.

### FR2: Login
The system shall allow an existing user to log in using valid credentials.

### FR3: Logout
The system shall allow a logged-in user to log out securely.

### FR4: Listing Creation
Authenticated users shall be able to create a property listing with required fields.

### FR5: Listing Update
Authenticated owners shall be able to update their own listings.

### FR6: Listing Deletion
Authenticated owners shall be able to delete their own listings.

### FR7: Listing Display
All users shall be able to view listing details and listing summaries.

### FR8: Search
Users shall be able to search listings by title, location, or country.

### FR9: Reviews
Authenticated users shall be able to add reviews and ratings for listings.

### FR10: Review Deletion
Users shall be able to delete only their own reviews.

### FR11: Notifications
The system shall show feedback using success and error messages.

### FR12: Image Upload
Users shall be able to upload property images during listing creation.

## 9. Non-Functional Requirements
- The app must be responsive and easy to use
- The interface must be simple and visually clear
- Authentication must be secure
- Data must be validated before saving
- The application should support smooth navigation across pages
- The system should handle invalid input gracefully
- The app should be portable and easy to run in a local development environment

## 10. User Stories
- As a traveler, I want to browse listings so that I can choose a suitable accommodation.
- As a traveler, I want to search properties by location so that I can find stays near my destination.
- As a host, I want to create a listing so that I can advertise my property.
- As a host, I want to edit or delete my listing so that I can keep details up to date.
- As a user, I want to log in securely so that my account remains protected.
- As a user, I want to leave a review so that others can know about my experience.
- As a user, I want to see flash messages so that I know whether my action succeeded.

## 11. Business Logic
- Each listing belongs to one owner.
- Each review belongs to one user and one listing.
- Listing owners can only modify or delete their own listings.
- Review authors can delete only their own reviews.
- Search results should match query inputs in a case-insensitive manner.
- Listing data should be validated before saving.

## 12. System Workflow
1. User opens the application.
2. User registers or logs in.
3. User creates a property listing.
4. Property image and location data are processed.
5. Listing is saved to the database.
6. Users browse listings and search by keyword.
7. Users view property details and reviews.
8. Users add or delete a review.
9. Feedback is displayed through flash notifications.

## 13. Acceptance Criteria
- A new user can register successfully.
- A registered user can log in successfully.
- A logged-in user can create a listing.
- Owners can edit or delete only their own listings.
- Users can search listings by keyword.
- Users can view listing details.
- Users can add reviews with ratings.
- Users can delete only their own reviews.
- The app shows correct success/error messages.
- Invalid input is rejected with a validation error.

## 14. Technology Stack
- Frontend: HTML, CSS, JavaScript, EJS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: Passport.js
- Validation: Joi
- File Upload: Multer
- Cloud Storage: Cloudinary
- Maps: Mapbox
- UI Enhancement: Flash messages and responsive layout

## 15. Code Organization and Application Flow

The application uses a server-rendered, Model-View-Controller structure:

| Area | Location | Responsibility |
|---|---|---|
| Application bootstrap | `app.js` | Configure Express, EJS, sessions, Passport authentication, MongoDB, and route mounting |
| Routes | `route/listing.js`, `route/review.js`, `route/user.js` | Map HTTP requests to middleware and controller actions |
| Controllers | `controller/listing.js`, `controller/review.js`, `controller/user.js` | Implement listing, review, and account workflows |
| Models | `models/listing.js`, `models/review.js`, `models/user.js` | Define MongoDB document schemas and model relationships |
| Request validation | `schema.js` | Validate listing and review request bodies with Joi |
| Middleware | `middlevare.js`, `utils/wrapAsync.js`, `utils/expressError.js` | Enforce login/ownership checks and handle asynchronous or application errors |
| Views | `views/` | Render listing, account, and error pages with EJS |
| Static assets | `public/` | Serve browser-side JavaScript, CSS, and images |
| Integrations | `cloudConfig.js`, `controller/listing.js` | Store uploaded images in Cloudinary and geocode listing locations with Mapbox |
| Seed data | `init/` | Initialize the database with sample listings |

### Request Flow
1. Express parses the request, loads the MongoDB-backed session, and restores the Passport user when authenticated.
2. The matching router applies authentication, ownership, file-upload, and Joi validation middleware as needed.
3. The controller reads or updates Mongoose models and invokes Cloudinary or Mapbox integrations for listing creation when configured.
4. The controller redirects or renders an EJS view. Flash messages communicate the result to the user.
5. Central error middleware renders the error page for errors passed through the application error handler.

### Route Groups

| Method | Path | Purpose | Access |
|---|---|---|---|
| GET | `/listings` | Browse all listings | Public |
| GET | `/listings/search?q={term}` | Search title, location, and country | Public |
| GET | `/listings/new` | Display the listing form | Authenticated |
| POST | `/listings` | Create a listing and upload its image | Authenticated |
| GET | `/listings/:id` | View a listing and its reviews | Public |
| GET | `/listings/:id/edit` | Display the listing edit form | Authenticated |
| PUT | `/listings/:id` | Update a listing | Authenticated; ownership checked |
| DELETE | `/listings/:id` | Delete a listing and its associated reviews | Authenticated; ownership checked |
| POST | `/listings/:id/reviews` | Add a review | Authenticated |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review | Authenticated; author checked |
| GET, POST | `/register` | Display registration form and register an account | Public |
| GET, POST | `/login` | Display login form and authenticate | Public |
| GET | `/logout` | End the authenticated session | Public route; intended for logged-in users |

## 16. Data Schema

MongoDB stores application records as Mongoose documents. ObjectId references connect users, listings, and reviews; uploaded image files remain in Cloudinary, with their URL and storage filename kept on the listing document.

### User

Model: `User` (`models/user.js`); collection: `users`.

| Field | Type | Constraints / behavior |
|---|---|---|
| `_id` | ObjectId | Generated by MongoDB |
| `email` | String | Required and unique |
| `username` | String | Added and managed by `passport-local-mongoose`; used for local authentication |
| `hash` | String | Password hash managed by `passport-local-mongoose`; plaintext passwords are not stored |
| `salt` | String | Password salt managed by `passport-local-mongoose` |

### Listing

Model: `listing` (`models/listing.js`); collection: `listings`.

| Field | Type | Constraints / behavior |
|---|---|---|
| `_id` | ObjectId | Generated by MongoDB |
| `title` | String | Required |
| `description` | String | Required |
| `price` | Number | Required; listing request validation requires a value greater than or equal to zero |
| `location` | String | Required |
| `country` | String | Required |
| `image.url` | String | URL returned by Cloudinary, or a default image URL |
| `image.filename` | String | Cloudinary storage filename, or a default filename |
| `reviews` | Array of ObjectId | References `Review` documents; review deletion also removes the reference |
| `owner` | ObjectId | Required reference to `User` |
| `geometry.type` | String | Required; constrained to `Point` |
| `geometry.coordinates` | Array of Number | Required GeoJSON coordinates in `[longitude, latitude]` order |

Listing creation and update request bodies use the `listing` object. Joi requires `title`, `description`, `price`, `location`, and `country`; `image` is optional at request-validation time because uploaded files are handled separately by Multer and Cloudinary.

### Review

Model: `Review` (`models/review.js`); collection: `reviews`.

| Field | Type | Constraints / behavior |
|---|---|---|
| `_id` | ObjectId | Generated by MongoDB |
| `comment` | String | Required by review request validation |
| `rating` | Number | Required; constrained to 1 through 5 in both Joi request validation and the Mongoose model |
| `createdAt` | Date | Defaults to the time the review is created |
| `author` | ObjectId | Required reference to `User` |

The listing-to-review relationship is stored in the listing's `reviews` array; each review stores its author. Deleting a listing removes its associated review documents. Deleting a review removes its ID from the listing and then deletes the review document.

### Session

Express sessions are stored in MongoDB through `connect-mongo`. Session records support authentication and flash messages and are separate from the `User`, `Listing`, and `Review` application models.

## 17. Scope
### In Scope
- User authentication
- Listing management
- Review system
- Search functionality
- Image upload
- Responsive frontend design

### Out of Scope
- Real payment processing
- Live booking calendar
- Chat system
- Admin dashboard
- Advanced recommendation engine
- Multi-language support

## 18. Risks and Constraints
- Dependency on external APIs such as Cloudinary and Mapbox
- Database connectivity issues if MongoDB is not configured correctly
- Security risks if user sessions are not managed properly
- Need for proper data validation to avoid invalid or malicious input

## 19. Future Enhancements
- Real booking and checkout system
- Payment integration
- Booking history dashboard
- Host dashboard and analytics
- Advanced filters and category-based search
- Map-based property browsing
- Mobile app version

## 20. Conclusion
Wanderlust is a full-stack vacation rental platform designed to replicate the core functionality of a real Airbnb-like system in a simplified academic environment. The application demonstrates practical skills in web development, database management, authentication, and user interaction. It serves as a strong college project by combining both frontend and backend expertise into one complete product.

## 21. Short Summary
Wanderlust is a full-stack Airbnb-inspired web application that allows users to browse, list, and manage vacation properties. It includes user authentication, listing creation, property search, review functionality, media upload, and map integration. The project aims to provide a simple and efficient platform for travelers and hosts, while also demonstrating practical implementation of modern web technologies such as Node.js, Express.js, MongoDB, EJS, and Passport.js.
