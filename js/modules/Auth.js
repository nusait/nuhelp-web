var Helper = require('Helper');

function submitLogin(netid, password) {
    var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var path = Helper.url('login');

        request.open('post', path, true);
        request.setRequestHeader('Want-Cookies', 'true');

        var formData = new FormData();
        formData.append('netid', netid);
        formData.append('password', password);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                resolve(request);
            }
        };
        console.log('send request to: ' + path);
        request.send(formData);
    });
    return promise;
}

function submitLogout() {
    var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var path = Helper.url('logout');

        request.open('get', path, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                resolve(request);
            }
        };
        request.send();
    });
    return promise;
}

var Auth = {
    login: submitLogin,
    logout: submitLogout
};

module.exports = Auth;