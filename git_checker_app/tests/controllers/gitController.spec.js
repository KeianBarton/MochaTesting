var rewire = require('rewire');

var GitCtrl = rewire('../../controllers/gitController');  // can modify gitService internal to that module
var gitController = GitCtrl();
var chai = require('chai');
var sinon = require('sinon');
chai.should();

describe('gitController', function() {
    beforeEach(() => {
        var gitService = GitCtrl.__get__('gitService');  // access even though it's not exposed
        this.getUser = sinon.spy(gitService, 'getUser');
        GitCtrl.__set__('gitService', gitService);
    });
    it('should get user and repos from git service', function(done) {
        this.timeout(10000);
        var req = { params: { userId: 'keianbarton' } };
        var res = { json : test };

        function test(user) {
            getUser.getCall(0).args[0].should.equal('keianbarton');
            getUser.calledOnce.should.be.true;
            user.login.should.equal('KeianBarton');
            done();
        };

        gitController.userGet(req, res);
    });
});