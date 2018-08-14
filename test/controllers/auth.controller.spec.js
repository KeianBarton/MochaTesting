var assert = require('assert');
var authController = require('../../controllers/auth.controller');

beforeEach(function() { console.log('Global before each' )});
describe('AuthController', function(){
    before(function() { /* global setup */ });
    beforeEach('this func is erroring intentionally', function errorFunc () {
        console.log('Local before each');
        authController.setRoles(['user']);
    });
    describe('isAuthorized', function() {
        it('Should return false if not authorized', function() {
            assert.equal(false, authController.isAuthorized('admin'));
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
        }
    });
});