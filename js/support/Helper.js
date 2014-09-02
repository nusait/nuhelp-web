var Config = require('Config');
var Env = require('Env');

function hasClass(node, className) {
   return node.classList.contains(className);
}

function mixin(target, mixin) {
    Object.keys(mixin).forEach(function(prop) {
        target[prop] = mixin[prop];
    });
    return target;
}

function queryOne(selector) {
    var parent = this;
    if ( typeof parent.querySelector === 'undefined') {
        parent = document;
    }
    return parent.querySelector(selector);
}

function queryAll(selector) {
    var parent = this;
    var elements, result;
    if ( typeof parent.querySelectorAll === 'undefined') {
        parent = document;
    }
    elements = parent.querySelectorAll(selector);
    result = Array.prototype.slice.call(elements);
    return result;
}

function isElementThisSelector(el, selector) {
    var parent = this;
    var elements, result;
    if ( typeof parent.querySelectorAll === 'undefined') {
        parent = document;
    }
    elements = parent.querySelectorAll(selector);
    result = Array.prototype.slice.call(elements);
    return result.indexOf(el) > -1;
}

function isElementChildOfParent(child, parentSelector, upperStop) {
    if (typeof upperStop === 'undefined') {
        upperStop = document.body;
    }
    if (child.matches(parentSelector)) {
        return true;
    }

    if (child === upperStop) {
        return false;
    }

    return isElementChildOfParent(child.parentElement, parentSelector, upperStop);
}

function findParentWithSelector(child, parentSelector, upperStop) {
    if (typeof upperStop === 'undefined') {
        upperStop = document.body;
    }
    if (child.matches(parentSelector)) {
        return child;
    }

    if (child === upperStop) {
        return false;
    }

    return findParentWithSelector(child.parentElement, parentSelector, upperStop);
}

function url(resource) {
    var base = baseUrl();
    return base + '/api/' + resource + '/';
}

function baseUrl(secure) {
    return Config.baseUrl[Env.getEnvironment()];
}

function queryString() {
    var result = {},
        queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g,
        m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
}

var Helper = {
    queryOne: queryOne,
    queryAll: queryAll,
    hasClass: hasClass,
    mixin: mixin,
    is: isElementThisSelector,
    has: isElementChildOfParent,
    url: url,
    queryString: queryString,
    findParent: findParentWithSelector
};

module.exports = Helper;