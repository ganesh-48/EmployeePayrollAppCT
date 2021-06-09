const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
let rawdata = fs.readFileSync('test/employee.json');
let employeetest = JSON.parse(rawdata);

describe('POST/userlogin', () => {
    it('It is passing a employeeData and doing user login should return a status 200 and gives success=true', (done) => {
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

    it('It is passing a employeeData and doing user login should return a status 400 and gives success=false', (done) => {
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
    it('It is passing a employee new data in manogodb when added it return a status = 200 and success = true', (done) => {
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

    it('It should POST passing a employee data when added wrong data then it return status=400 and success=false', (done) => {
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

    it("It should fetch all employeeData successfully with valid token using authorize then return a status=200 and success=true", done => {
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

    it("It should fetch all employeeData successfully with invalid token using authorize then return a status=400 and success=false", done => {
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

    it("It should fetch all employeeData successfully with empty token using authorize then return a status=401 and success=false", done => {
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

    it("It should give employeeData checking valid token and find using employeeId should return status=200 and success=true", done => {
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

    it("It should not given employeeData checking invalid token and find using employeeId should return status=404 and success=false", done => {

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
    it("It should  update the employeeData checking valid token and update using employeeId should return status=200 and success=true", done => {
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

    it("It should not update employeeData checking invalid token and find using employeeId should return status=404 and success=false", done => {
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

    it("It should delete given employeeData checking valid token and delete using employeeId should return status=200 and success=true", done => {
        chai
            .request(server)
            .delete("/delete/" + employeetest.Data5.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.have.property('success').eq(true);
                done();
            });
    });

    it("It should not delete given employeeData checking invalid token and delete using employeeId should return status=404 and success=false", done => {
        chai
            .request(server)
            .delete("/delete/" + employeetest.Data6.Id)
            .set('Authorization', 'bearar ' + token)
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.have.property('success').eq(false);
                done();
            });
    });

});