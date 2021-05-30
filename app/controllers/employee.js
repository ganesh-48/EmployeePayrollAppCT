const EmployeePayroll = require('../models/employeepayroll.js');
const data = require('../validation/employee.js');
const { genSaltSync, hashSync } = require("bcrypt");
const service = require('../service/employee.js');

class EmployeeDetails {
    // Create and Save a employee data
    create = (req, res) => {

        var result = data.validate(req.body);
        console.log("result");
        if (result.error) {
            return res.status(400).send({
                message: result.error.details[0].message
            });
        }

        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);

        let employeeData = req.body;
        service.create(employeeData, (error, data) => {
            if (error) {
                return res.status(500).send({
                    message: "Some data is "
                })
            }
            res.send({
                message: "Employee data is added successfully in database!",
                data: data
            })
        })
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
}
module.exports = new EmployeeDetails();