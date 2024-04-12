// Require necessary modules
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const fs = require("fs");
const db = require('./config/mongoose');
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
//Requires the Connect Flash Module
const flash = require("connect-flash");
const passport = require("passport");
const dotenv = require("dotenv");
const customMiddleware = require("./config/middleware");

const passportLocal = require("./config/passport-local-strategy");
//Requires the Passport Google OAuth-2 Strategy used for the Authentication
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const { v4: uuidv4 } = require("uuid");

// Load environment variables from .env file
dotenv.config();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'assets')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session middleware
app.use(
	session({
		name: "Placify",
		secret: process.env.session_cookie_key,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//Middleware - Uses the Flash Message just after the Session Cookie is set
app.use(flash());
//Middleware - Uses the Custom Middleware to set the Flash Message in the Response
app.use(customMiddleware.setFlash);
app.use(customMiddleware.createFolders);

// Use express router
app.use('/', require('./routes'));

// Start the server
app.listen(port, function (err) {
	if (err) {
		console.log(err, "There is some error in listen");
		return;
	}
	console.log('server is running on port', port);
});
