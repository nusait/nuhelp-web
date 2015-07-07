require('whatwg-fetch');
require('start');
require('closestPolyfill');

var _ = require('lodash');
var Container = require('Container');
var Mapbox = require('mapbox.js');
var Auth = require('Auth');
var Authority = require('Authority');
var MainNavigationView = require('MainNavigationView');
var Helper = require('Helper');
var Config = require('Config');
var Env = require('Env');
var ReportListView = require('ReportListView');
var ReportCreationView = require('ReportCreationView');
var LoginView = require('LoginView');
var User = require('User');
var Session = require('Session');
var moment = require('moment');
var EnvVar = require('EnvVar');
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var NotifyMapView = require('NotifyMapView');
var NotifyCollection = require('NotifyCollection');
var NotifyListItemView = require('NotifyListItemView');
var NotifyListItemTemp = require('notify-list-item-template');
var CollectionView = require('NotifyListView');
var InspectActiveNotifyToggle = require('InspectActiveNotifyToggle');
var ioClient = require('socket.io-client')(Config.nodeUrl[Env.getEnvironment()]);

(function (global) {

    global.App = new Container();

    // TEMP STUFF!!! //
    //global.notifications = new NotifyCollection(requests.notifications);
    //
    //var container = document.querySelector('ul.notifications');
    //
    //notifications.forEach(function (Notify) {
    //    var el = Helper.parseHTML(NotifyListItemTemp(Notify));
    //    container.appendChild(el);
    //});

    //END OF TEMP STUFF!! //

    var events = new EventEmitter2({
        wildcard: true
    });
    App.instance('events', events);
    App.instance('auth', new Auth());
    App.instance('authority', new Authority());
    App.instance('login', new LoginView());

    ioClient.on('connect', function () {
        console.log('connected to socket!', ioClient.id);
    });

    ioClient.on('notification:new', function (data) {
        console.log('new notification', data);
    });

    ioClient.on('notification:newLocation', function (data) {
        console.log('new location', data);
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
        })
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
        collectionView.render();
        console.log(collection);
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