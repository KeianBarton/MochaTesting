var chai = require('chai'),
    sinon = require('sinon');

chai.should();
var gitService = require('../../services/gitService')();

describe('GitService', function() {
    describe('GetUser', function() {
        it('should return user and repos', function(){
            this.timeout(10000);   // account for lag to GitHub
            // getUser returns a promise - use a return for Mocha to wait
            return gitService.getUser('keianbarton').then(
                function(user) {
                    user.login.should.equal('KeianBarton');
                    user.should.have.property('repos');
                }
            )
        });
    });
});