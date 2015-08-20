var Auth = require('Auth');
var View = require('View');
var Helper = require('Helper');
var loginTemp = require('login-template');

function bindViewEvents() {
    console.log('bound view event in login');
    this.events.on('auth.userLoggedIn', function () {
        console.log('loggedin!!!!');
        this.hide();
    }.bind(this));

    this.events.on('auth.userLoggedOut', function () {
        if(this.rendered) {
            return this.show();
        }
        return this.render();
    }.bind(this));

}

function bindDomEvents() {
    console.log('bound dom event in login');
    this.on('submit', 'form', function (evt) {
        evt.preventDefault();
        console.log(evt);
        var netid = this.querySelector('#netid').value;
        var password = this.querySelector('#password').value;
        var login = App.make('auth').login(netid, password);
        login.then(function (json) {
            //console.log(json);
        });
    });
}

function LoginView() {
    this.Auth = App.make('auth');
    View.call(this);
}

LoginView.prototype = Object.create(View.prototype);

var proto = {
    name: 'loginView',
    sel: '#login-view-container',
    template: loginTemp,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents
};

Helper.mixin(LoginView.prototype, proto);

module.exports = LoginView;