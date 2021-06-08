require("dotenv").config();
const express = require('express');
const dbConfig = require('./config/database.js');
const logger = require('./config/logger.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// create express app
const app = express();

// Connect to database
dbConfig();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Employee Payroll Application." });
});


// Require employee payroll routes
require('./app/routers/employeepayroll.js')(app);

// listen for requests
module.exports =
    app.listen(process.env.port, () =>
        logger.info("Server is listening on port " + process.env.port));
