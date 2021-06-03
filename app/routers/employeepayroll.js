const employeeDetails = require('../controllers/employee.js');
const { checkToken } = require('../../authentication/authentication.js');

module.exports = (app) => {
    
    // Create a new employeeDetails
    app.post('/add', checkToken, employeeDetails.create);

    // Retrieve all employeeDetails
    app.get('/getdata', checkToken, employeeDetails.findAll);

    // Retrieve a single employeeDetails with employeeId
    app.get('/find/:employeepayrollId', checkToken, employeeDetails.findOne);

    // Update a employeeDetails with employeeId
    app.put('/update/:employeepayrollId', checkToken, employeeDetails.update);

    // Delete a employeeDetails with employeeId
    app.delete('/delete/:employeepayrollId', checkToken, employeeDetails.delete);

    //Userlogin with a emailId and password
    app.post('/userlogin', employeeDetails.login);
}