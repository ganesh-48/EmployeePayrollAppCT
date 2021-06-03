require('dotenv').config();
const mongoose = require('mongoose');
//const url = 'mongodb://localhost:27017/employees';

module.exports = () => {

    mongoose.Promise = global.Promise;

    return mongoose.connect(process.env.databaseurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Databse is Connected successfully");
    }).catch(error => {
        console.log("Error, Database connection is failed", error);
        process.exit();
    });
}
