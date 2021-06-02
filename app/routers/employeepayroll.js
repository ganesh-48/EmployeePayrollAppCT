const employeeDetails = require('../controllers/employee.js');

module.exports = (app) => {
    
    // Create a new employeeDetails
    app.post('/add', employeeDetails.create);

    // Retrieve all employeeDetails
    app.get('/getdata', employeeDetails.findAll);

    // Retrieve a single employeeDetails with employeeId
    app.get('/find/:employeepayrollId', employeeDetails.findOne);

    // Update a employeeDetails with employeeId
    app.put('/update/:employeepayrollId', employeeDetails.update);

    // Delete a employeeDetails with employeeId
    app.delete('/delete/:employeepayrollId', employeeDetails.delete);

    //Userlogin with a emailId and password
    app.get('/userlogin', employeeDetails.login);
}