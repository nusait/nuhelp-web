/**
 * Created by haoluo on 4/28/15.
 */

var Collection = require('ampersand-collection');
var Notify = require('Notify');

var NotifyCollection = Collection.extend({
    model: Notify
});

module.exports = NotifyCollection;
