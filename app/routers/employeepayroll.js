const employeespayroll = require('../controllers/employee.js');

module.exports = (app) => {
    // Create a new employeespayroll
    app.post('/add', employeespayroll.create);

    // Retrieve all employeespayroll
    app.get('/', employeespayroll.findAll);

    // Retrieve a single employeespayroll with employeeId
    app.get('/:employeepayrollId', employeespayroll.findOne);

    // Update a employeespayroll with employeeId
    app.put('/update/:employeepayrollId', employeespayroll.update);

    // Delete a employeespayroll with employeeId
    app.delete('/delete/:employeepayrollId', employeespayroll.delete);
}