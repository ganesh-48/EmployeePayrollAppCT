const employeeDetails = require("../models/employeepayroll.js");
const { error } = require("../validation/employee.js");

class RegisterService {

    create = (employeeData, callBack) => {
          employeeDetails.create( employeeData,(error,data) => {
                if(error) 
                    return callBack(error,null);
                return callBack(null,data)
          })
    }

    findAll = (callBack) => {
        employeeDetails.findAll((error,data) => {
            if(error)
                return callBack(error,null);
            return callBack(null,data)
        }) 
    }

    findById = (employeeDataId, callBack) => {
        employeeDetails.findById(employeeDataId, (error, data) => {
            if(error)
                return callBack(error, null);
            return callBack(null, data)
        })
    }

    findByIdAndUpdate = (newData,employeeDataId, callBack) => {
        employeeDetails.findByIdAndUpdate(newData,employeeDataId,(error,data) => {
              if(error) 
                  return callBack(error,null);
              return callBack(null,data)
        })
  }
}

module.exports = new RegisterService();