function AuthController() {
    function isAuthorized(roles, neededRole) {
        return roles.indexOf(neededRole) >= 0;  // checks if role exists
    }

    function isAuthorizedAsync(roles, neededRole, cb) {
        setTimeout(function(){cb(roles.indexOf(neededRole) >= 0)}, 2100);
    }

    return { isAuthorized, isAuthorizedAsync };
}

module.exports = AuthController();