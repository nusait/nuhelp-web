var Helper = require('Helper');
var Delegate = require('Delegate');
var mixin = Helper.mixin;
var qa = Helper.queryAll;
var is = Helper.is;
var _ = require('lodash');

var defaultOpts = {
    model: null,
    collection: null
};

function View (opts) {
    if (typeof opts === 'undefined') {
        opts = {};
    }
    var options = _.defaults(opts, defaultOpts);
    console.log(opts);
    this.model = options.model;
    this.collection = options.collection;

    this.events = App.make('events');
    this.elEventListeners = {};
    this.parent = options.parent || document.querySelector(this.sel);

    this.bindViewEvents();
    this.events.once('view.rendered.' + this.name, this.bindDomEvents.bind(this));
    console.log(this.sel, this.parent);
    this.addFancyButtonEvent();
}

function addFancyButtonEvent() {
    if (this.parent === null) {
        return;
    }
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

function render() {
    var parent = this.parent.el || this.parent;
    this.el = Helper.parseHTML(this.template(this.model));
    parent.appendChild(this.el);
    this.events.emit('view.rendered.' + this.name, this);
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

function remove() {
    var parent = this.parent.el || this.parent;
    if (parent) {
        parent.removeChild(this.el);
    }
    this.events.emit('view.removed', this);
}

var proto = {
    parent: document.body,
    el: null,
    sel: null,
    elEventListeners: {}, //'input' : [func, func]
    on: Delegate.on,
    rendered: false,
    render: render,
    show: show,
    hide: hide,
    remove: remove,
    addFancyButtonEvent: addFancyButtonEvent,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents
};

mixin(View.prototype, proto);

module.exports = View;
