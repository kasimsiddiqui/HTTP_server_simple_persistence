'use strict';

var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var fs = require('fs');

require('../server');

chai.use(chaiHttp);

describe('server.js', function() {
  it('status code 200', function(done) {
    chai.request('localhost:3000')
      .get('/')
      .then(function(res) {
        expect(res.statusCode).to.eql(200);
        done();
      });
  });

  it('respond with JSON object', function(done) {
  chai.request('localhost:3000')
    .get('/')
    .then(function(res) {
      expect(typeof(res.body)).to.equal('object');
      done();
    });
  });

it('should add name on post', function () {
        chai.request('localhost:3000')
            .post('/name')
            .send(JSON.stringify({"name": "test"}))
            .end(function (err, res) {
                expect(err).to.be.equal(null);
                expect(res.status).to.be.equal(201);
                expect(res.text).to.be.eql('http://localhost:3000/name/1');
                done();
            });
    });

    it('should return name on get', function (done) {
        chai.request('localhost:3000')
            .get('/name/1')
            .end(function (err, res) {
                expect(err).to.be.equal(null);
                expect(res.status).to.be.equal(200);
                expect(res.text).to.be.eql(JSON.stringify({"name": "test"}));
                done();
            });
    });

});
