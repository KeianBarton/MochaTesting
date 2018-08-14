function AuthController() {
    
    var roles;
    function setRoles(role) {
        roles = role;
    }

    function isAuthorized(neededRole) {
        return roles.indexOf(neededRole) >= 0;  // checks if role exists
    }

    function isAuthorizedAsync(neededRole, cb) {
        setTimeout(function(){cb(roles.indexOf(neededRole) >= 0)}, 2100);
    }

    function isAuthorizedPromise(neededRole) {
        return new Promise(function(resolve, reject) {
            setTimeout(function(){
                resolve(roles.indexOf(neededRole) >= 0)
            }, 0);
        });
    }

    function getIndex(req, res) {
        res.render('index');
    }

    return { isAuthorized, isAuthorizedAsync, isAuthorizedPromise, setRoles, getIndex };
}

module.exports = AuthController();