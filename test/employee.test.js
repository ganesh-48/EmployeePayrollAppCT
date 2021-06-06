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

let token='';
beforeEach(done => {
    chai
        .request(server)
        .post("/userlogin")
        .send(employeetest.Data1)
        .end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
        done();
        });
});

describe("/GET /getdata", () => { 
    
    it("it should fetch all employeeData successfully with valid token ", done => {
        chai
            .request(server)
            .get("/getdata")
            .set('Authorization', 'bearar ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eq("Getted all employees data!")
                res.body.should.have.property('data')
            done();
            });
    });

    it("it should not fetch all employeeData with invalid valid token", done => {
        chai
            .request(server)
            .get("/getdata")
            .set('Authorization', 'bearar ' + token.slice(10))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq("Invalid token");
            done();
            });
    });

    it("it should not fetch all employeeData with empty token ", done => {
        var emptyToken='';
        chai
            .request(server)
            .get("/getdata")
            .set('Authorization', emptyToken)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq("Access denied! unauthorized user")
            done();
            });
    });
});


describe("/GET /find/Id", () => { 
    
    it("it should give employeeData successfully with valid token and Object Id", done => {
        chai
            .request(server)
            .get("/find/"+employeetest.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
            done();
            });
    });

    it("it not should give employeeData  with valid token and invalid and Object Id ", done => {
        
        chai
            .request(server)
            .get("/find/"+employeetest.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });
});