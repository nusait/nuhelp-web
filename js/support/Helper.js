var Config = require('Config');
var Env = require('Env');
var Session = require('Session');

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
function serializeQuery(obj) {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function url(resource, queryObj , secure) {
    
    if (typeof secure == 'undefined') {
        secure = envSecured();
    }
    var base = baseUrl(secure);
    var url = base + '/api/' + resource + '/';

    if (typeof queryObj === 'object') {
        return url + '?' + serializeQuery(queryObj);
    }
    return url;
}

function envSecured() {
    var secured = [false, true, true];
    return secured[Env.getEnvironment()];
}

function baseUrl(secure) {
    if (Env.getEnvironment() !== 0) {
        return '../nuhelpapi';
    }
    if (secure) {
        return 'https:' + Config.baseUrl[Env.getEnvironment()];
    }
    return 'http:' + Config.baseUrl[Env.getEnvironment()];
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

/**
 * success Xhr,
 * network error, timeout error,
 * @param type
 * @param path
 * @param data
 * @returns {Promise}
 */
function makeAjaxPromise(type, path, data, addHeader) {
    var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

    var dataString = JSON.stringify(data);

    console.log('sending a ' + type + ' to ' + path + ' with ' + dataString);

    if (!! Session.user()) {
        var user = Session.user();
        headers['NU-NetId'] = user.netid;
        headers['NuHelp-User-Token'] = user.token;
    }

    if (typeof addHeader !== 'undefined') {
        mixin(headers, addHeader);
    }

    return fetch(path, {
        method: type,
        headers: headers,
        body: dataString
    }).then(function (response) {
        return response.json();
    });

    //var promise = new Promise(function (resolve, reject) {
    //    var request = new XMLHttpRequest();
    //
    //    request.open(type, path, true);
    //
    //    var user = Session.user();
    //    if ( !! user) {
    //        request.setRequestHeader('NU-NetId', user.netid);
    //        request.setRequestHeader('NuHelp-User-Token', user.token);
    //        console.log(user);
    //    }
    //
    //    request.onload = function () {
    //            resolve(request);
    //    };
    //
    //    request.onerror = function (err) {
    //        reject(err);
    //    };
    //
    //    request.ontimeout = function (err) {
    //        console.log(err);
    //        var error = new Error('timeout');
    //        reject(error);
    //    };
    //
    //    request.timeout = 10000;
    //
    //    if (data instanceof FormData) {
    //        request.send(data);
    //    } else if (data instanceof Object) {
    //        var formData = new FormData();
    //        Object.keys(data).forEach(function(prop) {
    //            formData.append(prop, data[prop]);
    //        });
    //        request.send(formData);
    //    } else {
    //        request.send();
    //    }
    //    console.log('sent ' + type + ' request to: ' + path);
    //});
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
    findParent: findParentWithSelector,
    ajax: makeAjaxPromise
};

module.exports = Helper;