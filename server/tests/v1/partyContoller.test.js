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

  describe('PATCH /api/v1/parties', function () {
    let id;

    before(function (done) {
      Party.findOne({ where: { name: parties[0].name } }).then((party) => {
        ({ id } = party.dataValues);
        done();
      });
    });

    it('should update specified party detail(s) for authorized users', function (done) {
      chai.request(app)
        .patch(`${endpoints.parties}/${id}`)
        .set('authorization', adminToken)
        .type('form')
        .send(parties[1])
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.data.name.should.equal(parties[1].name);
          done();
        });
    });

    it('should return an error if party (id) to be updated does not exist', function (done) {
      chai.request(app)
        .patch(`${endpoints.parties}/2`)
        .set('authorization', adminToken)
        .type('form')
        .send(parties[1])
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.error.should.equal('Party not found');
          done();
        });
    });

    it('should return an error if required field for update is missing', function (done) {
      chai.request(app)
        .patch(`${endpoints.parties}/2`)
        .set('authorization', adminToken)
        .type('form')
        .send(parties[9])
        .end((err, res) => {
          res.status.should.equal(422);
          res.body.errors.name.should.equal('Please provide a party name');
          done();
        });
    });

    describe('error handler', function () {
      let stubUpdateParty;

      beforeEach(function (done) {
        stubUpdateParty = sinon.stub(Party.prototype, 'update').rejects({ message: 'Internal server error' });
        done();
      });

      afterEach((done) => {
        stubUpdateParty.restore();
        done();
      });

      it('should return status 500 with corresponding error message', function (done) {
        chai.request(app)
          .patch(`${endpoints.parties}/${id}`)
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

  describe('DELETE /api/v1/parties', function () {
    let id;
    let testParty;

    before(function (done) {
      Party.findOne({ where: { name: parties[1].name } })
        .then((party) => {
          ({ id } = party.dataValues);
          testParty = party;
        })
        .then(() => {
          Party.create(parties[2]);
        });
      done();
    });

    it('should return an error if specified party for deletion does not exist', function (done) {
      chai.request(app)
        .delete(`${endpoints.parties}/9`)
        .set('authorization', adminToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.error.should.equal('Party not found');
          done();
        });
    });

    it('should delete a specified party', function (done) {
      chai.request(app)
        .delete(`${endpoints.parties}/${id}`)
        .set('authorization', adminToken)
        .type('form')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should.equal(`${testParty.name} successfully deleted`);
          done();
        });
    });

    describe('error handler', function () {
      let stubDeleteParty;

      beforeEach(function (done) {
        stubDeleteParty = sinon.stub(Party.prototype, 'destroy').rejects({ message: 'Internal server error' });
        done();
      });

      afterEach((done) => {
        stubDeleteParty.restore();
        done();
      });

      it('should return status 500 with corresponding error message', function (done) {
        chai.request(app)
          .delete(`${endpoints.parties}/2`)
          .set('authorization', adminToken)
          .type('form')
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.should.have.property('error').eql('Internal server error');
            done();
          });
      });
    });
  });
});
