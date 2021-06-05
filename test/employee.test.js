const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
const service = require('../app/service/employee');
chai.should();
chai.use(chaiHttp);
var except = require('chai').expect;
var request = require('supertest');

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employee = JSON.parse(rawdata);

describe('POST/userlogin', () => {
    it('It should POST new user login employee data', (done) => {
        const employeeData = employee.Data1;
        chai.request(server)
            .post('/userlogin')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("User Login Successfull!!");
                res.body.should.be.property('token');
            done();
            });
    });

    it('It should POST new user login employeeData1and return status 404', (done) => {
        const employeeData1 = employee.Data2;
        chai.request(server)
            .post('/userlogin')
            .send(employeeData1)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.be.property('success').eq(false);
            done();
            });
    });
});