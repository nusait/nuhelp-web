var Auth = require('Auth');
var View = require('View');
var Helper = require('Helper');
var loginTemp = require('login-template');

function bindEvents() {
    this.on('submit', 'form', function (evt) {
        evt.preventDefault();
        var netid = this.querySelector('#netid').value;
        var password = this.querySelector('#password').value;
        var login = Auth.login(netid, password);
        login.then(function (request) {
            console.log(request.responseText);
        });
    });
}

function LoginView() {
    View.call(this);
    bindEvents.call(this);
}

LoginView.prototype = Object.create(View.prototype);

var proto = {
    sel: '#login-view',
    template: loginTemp
};

Helper.mixin(LoginView.prototype, proto);

module.exports = LoginView;