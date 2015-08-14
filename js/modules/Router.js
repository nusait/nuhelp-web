var AmpRouter = require('ampersand-router');

var Router = AmpRouter.extend({
    routes: {
        '': 'map',
        'notifications/:token': 'showNotification'
    },
    map: function () {

    },
    showNotification: function (token) {
        console.log(token);
    }
});

module.exports = Router;