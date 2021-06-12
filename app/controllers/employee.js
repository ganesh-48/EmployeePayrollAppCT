const data = require('../middleware/validation.js');
const service = require('../service/employee.js');

class EmployeeDetails {
   
     /**
     * @description Create and save the employee data after validation
     * @param req is request sent from http
     * @param res is used to send the response
     */
    create = (req, res) => {

        var result = data.validate(req.body);
        if (result.error) {
            return res.status(400).send({
                success:false,
                message: result.error.details[0].message
            });
        }

        let employeeData = req.body;
        service.create(employeeData, (error, data) => {
            if (error) {
                return res.status(500).send({
                   success: false,
                    message:  "some error is occurred!"
                })
            }
            res.status(200).send({
                success: true,
                message:  "Employee data is added successfully in database!",
                data:  data
            })
        })
    };

    /**
     * @description find all the employee data
     * @param req is request sent from http
     * @param res is used to send the response
     */
    findAllUsersData = (req, res) => {
        service.findUsersAllData( (error, data) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message:  "some error is occurred!"
                })
            }
            res.send({
                success: true, 
                message:  "Getted all employees data!",
                data:  data
            })
        })
    }

     /**
     * @description find one the employee data using employee id
     * @param req is request sent from http
     * @param res is used to send the response
     */
    findOneUserData = (req,res) => {
        let employeeDataId = req.params.employeepayrollId;
        service.findUserid(employeeDataId, (error,data) => {
            if(error) {
                return res.status(404).send({
                    success: false,
                    message: "some error is occurred"
                })
            }
            res.send({
                success:true,
                data:  data
            })
        })
    }

    /**
      * @description update employee data by using employee id after the data validation
      * @param req is request sent from http
      * @param res is used to send the response
      */
    updateUserData = (req, res) => {
        let employeeDataId = req.params.employeepayrollId;
        service.findUserIdAndUpdate(req.body,employeeDataId, (error,data) => {
            if(error) {
                return res.status(404).send({
                    success: false,
                    message: " Employee payroll id not found "
                })
            }
            res.send({
                success: true,
                data: data
            })
        })
    }

    /**
     * @description find the one employee data using employee id and delete employee data
     * @param req is request sent from http
     * @param res is used to send the response
     */
    deleteUserData = (req, res) => {
        let employeeDataId = req.params.employeepayrollId;
        service.findUserIdAndRemove(employeeDataId, (error, data) => {
            if(error) {
                return res.status(404).send({
                    success: false,
                    message: "Employee Id not found"
                })
            }
            res.send({
                success: true,
                data: data
            })
        })
    }

    /**
     * @description login the employee data using correct employee details
     * @param req sent from http having emailId and password
     * @param res is send the response
     */
    login = (req, res) => {
        let userloginData = req.body;
        service.checkLogin(userloginData, (error, data) =>{
            if(error) {
                return res.status(404).send({
                    success : false,
                    message: error
                })
            }
            res.status(200).send({
                success : true,
                message : "User Login Successfull!!",
                token : data
            });
        })
    }
}

module.exports = new EmployeeDetails();