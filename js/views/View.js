var Helper = require('Helper');

var mixin = Helper.mixin;
var qa = Helper.queryAll;
var is = Helper.is;

function View (node) {
    this.events = App.make('events');
    this.elEventListeners = {};
    this.el = document.querySelector(this.sel);
    if (typeof node !== 'undefined') {
        this.el = node;
    }
    this.bindViewEvents();
    this.events.once('rendered.' + this.name, this.bindDomEvents.bind(this));
    this.addFancyButtonEvent();
}

function addFancyButtonEvent() {
    this.on('mousedown', 'button', function (evt) {
        this.style.overflow = 'hidden';
        var prevCircle = this.querySelector('.ripple');
        if (prevCircle) {
            this.removeChild(prevCircle);
        }
        var circle = document.createElement('div');
        circle.classList.add('ripple');
        circle.style.top = (evt.offsetY - 40) + 'px';
        circle.style.left = (evt.offsetX - 40) + 'px';
        this.appendChild(circle);
        setTimeout(function () {
            this.removeChild(circle);
        }.bind(this), 300);
    });
}

function createDelegateEventListener(eventName) {
    this.el.addEventListener(eventName, function (evt) {
        var eventArray = this.elEventListeners[eventName];
        for (var selector in eventArray) {
            var el = Helper.findParent(evt.target, selector, this.el);
            if ( !! el) {
                eventArray[selector].forEach(function (callback) {
                    callback.call(el, evt);
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

function render(rendObj) {
    this.el.innerHTML = this.template(rendObj);
    this.events.emit('rendered.' + this.name, this);
    this.rendered = true;
}

function hide() {
    this.el.classList.add('hidden');
}

function show() {
    this.el.classList.remove('hidden');
}

function bindViewEvents() {
    throw new Error('You have to implement bindEvents on ' + this.name);
}

function bindDomEvents() {
    throw new Error('You have to implement bindDomEvents on ' + this.name);
}

var proto = {
    el: document.body,
    elEventListeners: {}, //'input' : [func, func]
    on: addEvent,
    rendered: false,
    render: render,
    show: show,
    hide: hide,
    addFancyButtonEvent: addFancyButtonEvent,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents
};

mixin(View.prototype, proto);

module.exports = View;
