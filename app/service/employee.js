const employeeDetails = require("../models/employeepayroll.js");
const { genSaltSync, hashSync } = require("bcrypt");
const { sign }= require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

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
    findUsersAllData = (callBack) => {
        employeeDetails.findUsersAllData((error, data) => {
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
    findUserid = (employeeDataId, callBack) => {
        employeeDetails.findUserid(employeeDataId, (error, data) => {
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
      findUserIdAndUpdate = (newData, employeeDataId, callBack) => {
        employeeDetails.findUserIdAndUpdate(newData, employeeDataId, (error, data) => {
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
    findUserIdAndRemove = (employeeDataId, callBack) => {
        employeeDetails.findUserIdAndRemove(employeeDataId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
            /*if (error)
                return callBack(error, null);
            return callBack(null, data);*/
        })
    }

    /**
    * @description checklogin  of user using emailId and password
    * @param userloginData need a correct emailId and password
    * @return callback is used to callback collector
    */
    checkLogin = (userloginData, callBack) => {
        employeeDetails.checkLogin(userloginData, (error, data) => {
            //return (error) ? callBack(error, null) : callBack(null, data);
            let result=null;
            if (error) {
                return callBack(error, null);
            }
            else if (result=bcrypt.compareSync(userloginData.password, data.password)) {
                data.password = undefined;
                const jsontoken = sign({ result: data }, process.env.jwt, { expiresIn: "2h" });
                //return (!jsontoken) ? callback("Something went wrong while generating JWT", null) : callback(null, jsontoken)
                return callBack(null, jsontoken);
            }
            return callBack("Invalid userlogindata", null);
        })
    }
}

module.exports = new RegisterService();