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

});
