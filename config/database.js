require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {

    mongoose.Promise = global.Promise;

    return mongoose.connect(process.env.databaseurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    }).then(() => {
        console.log("Databse is Connected successfully");
    }).catch(error => {
        console.log("Error, Database connection is failed", error);
        process.exit();
    });
}
