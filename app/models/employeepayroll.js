const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[A-Z]{1}[A-Za-z\\s]{1,}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[A-Z]{1}[A-Za-z\\s]{1,}$/
    },
    emailId: {
        type: String,
        required: true,
        createIndexes: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const EmployeePayroll = mongoose.model('Employee', EmployeeSchema);

class EmployeeModel {

    /**
   * @description Create method  to save the employee data
   * @param employeeData is  sent from Service
   * @return callback is used to callback Service
   */
    create = (employeeData, callBack) => {
        const employeepayroll = new EmployeePayroll({
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            emailId: employeeData.emailId,
            password: employeeData.password
        });

        employeepayroll.save({}, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }

    /**
    * @description retrive all the employee data from MongoDB
    * @return callback is used to callback Services
    */
    findUsersAllData = (callBack) => {
        EmployeePayroll.find({}, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        })
    };

    /**
   * @description retrive the employee data using a employee id from MongoDB
   * @return callback is used to callback Service
   */
    findUserid = (employeeDataId, callBack) => {
        EmployeePayroll.findById(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        })
    }

    /**
     * @description Update the employee data by using a employee id
     * @param oldemployee_Id, NewData
     * @return callback is used to callback Service
     */
    findUserIdAndUpdate = (newData, employeeDataId, callBack) => {
        EmployeePayroll.findByIdAndUpdate(employeeDataId, {
            firstName: newData.firstName,
            lastName: newData.lastName,
            emailId: newData.emailId,
            password: newData.password
        }, { new: true }, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        })
    }

    /**
        * @description delete the employee data using a employee id from MongoDB
        * @return callback is used to callback service file     
    */
    findUserIdAndRemove = (employeeDataId, callBack) => {
        EmployeePayroll.findByIdAndRemove(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        })
    }

    /**
    * @description checklogin  of user using emailId and password
    * @param userloginData need to enter correct emailId and password
    * @return callback is used to callback service
    */
    checkLogin = (userloginData, callBack) => {
        EmployeePayroll.findOne({ "emailId": userloginData.emailId }, (error, data) => {
            if (error) {
                return callBack(error, null);
            }
            return (!data) ? callBack("user doesn't exist", null) : callBack(null, data);
        })
    }
}

module.exports = new EmployeeModel();