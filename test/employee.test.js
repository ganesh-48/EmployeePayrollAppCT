const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employeetest = JSON.parse(rawdata);

describe('POST/userlogin', () => {
    it('given employee data when user login should return a status 200 and success=true', (done) => {
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

    it('given employee data when user login wrong should return a status 400 and  success=false', (done) => {
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
    it('given employee data when added should return a status = 200 and success = true', (done) => {
        const employeeData = employeetest.Data3;
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

    it('given employee data when added wrong should return status=400 and success=false', (done) => {
        const employeeData = employeetest.Data4;
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

let token = '';
console.log(token);
beforeEach(done => {
    chai
        .request(server)
        .post("/userlogin")
        .send(employeetest.Data1)
        .end((error, res) => {
            token = res.body.token;
            res.should.have.status(200);
            done();
        });
});

describe("/GET /getdata", () => {

    it("given valid token when get all employee data should return status=200 and success=true", done => {
        chai
            .request(server)
            .get("/getdata")
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eq("Getted all employees data!")
                res.body.should.have.property('data')
                done();
            });
    });

    it("given invalid token when not get data should return  status=400 and success=false", done => {
        chai
            .request(server)
            .get("/getdata")
            .set('Authorization', 'bearar ' + token.slice(10))
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq("Invalid token");
                done();
            });
    });

    it("given empty token when get data should return  status=401 and success=false", done => {
        var emptyToken = '';
        chai
            .request(server)
            .get("/getdata")
            .set('Authorization', emptyToken)
            .end((error, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq("Access denied! unauthorized user")
                done();
            });
    });
});


describe("/GET /find/Id", () => {

    it("given valid token and employee Id when find should return status=200 and success=true", done => {
        chai
            .request(server)
            .get("/find/" + employeetest.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
                done();
            });
    });

    it("given valid token and invalid employee id when find should return status=404 and success=false", done => {

        chai
            .request(server)
            .get("/find/" + employeetest.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
    });
});

describe("/PUT /update/Id", () => {
    it("given valid token and employee data when update using Id should return status=200 and success=true", done => {
        const employeeData = employeetest.Data3;
        chai
            .request(server)
            .put("/update/" + employeetest.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("given valid token and wrong employee data when update using Id should return status=404 and success=false", done => {
        const employeeData = employeetest.Data3;
        chai
            .request(server)
            .put("/update/" + employeetest.Data6.Id)
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

describe("/Delele /Id", () => {

    it("given valid token and employee data when delete using Id should return status=200 and success=true", done => {
        chai
            .request(server)
            .delete("/delete/" + employeetest.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("given valid token and wrong employee data when delete using Id should return status=404 and success=false", done => {
        chai
            .request(server)
            .delete("/delete/" + employeetest.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, res) => {
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
                done();
            });
    });

});