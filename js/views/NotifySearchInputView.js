var View = require('View');
var Helper = require('Helper');
var template = require('notify-search-input');

function bindViewEvents() {
    console.log('bound view event in ' + this.name);
}

function bindDomEvents() {
    console.log('bound dom event in ' + this.name);

    this.on('keyup', 'input', function (evt) {
        var container = this.parentNode;
        var query = container.querySelector('input').value;
        var partialContainer = container.querySelector('#notification-search-partial');
        var addOptionTagFromJson = function (json) {
            var partials = (json['partial']);
            Helper.removeChildren(partialContainer);
            partials.forEach(function (partial) {
                //var htmlStr = '<option value="' + partial.phone + '">';
                var label = partial.phone + ' - ' + partial.first_name + ' ' + partial.last_name;
                //console.log(label);
                var htmlStr = '<option value="' + partial.phone + '" label="' + label + '">';
                partialContainer.appendChild(Helper.parseHTML(htmlStr));
            });
        };

        if (query === '') {
            Helper.removeChildren(partialContainer);
            return;
        }
        if (query.length === 2) {
            Helper.ajax('get', Helper.url('notifications/search', {query : query, partialonly : true}))
                .then(addOptionTagFromJson);
        }
    });

    this.on('click','button', function (evt) {
        evt.preventDefault();
        var query = this.parentNode.querySelector('input').value;
        if (query === '') {
            Helper.ajax('get', Helper.url('notifications/expired', {'query' : query}))
                .then(function (json) {
                    var collection = App.make('notifications');
                    collection.set(json.notifications);
                });
        }
        else {
            Helper.ajax('get', Helper.url('notifications/search', {'query' : query}))
                .then(function (json) {
                    var collection = App.make('notifications');
                    collection.set(json.notifications);
                });
        }

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