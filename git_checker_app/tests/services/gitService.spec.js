var chai = require('chai'),
    sinon = require('sinon'),
    https = require('https');
var PassThrough = require('stream').PassThrough;

chai.should();
var gitService = require('../../services/gitService')();

describe('GitService', function() {
    describe('GetUser', function() {
        beforeEach(function(){
            this.request = sinon.stub(https, 'request');
        });
        it('should return user and repos', function(){
            this.timeout(10000);   // account for lag to GitHub

            var gitJson = { login: 'KeianBarton' }; // can define in separate file and add more to this
            var gitResponse = new PassThrough();
            gitResponse.write(JSON.stringify(gitJson));
            gitResponse.end();

            var repoJson = { };  // can define in separate file and add more to this
            var repoResponse = new PassThrough();
            repoResponse.write(JSON.stringify(repoJson));
            repoResponse.end();

            // https.request(options, callback)  - so call with callback gitResponse
            this.request
                .onFirstCall().callsArgWith(1, gitResponse).returns(new PassThrough())
                .onSecondCall().callsArgWith(1, repoResponse).returns(new PassThrough());

            // getUser returns a promise - use a return for Mocha to wait
            return gitService.getUser('keianbarton').then(
                (user) => {   // use arrow function so 'this' doesn't refer to callback this
                    var params = this.request.getCall(0).args;
                    params[0].headers['User-Agent'].should.equal('gitExample');

                    this.request.getCall(1).args[0].path.should.equal('/users/keianbarton/repos');

                    user.login.should.equal('KeianBarton');
                    user.should.have.property('repos');
                }
            )
        });
        afterEach(function() {
            this.request.restore();
        });
    });
});