var assert = require('assert');
var authController = require('../../controllers/auth.controller');

describe('AuthController', function(){
    beforeEach(function() {
        console.log('Running before each');
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
    });
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
    });
});