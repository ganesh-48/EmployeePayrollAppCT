module.exports = (app) => {
    const employeepayroll = require('../controllers/employee.controllers.js');

    // Create a new employeepayroll
    app.post('/employeepayroll/add/', employeepayroll.create);

    // Retrieve all employeepayroll
    app.get('/employeepayroll/', employeepayroll.findAll);

    // Retrieve a single employeepayroll with employeeId
    app.get('/employeepayroll/:employeepayrollId', employeepayroll.findOne);

    // Update a employeepayroll with employeeId
    app.put('/employeepayroll/update/:employeespayrollId', employeepayroll.update);

    // Delete a employeepayroll with employeeId
    app.delete('/employeepayroll/delete/:employeespayrollId', employeepayroll.delete);
}