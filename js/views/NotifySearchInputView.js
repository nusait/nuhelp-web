var View = require('View');
var Helper = require('Helper');
var template = require('notify-search-input');

function bindViewEvents() {
    console.log('bound view event in ' + this.name);
}

function bindDomEvents() {
    console.log('bound dom event in ' + this.name);
    this.on('click','button', function (evt) {
        evt.preventDefault();
        console.log('send a search!');
    });
}

function NotifySearchInputView(opts) {
    View.call(this, opts);
}

NotifySearchInputView.prototype = Object.create(View.prototype);

var proto = {
    name: 'notifySearchView',
    sel: '#notification-search-container',
    template: template,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents
};

Helper.mixin(NotifySearchInputView.prototype, proto);

module.exports = NotifySearchInputView;