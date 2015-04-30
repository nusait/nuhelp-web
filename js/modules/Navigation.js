var Helpers = require('Helper');
var Auth = require('Auth');

var q = Helpers.queryOne;
var hasClass=Helpers.hasClass;

function bindNavigationEvents() {
    q('#topnav').addEventListener('click', function (evt) {
        evt.preventDefault();

        var target = evt.target;
        var Auth = App.make('auth');
        if(hasClass(target, 'logout')) {
            var logout = Auth.logout();
            logout.then(function (response) {
                return console.log(response.headers);
            });
        }
    });
}

var Navigation = {
    bindNavigationEvents: bindNavigationEvents
};

module.exports = Navigation;