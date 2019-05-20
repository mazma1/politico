import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);

describe('App.js', function () {
  it('should return status 400 if specified version in request URL does not exist', function (done) {
    chai.request(app)
      .get('/api/v0/')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.have.property('message').eql('The requested endpoint does not exist');
        done();
      });
  });

  it('should return status 200 and a message that client was loaded if base URL is specified', function (done) {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('message').eql('Loaded the client app');
        done();
      });
  });

  it('should return status 200 and a message if the v1 base API URL is specified', function (done) {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('message').eql('Welcome to Politico API');
        done();
      });
  });
});
