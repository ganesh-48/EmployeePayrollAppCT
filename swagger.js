const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Employee Schema',
        description: 'Employee Registration',
    },
    host: 'localhost:5500',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/routers/employeepayroll.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);