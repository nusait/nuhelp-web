var Helper = require('Helper');
var Session = require('Session');
var User = require('User');

function Auth() {
    this.currentUser = null;

}

function setCurrentUser(json) {
    this.currentUser = new User(json);
}

function submitLogin(netid, password) {
    return Helper.ajax('post', Helper.url('login'), {
        netid: netid,
        password: password
    }).then(function (json) {
        Session.start(json.netid, json['app_token']);
        setCurrentUser.call(this, json);
        App.make('events').emit('auth.userLoggedIn', this.currentUser);
        return new Promise(function (resolve) {
            resolve(json);
        });
    }.bind(this));
}

function submitLogout() {
    Session.end();
    App.make('events').emit('auth.userLoggedOut');
    return Helper.ajax(
        'get', Helper.url('logout')
    );
}

function isUserLoggedIn() {
    return !! Session.user();
}

function fetchUserInfo() {
    var request = Helper.ajax('get', Helper.url('users', {query : 'current'}));
    request.then(function (json) {
        console.log(json);
        return new Promise (function (resolve) {
            resolve(json);
        });
    }).catch(function (err) {
        setTimeout(function () {
            throw err;
        }, 1);
    });

    return request;
}

function startAuthPromise() {
    if (this.check()) {
        var req = fetchUserInfo();
        return req.then(function(json) {
            setCurrentUser.call(this, json);
            return new Promise(function (resolve) {
                resolve(json);
            });
        }.bind(this));
    } else {
        console.log('not logged in');
        return new Promise(function (resolve) {
            resolve('not logged in');
        });
    }
}

Auth.prototype = {
    login: submitLogin,
    logout: submitLogout,
    check: isUserLoggedIn,
    start: startAuthPromise
};

module.exports = Auth;