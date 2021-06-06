const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
const employee = require('../app/service/employee.js');
chai.should();
chai.use(chaiHttp);
var expect = require('chai').expect;
var request = require('supertest');

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employeetest = JSON.parse(rawdata);

describe('POST/userlogin', () => {
    it('It should POST new user login employee data', (done) => {
        const employeeData = employeetest.Data1;
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
        const employeeData = employeetest.Data2;
        chai.request(server)
            .post('/userlogin')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.be.property('success').eq(false);
                done();
            });
    });
});

describe('POST/add', () => {
    it('It should POST a  employee data', (done) => {
        const employeeData = employeetest.Data3;
        /*const employeeData = {
            firstName: "Shiv",
            lastName: "Sunder",
            emailId: "shivsunder@gmail.com",
            password: "Sunder@345"
        };*/
        chai.request(server)
            .post('/add')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("Employee data is added successfully in database!");
                done();
            });
    });

    it('It should POST a  employee data', (done) => {
        const employeeData = employeetest.Data4;
        /*const employeeData = {
            firstName: "Shiv",
            lastName: "Sunder",
            emailId: "shivsunder@gmail.com"
        };*/
        chai.request(server)
            .post('/add')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.property('success').eq(false);
                res.body.should.be.property('message')
            done();
            });
    });
});