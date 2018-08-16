var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');
var proxy = 'http://127.0.0.1:3128';

module.exports = function () {
    var getRepos = function (userId, cb) {
        var options = {
            agent: new HttpsProxyAgent(proxy),
            host: 'api.github.com',
            path: `/users/${userId}/repos`,
            headers: { 'User-Agent': 'gitExample' }
        };

        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end',
                function () {
                    cb(JSON.parse(str));
                }
            );
        };

        https.request(options, callback).end();
    }
    var getUser = function (userId) {
        return new Promise(function(resolve){
            //console.log('getUser');
            var options = {
                agent: new HttpsProxyAgent(proxy),
                host: 'api.github.com',
                path: `/users/${userId}`,
                headers: { 'User-Agent': 'gitExample' }
            };

            var callback = function (response) {
                //console.log('callback');
                var str = '';

                response.on('data', function (chunk) {
                    str += chunk;
                });

                response.on('end', function () {
                    var user = JSON.parse(str);
                    getRepos(userId, function (repos) {
                        //console.log('repos');
                        user.repos = repos;
                        resolve(user);
                    })

                });
                response.on('error', (e) => {
                    console.log(`problem with request: ${e.message}`);
                });
            };

            //console.log(options);
            https.request(options, callback).end();
        })
    };

    return {
        getUser: getUser
    };

};