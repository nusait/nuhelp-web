var Env = require('Env');
var Helper = require('Helper');

function detectEnv() {
    if( !! forceEnv()) return forceEnv();
    if(isOnLocal()) return Env.LOCAL;
    if(isOnTest()) return Env.TEST;
    return Env.PROD;
}

function forceEnv() {
    var value = Helper.queryString()['force-env'];
    if ( ! value) {
        return null;
    }
    value = value.toLowerCase();
    if (value == 'local') {
        return 0;
    } else if (value === 'test') {
        return 1;
    }
    return 2;
}

function isOnLocal() {
    return (/nuhelp\.web/.test(location.host));
}

function isOnTest() {
    return (/test\.dosa\.northwestern\.edu/.test(location.host));
}

function shimMatches() {
    if (typeof Element.prototype.matches === 'function') return;

    Element.prototype.matches =
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector;
}

shimMatches();
Env.setEnvironment(detectEnv());

