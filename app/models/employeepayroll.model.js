const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR =  10;

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required: true,
        validate : /^[A-Z]{1}[A-Za-z\\s]{1,}$/
    } ,
    lastName: {
        type : String,
        required: true,
        validate : /^[A-Z]{1}[A-Za-z\\s]{1,}$/
    } ,
    emailId: {
        type : String,
        required: true,
        validate :  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    } ,
    password: {
        type : String,
        required: true,
    }
}, {
    timestamps: true
});


EmployeeSchema.pre('save', function(next) {
    var employee = this;

    // only hash the password if it has been modified 
    if (!employee.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(employee.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            employee.password = hash;
            next();
        });
    });


});

EmployeeSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Employee', EmployeeSchema);