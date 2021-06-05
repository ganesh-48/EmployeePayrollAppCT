const chai = require('chai');
const server = require('../server');
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

describe('POST/userlogin', () => {
    it('It should POST new task', (done) => {
        const task = {
            emailId: "shivsunder@gmail.com",
            password: "Sunder@345"
        };
        chai.request(server)
            .post('/userlogin')
            .send(task)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.property('success').eq(true);
                res.body.should.be.property('message').eq("User Login Successfull!!");
                res.body.should.be.property('token');
                done();
            });
    });
});