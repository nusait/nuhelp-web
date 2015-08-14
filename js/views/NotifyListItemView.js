var Binding = require('ampersand-dom-bindings');
var View = require('View');
var Helper = require('Helper');
var listItemTemp = require('notify-list-item-template');

function bindViewEvents() {
    console.log('bound view event in ' + this.name);
}

function bindDomEvents() {
    console.log('bound dom event in ' + this.name);
    //this.on('click', '.notification', function () {
    //    console.log(this);
    //});
}

function NotifyListItemView(opts) {
    View.call(this, opts);
}

NotifyListItemView.prototype = Object.create(View.prototype);

function render() {
    View.prototype.render.call(this);
    setTimeout(function () {
        this.el.classList.remove('removed');
    }.bind(this), 1);
}

function remove() {
    this.el.classList.add('removed');
    setTimeout(function () {
        this.parentNode.removeChild(this);
    }.bind(this.el), 500);

    this.events.emit('view.removed', this);
}

var proto = {
    name: 'notifyListItem',
    sel: 'ul#notifications',
    template: listItemTemp,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents,
    render: render,
    remove: remove,
};

Helper.mixin(NotifyListItemView.prototype, proto);

module.exports = NotifyListItemView;
