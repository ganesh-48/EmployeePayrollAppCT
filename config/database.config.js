const mongoose = require('mongoose');

module.exports = () => {
    const url = 'mongodb://localhost:27017/employeeInfo';

    mongoose.Promise = global.Promise;

    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Databse is Connected successfully");
    }).catch(error => {
        console.log("Error, Database connection is failed", error);
        process.exit();
    });
}