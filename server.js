const express = require('express');

// Configuring the database
const dbConfig = require('./config/database.js');
require("dotenv").config();
dbConfig();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Employee Payroll Application." });
});

// Require employee payroll routes
require('./app/routers/employeepayroll.js')(app);

// listen for requests
app.listen(process.env.port, () => {
    console.log("Server is listening on port:", process.env.port);
});