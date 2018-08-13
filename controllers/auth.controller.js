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

    return { isAuthorized, isAuthorizedAsync, setRoles };
}

module.exports = AuthController();