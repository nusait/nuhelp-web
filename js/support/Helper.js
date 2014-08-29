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

function isElementChildOfParent(child, parent, upperStop) {
    if (typeof upperStop === 'undefined') {
        upperStop = document.body;
    }
    if (child === parent) {
        return true;
    }

    if (child === upperStop) {
        return false;
    }

    return isElementChildOfParent(child.parentElement, parent, upperStop);
}

var Helper = {
    queryOne: queryOne,
    queryAll: queryAll,
    hasClass: hasClass,
    mixin: mixin,
    is: isElementThisSelector,
    has: isElementChildOfParent
};

module.exports = Helper;