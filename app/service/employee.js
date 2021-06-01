const employeeDetails = require("../models/employeepayroll.js");
const { genSaltSync, hashSync } = require("bcrypt");

class RegisterService {

    /**
    * @description Create method and save the employee data and password aslo  encrypts 
    * @param employeeData is data sent from Controller
    * @return callback is used to callback Controller
    */
    create = (employeeData, callBack) => {
        const salt = genSaltSync(10);
        employeeData.password = hashSync(employeeData.password, salt);
        employeeDetails.create(employeeData, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);            
            /*if (error)
                return callBack(error, null);
            return callBack(null, data)*/
        })
    }

     /**
    * @description retrive all the employee data
    * @return callback is used to callback Controller 
    */
    findAll = (callBack) => {
        employeeDetails.findAll((error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error)
                return callBack(error, null);
            return callBack(null, data)*/
        })
    }

    /**
    * @description retrive employee data
    * @return callback is used to callback Controller 
    */
    findById = (employeeDataId, callBack) => {
        employeeDetails.findById(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error)
                return callBack(error, null);
            return callBack(null, data)*/
        })
    }

     /**
    * @description Find employee data by id and save the employee data and password aslo  encrypts
    * @param newData is data sent from Controller
    * @return callback is used to callback Controller
    */
    findByIdAndUpdate = (newData, employeeDataId, callBack) => {
        employeeDetails.findByIdAndUpdate(newData, employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error)
                return callBack(error, null);
            return callBack(null, data)*/
        })
    }

     /**
    * @description delete employee data using employee id
    * @return callback is used to callback Controller
    */
    findByIdAndRemove = (employeeDataId, callBack) => {
        employeeDetails.findByIdAndRemove(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error)
                return callBack(error, null);
            return callBack(null, data);*/
        })
    }
}

module.exports = new RegisterService();