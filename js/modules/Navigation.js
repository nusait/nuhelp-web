var Helpers = require('Helper');
var Auth = require('Auth');

var q = Helpers.queryOne;
var hasClass=Helpers.hasClass;

function bindNavigationEvents() {
    q('#topnav').addEventListener('click', function (evt) {
        evt.preventDefault();

        var target = evt.target;
        if(hasClass(target, 'logout')) {
            var logout = Auth.logout();
            logout.then(function (request) {
                return console.log(request.responseText);
            });
        }
    });
}

var Navigation = {
    bindNavigationEvents: bindNavigationEvents
};

module.exports = Navigation;