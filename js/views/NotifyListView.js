var CollectionView = require('ampersand-collection-view');
var Helper = require('Helper');
var Delegate = require('Delegate');

function NotifyListView (opts) {
    CollectionView.call(this, opts);
    var collection = this.collection;
    this.on('click', '.notification', function () {
        var id = this.dataset.id;
        //console.log(collection.get(id));
        var map = App.make('MapView');
        console.log(map);
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