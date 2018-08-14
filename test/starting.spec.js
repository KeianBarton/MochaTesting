var assert = require('assert');
var should = require('chai').should();

describe('Basic Mocha Test', function() {
    it('should throw errors', function() {
        // assert.equal(2, 3);
    });
    it('assertion error caught', function() {
        // try {
        //     assert.equal(2, 3);
        // } catch (e) {
        //     console.log(e);
        // }
    });
});
describe('Testing objects with Chai', function() {
    it('should deal with objects', function() {
        var objA = { name: 'Jon', gender: 'male' };
        var objB = objA;
        var objC = { name: 'Jon', gender: 'male' };
        objA.should.have.property('name');
        objA.should.have.property('gender').equal('male');
        objA.should.equal(objB);
        objA.should.deep.equal(objC);
    });
    it('should allow testing nulls', function() {
        var iAmNull = null;
        should.not.exist(iAmNull);
        // iAmNull.should.not.exist;  null error
    });
});