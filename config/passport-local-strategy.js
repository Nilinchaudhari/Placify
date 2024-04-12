//Require the Passport Library
const passport = require("passport");
//Require the Passport Local Strategy
const LocalStrategy = require("passport-local").Strategy;
//Require the Employee Model
const Employee = require("../models/employee");
//Require the Bcrypt Library
const bcrypt = require("bcryptjs");


//--Authentication using PassportJS--//
//PassportJS will use the Local Strategy function() to find the Employee who has signed in
passport.use(
    new LocalStrategy(
        {
            usernameField: "email", // Field used to identify the user (in this case, email)
            passReqToCallback: true, // Allows us to pass request object to the callback
        },
        async (req, email, password, done) => {
            try {
                // Find the user by email
                const employee = await Employee.findOne({ email: email });
                
                if (!employee) {
                    // User not found
                    console.log("User not found");
                    return done(null, false);
                }

                // Compare passwords
                const isMatch = await bcrypt.compare(password, employee.password);

                if (!isMatch) {
                    // 
                    console.log("Incorrect password");
                    return done(null, false);
                }

                // Authentication successful, return the user object
                console.log("Authentication successful");
                return done(null, employee);
            } catch (err) {
                // Error occurred during authentication
                console.error("Error occurred during authentication:", err);
                return done(err);
            }
        }
    )
);
//--Serializing the Employee to decide which key is to be kept in the cookies--//
passport.serializeUser((employee, done) => {
    //It automatically encrypts the Employee ID into the cookie, & sends it to the browser
    done(null, employee.id);
});

//--Deserializing the User from the key in the cookies--//
passport.deserializeUser((id, done) => {
    //It automatically decrypts the Employee ID from the cookie, & finds the Employee
    Employee.findById(id)
        .then(employee => {
            if (!employee) {
                console.log("User not found");
                return done(null, false);
            }
            return done(null, employee);
        })
        .catch(err => {
            console.error("Error in finding the Employee --> Passport ❌", err);
            return done(err);
        });
});

//Creating a middleware in passport.js
passport.checkAuthentication = function (req, res, next) {
    //If the Employee is signed in then let them have the profile page
    if (req.isAuthenticated()) return next();
    //If the Employee is not signed in, then redirect them back to the Login page
    return res.redirect("/signup");
};

//Creating a middleware in passport.js
passport.setAuthenticatedUser = function (req, res, next) {
    //Whenever a Employee is signed in, then that Employee's info is available in req.user
    if (req.isAuthenticated()) res.locals.user = req.user;
    //req.user contains the current signed in user from the session cookie
    next();
};

exports.isAuthenticated =(req, res, next) =>{
    if (req.user) return next();
}

//Export the Passport Module
module.exports = passport;
