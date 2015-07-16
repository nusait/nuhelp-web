var CollectionView = require('ampersand-collection-view');
var Helper = require('Helper');
var Delegate = require('Delegate');

function removeClassnameFromChildren(selector, classname) {
    nodeArray = Helper.queryAll.call(this, selector);
    nodeArray.forEach(function (node) {
        node.classList.remove(classname);
    });
}

function NotifyListView (opts) {
    CollectionView.call(this, opts);
    var collection = this.collection;
    var ins = this;
    this.on('click', '.notification', function () {
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