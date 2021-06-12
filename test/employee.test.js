const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employeeInput = JSON.parse(rawdata);

describe('POST/userlogin', () => {
    it('givenEmployeeData_whenUserLogin_shouldReturnStatus200AndSuccess=true', (done) => {
        const employeeData = employeeInput.UserLoginPos;
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

    it('givenEmployeeData_whenUserLoginWrong_shouldReturnStatus400AndSuccess=false', (done) => {
        const employeeData = employeeInput.UserLoginNeg;
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

describe('POST/add/employee', () => {
    it('givenEmployeeData_whenAdded_shouldReturnStatus=200AndSuccess=true', (done) => {
        const employeeData = employeeInput.EmployeeRegistrationPos;
        chai.request(server)
            .post('/add/employee')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("Employee data is added successfully in database!");
                done();
            });
    });

    it('givenEmployeeData_whenAddedWrong_shouldReturnStatus=400AndSuccess=false', (done) => {
        const employeeData = employeeInput.EmployeeRegistrationNeg;
        chai.request(server)
            .post('/add/employee')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.property('success').eq(false);
                res.body.should.be.property('message')
                done();
            });
    });
});

let token = '';
console.log(token);
beforeEach(done => {
    chai
        .request(server)
        .post("/userlogin")
        .send(employeeInput.UserLoginPos)
        .end((error, res) => {
            token = res.body.token;
            res.should.have.status(200);
            done();
        });
});

describe("/GET /getallemployee", () => {

    it("givenValidToken_whenGetAllEmployeeData_shouldReturnStatus=200AndSuccess=true", done => {
        chai
            .request(server)
            .get("/getallemployee")
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true)
                res.body.should.have.property('message').eq("Getted all employees data!")
                res.body.should.have.property('data')
                done();
            });
    });

    it("givenInvalidToken_whenNotGetData_shouldReturnStatus=400AndSuccess=false", done => {
        chai
            .request(server)
            .get("/getallemployee")
            .set('Authorization', 'bearar ' + token.slice(10))
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq("Invalid token");
                done();
            });
    });

    it("givenEmptyToken_whenGetData_shouldReturnStatus=401AndSuccess=false", done => {
        var emptyToken = '';
        chai
            .request(server)
            .get("/getallemployee")
            .set('Authorization', emptyToken)
            .end((error, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq("Access denied! unauthorized user")
                done();
            });
    });
});


describe("/GET /findemployeedata/Id", () => {

    it("givenValidTokenAndEmployeeId_whenFind_shouldReturnStatus=200AndSuccess=true", done => {
        chai
            .request(server)
            .get("/findemployeedata/" + employeeInput.EmployeeGetSingleDataPos.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                done();
            });
    });

    it("givenValidTokenAndInvalidEmployeeId_whenFind_shouldReturnStatus=404AndSuccess=false", done => {

        chai
            .request(server)
            .get("/findemployeedata/" + employeeInput.EmployeeGetSingleDataNeg.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
    });
});

describe("/PUT /update/employeedata/Id", () => {
    it("givenValidTokenAndEmployeeData_whenUpdateUsingId_shouldReturnStatus=200AndSuccess=true", done => {
        const employeeData = employeeInput.EmployeeRegistrationPos;
        chai
            .request(server)
            .put("/update/employeedata/" + employeeInput.EmployeeGetSingleDataPos.Id)
            .set('Authorization', 'bearar ' + token)
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("givenValidTokenAndWrongEmployeeData_whenUpdateUsingId_shouldReturnStatus=404AndSuccess=false", done => {
        const employeeData = employeeInput.EmployeeRegistrationPos;
        chai
            .request(server)
            .put("/update/employeedata/" + employeeInput.EmployeeGetSingleDataNeg.Id)
            .set('Authorization', 'bearar ' + token)
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq(" Employee payroll id not found ");
                done();
            });
    });
});

describe("/delete/employeedata/Id", () => {

    it("givenValidTokenAndEmployeeData_whenDeleteUsingId_shouldReturnStatus=200AndSuccess=true", done => {
        chai
            .request(server)
            .delete("/delete/employeedata/" + employeeInput.EmployeeGetSingleDataPos.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("givenValidTokenAndWrongEmployeeData_whenDeleteUsingId_shouldReturnStatus=404AndSuccess=false", done => {
        chai
            .request(server)
            .delete("/delete/employeedata/" + employeeInput.EmployeeGetSingleDataNeg.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });

});