import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../app';
import { User, Party } from '../../models';
import endpoints from './endpoints';
import users from '../mockData/users.json';
import parties from '../mockData/parties.json';
import tokens from '../mockData/tokens.json';


const should = chai.should();
chai.use(chaiHttp);
let adminToken;
let userToken;
const { invalidToken } = tokens;

describe('Parties Endpoint', function () {
  before(function (done) {
    Party.sync({ force: true, match: /-test$/ });
    User.sync({ force: true, match: /-test$/ })
      .then(function () {
        chai.request(app)
          .post(endpoints.signup)
          .type('form')
          .send(users[9])
          .end((err, res) => {
            adminToken = res.body.data.token;
          });
      })
      .then(function () {
        chai.request(app)
          .post(endpoints.signup)
          .type('form')
          .send(users[0])
          .end((err, res) => {
            userToken = res.body.data.token;
            done();
          });
      })
      .catch(function (error) {
        done(error);
      });
  });

  describe('POST /api/v1/parties', function () {
    it('should return an error if a user is not authenticated', function (done) {
      chai.request(app)
        .post(endpoints.parties)
        .type('form')
        .send(parties[0])
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.error.should.equal('No token provided.');
          done();
        });
    });

    it('should return an error if token is invalid', function (done) {
      chai.request(app)
        .post(endpoints.parties)
        .set('authorization', invalidToken)
        .type('form')
        .send(parties[0])
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('error');
          res.body.error.should.equal('Invalid access token');
          done();
        });
    });

    it('should create a new party if it does not exist', function (done) {
      chai.request(app)
        .post(endpoints.parties)
        .set('authorization', adminToken)
        .type('form')
        .send(parties[0])
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.data.name.should.equal(parties[0].name);
          done();
        });
    });

    it('should return an error if a party already exists', function (done) {
      chai.request(app)
        .post(endpoints.parties)
        .set('authorization', adminToken)
        .type('form')
        .send(parties[0])
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.have.property('error');
          res.body.error.should.equal('Party already exists');
          done();
        });
    });

    it('should return an error if a user is not authorized', function (done) {
      chai.request(app)
        .post(endpoints.parties)
        .set('authorization', userToken)
        .type('form')
        .send(parties[0])
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.have.property('error');
          res.body.error.should.equal('Unauthorized request');
          done();
        });
    });

    describe('error handler', function () {
      let stubCreateParty;

      beforeEach(function (done) {
        stubCreateParty = sinon.stub(Party, 'findOrCreate').rejects({ message: 'Internal server error' });
        done();
      });

      afterEach((done) => {
        stubCreateParty.restore();
        done();
      });

      it('should return status 500 with corresponding error message', function (done) {
        chai.request(app)
          .post(endpoints.parties)
          .set('authorization', adminToken)
          .type('form')
          .send(parties[0])
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.should.have.property('error').eql('Internal server error');
            done();
          });
      });
    });
  });
});
