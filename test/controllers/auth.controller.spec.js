var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();       // add to Object.prototype

beforeEach(function() { console.log('Global before each' )});
describe('AuthController', function(){
    before(function() { /* global setup */ });
    beforeEach('this func is erroring intentionally', function errorFunc () {
        console.log('Local before each');
        authController.setRoles(['user']);
    });
    describe('isAuthorized', function() {
        it('Should return false if not authorized', function() {
            var isAuth = authController.isAuthorized('admin');
            //assert.equal(false, isAuth);
            //expect(isAuth).to.be.false;
            isAuth.should.be.false;
        });
        it('Should return true if authorized', function() {
            authController.setRoles(['user', 'admin']);
            assert.equal(true, authController.isAuthorized('admin'));
        });
        it('should not allow a get if not authorized');
        it('should allow get if authorized');
    });
    // describe.only('isAuthorizedAsync', function() {
    // describe.skip('isAuthorizedAsync', function() {
    describe('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500);
            authController.isAuthorizedAsync('admin', function(isAuth){
                assert.equal(false, isAuth);
                done();
            });
        });
        it('Should return true if authorized', function(done) {
            this.timeout(2500);
            authController.setRoles(['user', 'admin']);
            authController.isAuthorizedAsync('admin', function(isAuth){
                assert.equal(true, isAuth);
                done();
            });
        });
        it('Conditional skipping example', function() {
            if (true) { // something environmental
                this.skip();
            } else {
                // actual test
            }
        })
    });
    describe('isAuthorizedPromise', function() {
        it('Should return false if not authorized', function() {
            // Mocha can return promise, so no need for 'done'
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        });
    });
    describe('getIndex', function() {
        it('should render index', function() {
            var req = {};
            var res = {
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            // console.log(res.render);
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index');
        });
    });
});