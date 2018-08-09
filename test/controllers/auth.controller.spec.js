var assert = require('assert');
var authController = require('../../controllers/auth.controller');

describe('AuthController', function(){
    describe('isAuthorized', function() {
        it('Should return false if not authorized', function() {
            assert.equal(false, authController.isAuthorized(['user'], 'admin'));
        });
        it('Should return true if authorized', function() {
            assert.equal(true, authController.isAuthorized(['user', 'admin'], 'admin'));
        });
    });
    describe('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            this.timeout(2500);
            authController.isAuthorizedAsync(['user'], 'admin', function(isAuth){
                assert.equal(false, isAuth);
                done();
            });
        });
        it('Should return true if authorized', function(done) {
            this.timeout(2500);
            authController.isAuthorizedAsync(['user', 'admin'], 'admin', function(isAuth){
                assert.equal(true, isAuth);
                done();
            });
        });
    });
});