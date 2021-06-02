const data = require('../validation/employee.js');
const service = require('../service/employee.js');

class EmployeeDetails {
   
     /**
     * @description Create and save the employee data after validation
     * @param req is request sent from http
     * @param res is used to send the response
     */
    create = (req, res) => {

        var result = data.validate(req.body);
        console.log("result");
        if (result.error) {
            return res.status(400).send({
                message: result.error.details[0].message
            });
        }

        let employeeData = req.body;
        service.create(employeeData, (error, data) => {
            if (error) {
                return res.status(500).send({
                    message:  "some error is occurred!"
                })
            }
            res.send({
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
    findAll = (req, res) => {
        service.findAll( (error, data) => {
            if (error) {
                return res.status(404).send({
                    message:  "some error is occurred!"
                })
            }
            res.send({
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
    findOne = (req,res) => {
        let employeeDataId = req.params.employeepayrollId;
        service.findById(employeeDataId, (error,data) => {
            if(error) {
                return res.status(404).send({
                    message: "some error is occurred"
                })
            }
            res.send({
                data:  data
            })
        })
    }

    /**
      * @description update employee data by using employee id after the data validation
      * @param req is request sent from http
      * @param res is used to send the response
      */
    update = (req, res) => {
        let employeeDataId = req.params.employeepayrollId;
        service.findByIdAndUpdate(req.body,employeeDataId, (error,data) => {
            if(error) {
                return res.status(404).send({
                    message: " Employee payroll id not found "
                })
            }
            res.send({
                data: data
            })
        })
    }

    /**
     * @description find the one employee data using employee id and delete employee data
     * @param req is request sent from http
     * @param res is used to send the response
     */
    delete = (req, res) => {
        let employeeDataId = req.params.employeepayrollId;
        service.findByIdAndRemove(employeeDataId, (error, data) => {
            if(error) {
                return res.status(500).send({
                    message: "Employee Id not found"
                })
            }
            res.send({
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
        service.checkLogin(req.body, (error, data) =>{
            if(error) {
                return res.status(404).send({
                    message: "User login Details are not found!!"
                })
            }
            res.send({
                data: data
            })
        })
    }
}

module.exports = new EmployeeDetails();
    /*
                //create an object 
                const employeepayroll = new EmployeePayroll({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailId: req.body.emailId,
                    password: req.body.password
                });
        
                employeepayroll.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the employee payroll."
                        });
                    });
            };
        
        // Retrieve and return all employee payroll from the database.
        findAll = (req, res) => {
            EmployeePayroll.find()
                .then(employeespayroll => {
                    res.send(employeespayroll);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving employee payroll data."
                    });
                });
        };

        // Find a single employee payroll by employeepayrollId
        findOne = (req, res) => {
            EmployeePayroll.findById(req.params.employeepayrollId)
                .then(employeepayroll => {
                    if (!employeepayroll) {
                        return res.status(404).send({
                            message: " Employee payroll id not found " + req.params.employeepayrollId
                        });
                    }
                    res.send(employeepayroll);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Employee payroll id not found " + req.params.employeepayrollId
                        });
                    }
                    return res.status(500).send({
                        message: "Employee payroll id not found " + req.params.employeepayrollId
                    });
                });
        };

        // Update a employee payroll identified by the employeepayrollId in the request
        update = (req, res) => {
            // Validate Request
            var result = data.validate(req.body);
            console.log("result");
            if (result.error) {
                return res.status(400).send({
                    message: result.error.details[0].message
                });
            }

            // Find note and update it with the request body
            EmployeePayroll.findByIdAndUpdate(req.params.employeepayrollId, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                password: req.body.password
            }, { new: true })
                .then(employeepayroll => {
                    if (!employeepayroll) {
                        return res.status(404).send({
                            message: "Employee payroll id not found " + req.params.employeepayrollId
                        });
                    }
                    res.send(employeepayroll);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Employee payroll id not found " + req.params.employeepayrollId
                        });
                    }
                    return res.status(500).send({
                        message: "Employee payroll id not found " + req.params.employeepayrollId
                    });
                });
        };

        // Delete a employee payroll with the specified employeepayrollId in the request
        delete = (req, res) => {
            EmployeePayroll.findByIdAndRemove(req.params.employeepayrollId)
                .then(employeepayroll => {
                    if (!employeepayroll) {
                        return res.status(404).send({
                            message: "Employee payroll id not found " + req.params.employeepayrollId
                        });
                    }
                    res.send({ message: "employeepayroll data deleted successfully!" });
                }).catch(err => {
                    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                        return res.status(404).send({
                            message: "Employee payroll id not found " + req.params.employeepayrollId
                        });
                    }
                    return res.status(500).send({
                        message: "Could not delete employee payroll data with id " + req.params.employeepayrollId
                    });
                });
        };
*/