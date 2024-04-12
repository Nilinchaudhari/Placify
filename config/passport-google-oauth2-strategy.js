//Require the Passport Module
const passport = require("passport");
//Require the Passport Google OAuth-2 Strategy from the Passport Google OAuth Module
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
//Require the Crypto Module
const crypto = require("crypto");
//Require the BCryptJS Module
const bcrypt = require("bcryptjs");
//Require the Employee Model
const Employee = require("../models/employee");

//Require the Path Finder Middleware
const { pathFinder } = require("./middleware");

require('dotenv').config();




//Use Passport to Use the Google OAuth-2 Strategy
passport.use(
	new googleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let employee = await Employee.findOne({
					email: profile.emails[0].value,
				});
				if (employee) return done(null, employee);
				//Password Hashing
				const password = crypto.randomBytes(20).toString("hex");
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				//Create a New Employee
				employee = await Employee.create({
					name: profile.displayName,
					email: profile.emails[0].value,
					password: hashedPassword,
					avatarPath: pathFinder("images/empty-avatar.png"),
				});
				return done(null, employee);
			} catch (error) {
				
				return done(error);
			}
		}
	)
);

module.exports = passport;