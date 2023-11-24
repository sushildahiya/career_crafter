// Importing required modules and setting up the Express app
const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/mongoose');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// Serving static files from the 'assets' directory
app.use(express.static(path.join(__dirname, 'assets')));

// Setting up the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayout);

// Serving uploaded files from the 'uploads' directory
app.use('/uploads', express.static(__dirname + '/uploads'));

// Parsing incoming requests with body-parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Setting up session middleware for user authentication
app.use(session({
    name: 'career_crafter',
    secret: 'crafter', // Use a strong, random key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

// Initializing and configuring Passport for user authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Routing middleware for handling different routes
app.use('/', require('./routes'));

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
