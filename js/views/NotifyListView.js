var CollectionView = require('ampersand-collection-view');
var Helper = require('Helper');
var Delegate = require('Delegate');

function removeClassnameFromChildren(selector, classname) {
    var nodeArray = Helper.queryAll.call(this, selector);
    nodeArray.forEach(function (node) {
        node.classList.remove(classname);
    });
}
function showList() {
    Helper.queryOne('#notify-list-view-container').classList.remove('hidden');
}

function hideList() {
    Helper.queryOne('#notify-list-view-container').classList.add('hidden');
}

function NotifyListView (opts) {
    CollectionView.call(this, opts);
    var collection = this.collection;

    var events = App.make('events');

    events.on('auth.userLoggedIn', function () {
        showList();
        if (App.make('authority').can('read', 'Notify')) {
            Helper.ajax('get', Helper.url('notifications/expired', {'query' : query}))
                .then(function (json) {
                    var collection = App.make('notifications');
                    collection.set(json.notifications);
                });
        }
    });

    events.on('auth.userLoggedOut', function () {
        hideList();
        this.collection.reset();
    }.bind(this));

    var auth = App.make('auth');
    if (auth.check()) {
        showList();
    }

    App.make('MapView').mapInstance.on('click', function (evt) {
        removeClassnameFromChildren.call(Helper.queryOne('#notifications'), '.notification', 'selected');
        App.make('MapView').removeAllExistingLines();
    });

    this.on('click', '.notification', function (evt) {
        evt.stopPropagation();
        var id = this.dataset.id;
        var map = App.make('MapView');
        removeClassnameFromChildren.call(this.closest('#notifications'), '.notification', 'selected');
        this.classList.add('selected');
        map.removeAllExistingLines();
        map.drawLine(collection.get(id));
    });
}

NotifyListView.prototype = Object.create(CollectionView.prototype);

var proto = {
    elEventListeners: {}, //'input' : [func, func]
    on: Delegate.on,
};

Helper.mixin(NotifyListView.prototype, proto);

module.exports = NotifyListView;