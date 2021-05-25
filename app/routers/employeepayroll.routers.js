module.exports = (app) => {
    const employeespayroll = require('../controllers/employee.controllers.js');

    // Create a new employeespayroll
    app.post('/employeespayroll', employeespayroll.create);

    // Retrieve all employeespayroll
    app.get('/employeespayroll', employeespayroll.findAll);

    // Retrieve a single employeespayroll with employeepayroll
    app.get('/employeespayroll/:employeespayrollId', employeespayroll.findOne);

    // Update a employeespayroll with employeepayroll
    app.put('/employeespayroll/:employeepayrollId', employeespayroll.update);

    // Delete a employeespayroll with employeepayroll
    app.delete('/employeespayroll/:employeepayrollId', employeespayroll.delete);
}