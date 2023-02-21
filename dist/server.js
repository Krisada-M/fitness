"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const process_1 = require("process");
const booking_controller_1 = require("./controllers/booking.controller");
const package_controller_1 = require("./controllers/package.controller");
const user_controller_1 = require("./controllers/user.controller");
const database = require("./database/data-source");
// Initial
database.connect();
const app = express();
const port = process_1.env.PORT;
app.use(express.json());
// END Initial
// Init route
app.get("/", (_, res) => {
    res.status(200).json({ msg: "Fitness API Start" });
});
// User routes --------------------------
// Create user
app.post("/register", user_controller_1.createUsers);
// Update user
app.post("/update/:userID", user_controller_1.updateUsers);
// Login user
app.post("/login", user_controller_1.loginUser);
// Get all users
app.get("/users", user_controller_1.allUsers);
// Get profile user
app.get("/get-profile/:userID", user_controller_1.getProfileUser);
// Update status user after choose package
app.post("/select-package/:userID", user_controller_1.userSelectPackage);
// User booking
app.post("/booking/:userID", user_controller_1.userBooking);
// END user routes ----------------------
// Booking routes -----------------------
// Get all trainer booking
app.get("/t-booking", booking_controller_1.allTrainerBooking);
// Get all class booking
app.get("/c-booking", booking_controller_1.allClassBooking);
// END Booking routes -------------------
// Package routes -----------------------
// Get all package
app.get("/package", package_controller_1.allPackage);
// Add new package
app.post("/add-package", package_controller_1.addPackage);
// END Package routes -------------------
// Express start
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
