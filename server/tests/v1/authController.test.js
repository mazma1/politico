import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { User } from '../../models';
import endpoints from './endpoints';
import users from '../mockData/users.json';

const should = chai.should();
chai.use(chaiHttp);

describe('Auth Endpoint', function () {
  before(function (done) {
    User.sync({ force: true, match: /-test$/ }) // drops table and re-creates it
      .then(function () {
        done(null);
      })
      .catch(function (error) {
        done(error);
      });
  });

  describe('POST /api/v1/auth/signup', function () {
    it('should return a JSON web token after successful signup', function (done) {
      chai.request(app)
        .post(endpoints.signup)
        .type('form')
        .send(users[0])
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('user');
          res.body.data.user.firstname.should.equal(users[0].firstname);
          res.body.data.user.email.should.equal(users[0].email);
          done();
        });
    });

    it('should return status 422 when all required fields are missing', function (done) {
      chai.request(app)
        .post(endpoints.signup)
        .type('form')
        .send(users[1])
        .end((err, res) => {
          res.status.should.equal(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.an('object');
          res.body.errors.should.include.all.keys(
            'firstname', 'lastname', 'email', 'password', 'confirmPassword',
          );
          done();
        });
    });

    it('should return status 422 when email is already in use', function (done) {
      chai.request(app)
        .post(endpoints.signup)
        .type('form')
        .send(users[2])
        .end((err, res) => {
          res.status.should.equal(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.an('object');
          res.body.errors.should.include.all.keys('email');
          res.body.errors.should.have.property('email').eql('Email is already in use');
          done();
        });
    });

    it('should return status 422 when firstname and lastname are not alphabets', function (done) {
      chai.request(app)
        .post(endpoints.signup)
        .type('form')
        .send(users[3])
        .end((err, res) => {
          res.status.should.equal(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.an('object');
          res.body.errors.should.include.all.keys('firstname', 'lastname');
          res.body.errors.should.have.property('firstname').eql('Firstname must contain only alphabets');
          res.body.errors.should.have.property('lastname').eql('Lastname must contain only alphabets');
          done();
        });
    });

    it('should return status 422 when password and confirmPassword do not match', function (done) {
      chai.request(app)
        .post(endpoints.signup)
        .type('form')
        .send(users[4])
        .end((err, res) => {
          res.status.should.equal(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.an('object');
          res.body.errors.should.include.all.keys('confirmPassword');
          res.body.errors.should.have.property('confirmPassword').eql('Password confirmation does not match password');
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signin', function () {
    it('should return a token on successful sign in', function (done) {
      chai.request(app)
        .post(endpoints.login)
        .type('form')
        .send(users[5])
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('user');
          res.body.data.user.firstname.should.equal(users[0].firstname);
          res.body.data.user.email.should.equal(users[0].email);
          done();
        });
    });

    it('should return status 422 for an invalid email address', function (done) {
      chai.request(app)
        .post(endpoints.login)
        .type('form')
        .send(users[6])
        .end((err, res) => {
          res.status.should.equal(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.an('object');
          res.body.errors.should.include.all.keys('email');
          res.body.errors.should.have.property('email').eql('Please provide a valid email address');
          done();
        });
    });

    it('should return status 401 for an email that does not exist', function (done) {
      chai.request(app)
        .post(endpoints.login)
        .type('form')
        .send(users[7])
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Invalid username or password');
          done();
        });
    });
  });
});
