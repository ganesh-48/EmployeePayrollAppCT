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
            /*if (error) {
                return callBack(error, null);
            }
            return callBack(null, data);*/
        });
    }

    /**
    * @description retrive all the employee data from MongoDB
    * @return callback is used to callback Services
    */
    findAll = (callBack) => {
        EmployeePayroll.find({}, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error) {
                return callBack(error, null);
            } else {
                return callBack(null, data);
            }*/
        })
    };

    /**
   * @description retrive the employee data using a employee id from MongoDB
   * @return callback is used to callback Service
   */
    findById = (employeeDataId, callBack) => {
        EmployeePayroll.findById(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error) {
                return callBack(error, null);
            } else {
                return callBack(null, data);
            }*/
        })
    }

    /**
     * @description Update the employee data by using a employee id
     * @param oldemployee_Id, NewData
     * @return callback is used to callback Service
     */
    findByIdAndUpdate = (newData, employeeDataId, callBack) => {
        EmployeePayroll.findByIdAndUpdate(employeeDataId, {
            firstName: newData.firstName,
            lastName: newData.lastName,
            emailId: newData.emailId,
            password: newData.password
        }, { new: true }, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error) {
                return callBack(error, null);
            } else {
                return callBack(null, data);
            }*/
        })
    }

    /**
        * @description delete the employee data using a employee id from MongoDB
        * @return callback is used to callback Service     
    */
    findByIdAndRemove = (employeeDataId, callBack) => {
        EmployeePayroll.findByIdAndRemove(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error) {
                return callBack(error, null);
            } else {
                return callBack(null, data);
            }*/
        })
    }
}



module.exports = new EmployeeModel();