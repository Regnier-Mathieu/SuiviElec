"use strict";
// Dependencies
let express     = require('express');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');
let session     = require('express-session');
let config      = require ('../config/config');
let app         = express();

// Template
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'kfhkhkgfkgfkhgjdkdkk',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(require('./middlewares/flash'));

// Database
mongoose.connect('mongodb://localhost/SuiviElec');

// Routes
require('./routes/routesIndex')(app);
require('./routes/routesConfig')(app);

//server
app.listen(config.port);

console.log("Let's go on localhost:" + config.port);