var Helper = require('Helper');

var mixin = Helper.mixin;
var qa = Helper.queryAll;
var is = Helper.is;

function View (node) {
    this.elEventListeners = {};
    if (typeof node !== 'undefined') {
        this.el = node;
    }
}

function createDelegateEventListener(eventName) {
    this.el.addEventListener(eventName, function (evt) {
        var eventArray = this.elEventListeners[eventName];
        for (var selector in eventArray) {
            if (is(evt.target, selector)) {
                eventArray[selector].forEach(function (callback) {
                    callback.call(evt.target, evt);
                });
            }
        }
    }.bind(this));
}

function addDelegateEvent(event, selector, callback) {
    if (typeof this.elEventListeners[event] === 'undefined') {
        this.elEventListeners[event] = {};
        createDelegateEventListener.call(this, event);
    }
    var eventListeners = this.elEventListeners[event];
    var selectorListenerArray = eventListeners[selector] || (eventListeners[selector] = []);
    selectorListenerArray.push(callback);
}

function addDirectEvent(event, callback) {
    this.el.addEventListener(event, callback);
}

function addEvent (event, funcOrSelector, func) {
    var callback = func;
    var selector = funcOrSelector;
    if ( typeof funcOrSelector == 'function') {
        callback = funcOrSelector;
        addDirectEvent.call(this, event, callback);
    } else {
        addDelegateEvent.call(this, event, selector, callback);
    }
}

var proto = {
    el: document.body,
    elEventListeners: {}, //'input' : [func, func]
    on: addEvent,
    qa: qa.bind(this.el)
};

mixin(View.prototype, proto);

module.exports = View;
