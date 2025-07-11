# Uber Clone MERN Full stack Application

**Uber Clone MERN Application** is a full-stack web application that mimics core features of the Uber ride-hailing platform, built using the **MERN** stack (MongoDB, Express.js, React, Node.js). It allows users (passengers) to request rides and drivers (captains) to accept and complete those rides, with real-time updates and location tracking. This project is currently intended for local development and testing (no live deployment), demonstrating how an Uber-like service can be implemented with modern web technologies.

## Features

* **User Authentication:** Users can register and log in to the application (via **`/users/register`** and **`/users/login`** endpoints) with form validation. Authentication is managed with JSON Web Tokens (JWT); protected routes (e.g. **`GET /users/profile`**, **`GET /users/logout`**) ensure only logged-in users can access their profile or log out. User sessions are maintained via token (sent in headers or cookies) and a token blacklist is used on logout to prevent reuse.

* **Driver (Captain) Authentication:** Drivers (called *Captains* in the app) have a separate registration and login flow. Captains sign up with personal info **plus vehicle details** (vehicle color, license plate, capacity, and type). Endpoints like **`/captains/register`** and **`/captains/login`** create a captain account and issue a JWT on login. Captains also have protected profile and logout routes (e.g. **`GET /captains/profile`**, **`/captains/logout`**) which require a valid captain token.

* **Ride Booking & Management:** Authenticated users can request a ride by providing a pickup location and destination. The application will calculate a **fare estimate** for the trip based on the distance and chosen vehicle type before the ride is confirmed. Upon confirming, a new ride entry is created on the backend (**POST** **`/rides/create`** saves the ride request with pickup, destination, and vehicle type). The backend matches the ride with available drivers: when a ride is created, nearby captains are **notified in real-time** to view/accept the request. A driver can then **confirm (accept) the ride** via a protected endpoint (e.g. **`POST /rides/confirm`**), which updates the ride status and assigns the ride to that captain. (An OTP verification step is required in this implementation when the ride starts, adding a layer of security before the trip begins.)

* **Real-Time Updates & Tracking:** The app uses **WebSockets (Socket.io)** for live communication between clients and the server. Drivers receive new ride requests instantly through a socket event (e.g. `"new-ride"`) as soon as a user books a ride. Likewise, when a driver accepts a ride, the user’s app immediately gets a `"ride-confirmed"` event with details of the assigned driver. As the trip progresses, additional events are emitted (e.g. `"ride-started"`, `"ride-ended"`) to update the user in real-time about the ride status. The frontend listens for these events and updates the UI accordingly (for example, navigating the user to the en route screen when the ride starts, or back to home when the ride ends). A **Live Tracking** component displays a Google Map with the driver’s current location in real time. The driver's app continually sends its GPS coordinates to the server (via a periodic `"update-location-captain"` socket emission) while a ride is active, enabling live location tracking on the user side. This two-way real-time communication ensures the passenger and driver apps stay in sync with ride progress.

* **Location Services:** The application integrates with the **Google Maps API** for geocoding and places. When users enter an address, the frontend provides **autocomplete suggestions** for pickups and destinations by calling the backend’s **`/maps/get-suggestions`** endpoint as they type. The backend’s location service uses Google Places Autocomplete API to fetch place predictions. Once a pickup and destination are chosen, the backend can **geocode** those addresses to latitude/longitude coordinates using Google Geocoding API, and calculate the **distance and travel time** between them using the Google Distance Matrix API. This information is used to estimate fares and provide the user with trip distance/time estimates. If a ride is booked, the system also uses the coordinates to find nearby drivers within a certain radius (using MongoDB geospatial queries).

* **Vehicle Management for Drivers:** Captains are required to input their vehicle information during signup (vehicle type, color, license plate, and capacity). This data is stored in their profile and displayed to users when a ride is confirmed (so the user knows the car details). The system uses the vehicle type to determine fare rates and eligibility for ride requests. Additionally, a captain’s online status and location are tracked: as drivers log in and emit their location, the backend updates their coordinates in the database. This allows the app to match rides to nearby drivers and to eventually show the driver’s moving position on the live map during a ride.

## Tech Stack

* **MongoDB & Mongoose:** Database for storing users, captains, rides, and other data. Mongoose is used for modeling data and queries.
* **Express.js & Node.js:** Backend REST API server, including routes for authentication, rides, and maps. Express handles routes like users, captains, rides, etc., and integrates with Socket.io for real-time features.
* **React & Vite:** Frontend single-page application built with React (bootstrapped with Vite for development). React manages the user interface, routing (via React Router), and state management for the app.
* **Socket.io:** Real-time communication channel for ride requests and status updates between clients (user and driver browsers) and the server.
* **Google Maps API:** Used for maps and location services – including displaying interactive maps (via the @react-google-maps/api library on the frontend) and using Google’s Geocoding, Distance Matrix, and Places Autocomplete services on the backend for location-based features.
* **JWT (JSON Web Tokens):** Used for authenticating requests. After login, a JWT is stored client-side (and also set as a cookie) and sent with subsequent API calls to protect routes.
* **Tailwind CSS:** Utility-first CSS framework for styling the frontend components (provides classes for layout, spacing, colors, etc., as seen in the JSX code).
* **Axios:** HTTP client library used on the frontend (and backend for calling external APIs) for making requests to the server or third-party APIs.
* **Nodemon:** Used in development for automatically restarting the Node.js server on code changes (via `npm run dev` script).

## Installation and Setup

Follow these steps to set up the project on your local machine:

1. **Clone the repository:** Clone this repo to your local system using git or download the ZIP.

2. **Install prerequisites:** Make sure you have **Node.js** (v14+ recommended) and **npm** installed. You also need **MongoDB** running locally (the app expects MongoDB on the default port 27017, or you can configure the connection string). Additionally, obtain a **Google Maps API Key** if you want to enable map and location features (Google Cloud – enable Maps JavaScript API, Geocoding API, Places API, and Distance Matrix API).

3. **Backend Configuration:** In the `Backend/` directory, create a file named **.env** (if it doesn’t exist) and add the required environment variables:

   ```bash
   # Backend/.env
   PORT=4000                   # Port for the Express server (4000 is used in dev)
   DB_CONNECT=mongodb://localhost:27017/uber-mern   # MongoDB connection URI
   JWT_SECRET=<your_jwt_secret>    # Secret key for JWT signing/verifying
   GOOGLE_MAPS_API=<your_google_maps_api_key>       # Google Maps API Key for backend services
   ```

   *Note:* The `DB_CONNECT` URI can be adjusted if your MongoDB is elsewhere. The `JWT_SECRET` can be any random string (keep it secret!). The `GOOGLE_MAPS_API` key is needed for geocoding, distance, and autocomplete endpoints – you can skip it or leave it blank, but those features will not work without a valid API key.

4. **Install Backend Dependencies:** Open a terminal in the `Backend/` folder and run:

   ```bash
   npm install
   ```

   This will install all Node.js dependencies (Express, Mongoose, etc.).

5. **Start the Backend Server:** Still in the `Backend/` directory, start the server:

   ```bash
   npm run dev
   ```

   This uses Nodemon to run the server (or you can run `node server.js`). You should see a log confirming that the server is running on port 4000 and connected to the database. The backend API endpoints (e.g., [http://localhost:4000/users/login](http://localhost:4000/users/login)) are now ready.

6. **Frontend Configuration:** In the `frontend/` directory, create a **.env** file for the frontend. Add the following:

   ```bash
   # frontend/.env
   VITE_BASE_URL=http://localhost:4000        # Base URL of the backend API
   VITE_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>   # (Optional) Google Maps API Key for frontend map
   ```

   This ensures the React app knows where to send API requests. Use the same Google API key here if you have one (this is used by the map component to load maps). If you don't have a key, the live map will not display, but other functionalities can still be tested.

7. **Install Frontend Dependencies:** Open another terminal in the `frontend/` directory and run:

   ```bash
   npm install
   ```

   This will install React, Socket.io-client, Google Maps library, and other dependencies for the frontend.

8. **Start the Frontend App:** In the `frontend/` directory, run:

   ```bash
   npm run dev
   ```

   This will launch the Vite development server. By default, it will show the app at a local address (usually [http://localhost:5173](http://localhost:5173) or a similar port). The console will output the exact local URL – open that in your web browser. You should see the Uber Clone app's homepage loading.

9. **Verify Setup:** Once both backend and frontend are running, you can test the application:

   * You should be able to access the React app in your browser. From there, try creating a new User account and a Captain account.

## Usage Guide

After setting up, you can simulate a ride booking scenario as follows:

* **User Registration:** On the home page (or via the navigation), go to the **User Sign Up** page and create a new user account. Provide a first name, email, and password (the app requires a valid email format and a password ≥6 characters). After registering, log in as the user. The user interface will allow you to enter a pickup location and destination.

* **Captain Registration:** Open another browser window or an incognito session (to simulate a separate device for the driver). Navigate to the **Captain Sign Up** page and register a driver account. You’ll need to input the driver’s name, email, password, and vehicle details (vehicle color, license plate, capacity, and type – e.g., car, motorcycle, or auto rickshaw). Log in as the captain after registering. The captain’s interface will show a home screen (and may start sending location updates if you allow location access).

* **Requesting a Ride (User):** In the user’s browser, enter a pickup location and a destination in the provided fields. As you type, you should see address suggestions drop down (powered by the Google Places API) to auto-complete your address. Select the desired suggestion for both pickup and destination. Next, click the **"Find Trip"** or similar button. The app will call the backend to get a fare estimate for the trip. You’ll then be prompted to confirm the ride request (often via a panel showing fare and vehicle options). When you confirm, the ride is created and sent to the server.

* **Receiving a Ride Request (Captain):** Once the user requests a ride, any logged-in captain within range should receive an immediate notification of a new ride. In your captain’s browser window, a popup will appear with the ride details (pickup and destination addresses, fare, etc.), thanks to the real-time socket `"new-ride"` event. As the only active driver in this test, your captain account should receive the request.

* **Accepting the Ride (Captain):** The captain can choose to accept (confirm) the ride. Click the **Accept** (or similar) button on the ride popup. This triggers the backend **`/rides/confirm`** API, marking the ride as assigned to that captain. The captain’s UI may then show a confirmation screen.

* **Ride Confirmation (User):** As soon as the driver accepts, the user is notified in real-time that a driver has been assigned to their ride. The user’s interface will update (e.g., showing that a driver is on the way, and possibly the driver's details and vehicle information) without needing a page refresh. At this point, the user might see a status like "Driver is arriving" along with the car details (this information comes from the captain’s profile).

* **Live Tracking:** Once the ride is in progress (after the driver starts the ride), the user can view the **Live Tracking** map. The map (integrated via Google Maps) will show the driver’s current location in real time. As the driver moves, their app continually emits location updates to the server. In a complete implementation, the server would broadcast those updates to the user’s app; the user’s map marker would move to reflect the approaching driver. (Ensure you have provided location access in the browser for the captain app to enable geolocation tracking.)

* **Completing the Ride:** The captain can end the ride (usually after reaching the destination). In this app, the driver may need to enter a 6-digit OTP provided by the user to start or end the ride (simulating Uber’s security feature). When the ride is ended via **`/rides/end-ride`**, a **"ride-ended"** event is emitted to the user’s app. The user’s interface will update one final time, indicating the ride is complete (and possibly prompting for payment or feedback). The app will then return to a state where another ride can be requested.

**Note:** In a testing scenario with one user and one driver, you might want to open two separate browser sessions (or use one normal window and one incognito window) to keep the user and driver logged in simultaneously. This allows you to see the real-time interactions: when the user requests a ride, switch to the driver window to accept it, then watch the user window update with the driver’s status.

## Project Structure

The repository is divided into two main folders:

* **Backend/** - contains the Express server, route definitions, controllers, models, and services. Key files include:

  * `app.js` – initializes Express app and attaches route middleware for users, captains, rides, maps.
  * `routes/` – contains route files for each module (users, captains, rides, maps) defining the API endpoints (as described above).
  * `controllers/` – contains logic for handling requests (e.g., `ride.controller.js` processes ride creation, confirmation, etc.).
  * `services/` – contains helper modules (e.g., `maps.service.js` for external API calls to Google Maps).
  * `socket.js` – sets up the Socket.io server and defines event handlers for real-time communication.
  * `models/` – defines MongoDB schemas for User, Captain, Ride, etc., including any schema-level logic (like geolocation fields for captains).
  * `middlewares/` – includes authentication middleware to protect routes by validating JWTs for users or captains.
  * `db/db.js` – MongoDB connection logic (reads the `DB_CONNECT` string and connects via Mongoose).

* **frontend/** - contains the React application (bootstrapped with Vite). Notable parts:

  * `src/pages/` – React components for different pages (Home, UserLogin, UserSignup, CaptainLogin, CaptainSignup, CaptainHome, Riding, etc.). For example, `Home.jsx` is the user’s main dashboard for requesting rides, and `CaptainHome.jsx` is the driver’s dashboard.
  * `src/components/` – Reusable components like **LocationSearchPanel** (for showing autocomplete suggestions), **VehiclePanel/ConfirmRide** (for selecting vehicle type and confirming ride), **RidePopUp/ConfirmRidePopUp** (driver’s popup to accept rides), and **LiveTracking** (Google Map component for tracking).
  * `src/context/` – Context providers for managing global state, such as `UserContext`, `CaptainContext` (to store logged-in user or captain info) and `SocketContext` (providing a socket connection instance to the app).
  * `SocketContext.jsx` – Establishes the Socket.io client connection to the backend (using the base URL) and provides the socket to components.
  * `index.css` & **Tailwind config** – Sets up Tailwind CSS. The React app’s JSX uses Tailwind utility classes for styling (e.g., classes like `h-screen`, `bg-white`, `text-xl` for layout and design).

## Conclusion

This Uber Clone MERN application demonstrates a range of features including authentication for multiple user roles, real-time communication, mapping, and CRUD operations typical of a ride-hailing service. By following the setup instructions, you can run the app locally and explore the end-to-end flow of booking a ride and completing it. Feel free to explore the code to see how each feature is implemented, and modify or extend the project for your own learning purposes. Enjoy testing the Uber Clone!
