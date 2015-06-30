var Helper = require('Helper');
var moment = require('moment');

function getUserCred() {
    if (typeof localStorage.userNetid === 'undefined' || typeof localStorage.userToken === 'undefined') {
        return null;
    }

    var data = {
        netid: localStorage.userNetid,
        token: localStorage.userToken
    };

    return data;
}

function startUserSession(netid, token) {
    localStorage.userNetid = netid;
    localStorage.userToken = token;
    localStorage.userTokenExpiration = moment().add(2, 'days').format();
}

function endUserSession() {
    delete localStorage.userNetid;
    delete localStorage.userToken;
    delete localStorage.userTokenExpiration;
}

var Session = {
    start: startUserSession,
    end: endUserSession,
    user: getUserCred
};

module.exports = Session;