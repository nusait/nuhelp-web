/**
 * Created by haoluo on 4/28/15.
 */

var Collection = require('ampersand-collection');
var Notify = require('Notify');

var NotifyCollection = Collection.extend({
    model: Notify,
    comparator: function(left, right) {
        return left.created_at < right.created_at;
    }
});

module.exports = NotifyCollection;
