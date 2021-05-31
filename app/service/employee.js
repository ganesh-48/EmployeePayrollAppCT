const employeeDetails = require("../models/employeepayroll.js");
const { error } = require("../validation/employee.js");

class RegisterService {

    /**
     * @description Create and save employee data then send a response to controller
     * @method Save is used to save employee data
     * @param callBack is the callBack to controller
     */
    create = (employeeData, callBack) => {
        employeeDetails.create(employeeData, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data)
        })
    }

    /**
     * @description Find all the  employee data then return a response to controller
     * @method find is used to retrive employee data
     * @param callBack is the callBack to controller
     */
    findAll = (callBack) => {
        employeeDetails.findAll((error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data)
        })
    }

    /**
     * @description find employee data by id and  response to controller
     * @method findById is used to find employee data by id
     * @param callBack is the callBack to controller
     */
    findById = (employeeDataId, callBack) => {
        employeeDetails.findById(employeeDataId, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data)
        })
    }

    /**
     * @description find employee data by id and update that data and response to controller
     * @method findByIdAndUpdate is used  newData to retrive employee data by id and update
     * @param callBack is the callBack to controller
     */
    findByIdAndUpdate = (newData, employeeDataId, callBack) => {
        employeeDetails.findByIdAndUpdate(newData, employeeDataId, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data)
        })
    }

    /**
       * @description find employee data by id and delete that data and response to controller
       * @method findByIdAndDelete is used  find  to  employee data by id and delete
       * @param callBack is the callBack to controller
       */
    findByIdAndRemove = (employeeDataId, callBack) => {
        employeeDetails.findByIdAndRemove(employeeDataId, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        })
    }
}

module.exports = new RegisterService();