var View = require('View');
var Helper = require('Helper');
var template = require('checkbox-active-notifications');

function bindViewEvents() {
    console.log('bound view event in ' + this.name);
}

function bindDomEvents() {
    console.log('bound dom event in ' + this.name);
    this.on('click','input', function (evt) {
        if (this.checked) {
            Helper.ajax('get', Helper.url('notifications/active'))
                .then(function (json) {
                    var notifications = App.make('notifications');
                    notifications.set(json.notifications);
                });
        } else {
            Helper.ajax('get', Helper.url('notifications/expired'))
                .then(function (json) {
                    var notifications = App.make('notifications');
                    notifications.set(json.notifications);
                });
        }
    });
}

function InspectActiveNotifyToggle(opts) {
    View.call(this, opts);
}

InspectActiveNotifyToggle.prototype = Object.create(View.prototype);

var proto = {
    name: 'inspectActiveNotifyToggle',
    sel: '#show-active-notifications-container',
    template: template,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents
};

Helper.mixin(InspectActiveNotifyToggle.prototype, proto);

module.exports = InspectActiveNotifyToggle;