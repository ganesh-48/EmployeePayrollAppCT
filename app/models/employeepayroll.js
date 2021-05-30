const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String
}, {
    timestamps: true
});

const EmployeePayroll = mongoose.model('Employee', EmployeeSchema);

class EmployeeModel {
    create = (employeeData, callBack) => {
        const employeepayroll = new EmployeePayroll({
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            emailId: employeeData.emailId,
            password: employeeData.password
        });

        employeepayroll.save({}, (error, data) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, data);
        });
    }

}

module.exports = new EmployeeModel();