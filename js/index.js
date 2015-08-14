require('whatwg-fetch');
require('start');
require('closestPolyfill');

var _ = require('lodash');
var Container = require('Container');
var Auth = require('Auth');
var Authority = require('Authority');
var MainNavigationView = require('MainNavigationView');
var Helper = require('Helper');
var Config = require('Config');
var Env = require('Env');
var Router = require('Router');
var LoginView = require('LoginView');
var moment = require('moment');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var NotifyMapView = require('NotifyMapView');
var NotifyCollection = require('NotifyCollection');
var NotifyListItemView = require('NotifyListItemView');
var CollectionView = require('NotifyListView');
var InspectActiveNotifyToggle = require('InspectActiveNotifyToggle');
var NotifySearchInputView = require('NotifySearchInputView');
var ioClient = require('socket.io-client')(Config.nodeUrl[Env.getEnvironment()]);

(function (global) {

    global.App = new Container();

    var router = new Router();
    router.history.start();
    var events = new EventEmitter2({
        wildcard: true
    });
    App.instance('events', events);
    App.instance('auth', new Auth());
    App.instance('authority', new Authority());
    App.instance('login', new LoginView());
    App.instance('router', router);

    ioClient.on('connect', function () {
        console.log('connected to socket!', ioClient.id);
    });

    ioClient.on('notification:new', function (data) {
        console.log('new notification', data);
        //if ()
        if (! App.make('authority').can('inspect', 'Notify')) {
            return;
        }
        var notifications = App.make('notifications');
        if ( ! notifications) {
            return;
        }

        Helper.ajax('get', Helper.url('notifications/' + data.notification_id)).then(function (json) {
            console.log(json);
            notifications.add(json);
        });
    });

    ioClient.on('notification:newLocation', function (data) {
        console.log('new location', data);
        var notifications = App.make('notifications');
        if ( ! notifications) {
            return;
        }

        if ( ! notifications.at(data.notification_id)) {
            return;
        }

        Helper.ajax('get', Helper.url('notifications/' + data.notification_id + '/locations/latest')).then(function (json) {
            var lat = json.lat;
            var long = json.long;
            var latLong = L.latLng(lat, long);
            var map = App.make('MapView');
            var line = map.lines['notification-' + data.notification_id];
            line.addLatLng(latLong);
            var date = moment(new Date(json.recorded_at));
            var timeStr = date.format('MM/DD/YY h:mm:ss a');
            var popup = L.popup().setContent('<p>Recorded At: ' + timeStr + ' </p>');
            L.circleMarker(latLong).setRadius(6).addTo(map.mapInstance).bindPopup(popup);
        });
    });

    ioClient.on('notification:expired', function (data) {
        console.log('new expired', data);
    });

    ioClient.on('notification:canceled', function (data) {
        console.log('canceled', data);
    });

    ioClient.on('notification:sent', function (data) {
        console.log('sent', data);
    });

    Promise.all([
        App.make('auth').start()
    ]).then(function() {
        App.make('authority').start();
    }).then(function () {
        var loginView = App.make('login');
        var auth = App.make('auth');
        var mainnav = new MainNavigationView({model: auth.currentUser});
        var map = new NotifyMapView();
        App.instance('mainnav', mainnav);
        mainnav.render();
        App.instance('MapView', map);
        if(! auth.check()) {
            loginView.render();
        }
    }).then(function () {
        return fetchExpiredNotifications();
    }).then(function (json) {
        var collection = new NotifyCollection(json.notifications);
        App.instance('notifications', collection);
        var collectionView = new CollectionView({
            el: document.querySelector('#notifications'),
            collection: collection,
            view: NotifyListItemView
        });
        App.instance('NotificationListView', collectionView);
        var search = new NotifySearchInputView();
        search.render();
        collectionView.render();
        var canInspect = App.make('authority').can('inspect','Notify');
        var canViewActiveNotify = {canInspectActive: canInspect};
        var activeToggle =  new InspectActiveNotifyToggle({model: canViewActiveNotify});
        activeToggle.render();
        App.instance('ActiveToggleView', activeToggle);
    });

    function fetchExpiredNotifications () {
        return Helper.ajax('get', Helper.url('notifications/expired'))
    }


})(window);