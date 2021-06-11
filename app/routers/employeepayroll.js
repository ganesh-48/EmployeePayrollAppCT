const employeeDetails = require('../controllers/employee.js');
const { checkToken } = require('../middleware/helper.js');

module.exports = (app) => {

    // Create a new employeeDetails
    app.post('/addemployeedata', employeeDetails.create);

    // Retrieve all employeeDetails
    app.get('/getallemployeedata', checkToken, employeeDetails.findAllUsersData);

    // Retrieve a single employeeDetails with employeeId
    app.get('/findemployeedata/:employeepayrollId', checkToken, employeeDetails.findOneUserData);

    // Update a employeeDetails with employeeId
    app.put('/updateemployeedata/:employeepayrollId', checkToken, employeeDetails.updateUserData);

    // Delete a employeeDetails with employeeId
    app.delete('/deleteemployeedata/:employeepayrollId', checkToken, employeeDetails.deleteUserData);

    //Userlogin with a emailId and password
    app.post('/userlogin', employeeDetails.login);
}