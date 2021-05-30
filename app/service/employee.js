const employeeDetails = require("../models/employeepayroll.js");

class RegisterService {

    create = (employeeData, callBack) => {
          employeeDetails.create( employeeData,(error,data) => {
                if(error) 
                    return callBack(error,null);
                return callBack(null,data)
          })
    }
}

module.exports = new RegisterService();