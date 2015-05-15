require('whatwg-fetch');
require('start');

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

var ioClient = require('socket.io-client')(Config.nodeUrl[Env.getEnvironment()]);

(function (global) {

    global.App = new Container();



    person = new User({first_name: 'Hao', last_name: 'Luo'});

    var events = new EventEmitter2({
        wildcard: true
    });
    App.instance('events', events);
    App.instance('auth', new Auth());
    App.instance('authority', new Authority());
    App.instance('mainnav', new MainNavigationView());
    App.instance('login', new LoginView());

    ioClient.on('connect', function () {
        console.log('connected to socket!', ioClient.id);
        //var request = Helper.ajax('get', Helper.url('generate/node-token', {key : ioClient.id}));
        //request.then(function(json) {
        //    var token = json.token;
        //    console.log(token);
        //});
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

    Promise.all([
        App.make('auth').start()
    ]).then(function() {
        App.make('authority').start();
    }).then(function () {
        var mainnav = App.make('mainnav');
        var loginView = App.make('login');
        var auth = App.make('auth');
        mainnav.render({user: auth.currentUser});

        if(! auth.check()) {
            loginView.render();
        }
    });

    map = new NotifyMapView();
    var line;
    Helper.ajax('get', Helper.url('notifications/1', {include: 'locations'})).then(function (json) {
       var locations = json.locations;
        var latLongs = [];
        _.each(locations, function (loc) {
            var latlng = L.latLng(loc.lat, loc.long);
            latLongs.push(latlng);
            var date = moment(new Date(loc.recorded_at));
            var timeStr = date.format('MM/DD/YY h:mm:ss a');
            var popup = L.popup().setContent('<p>Recorded At: ' + timeStr + ' </p>');
            L.circleMarker(latlng).setRadius(6).addTo(map.mapInstance).bindPopup(popup);
        });
        line = L.polyline(latLongs, {color: 'green'}).addTo(map.mapInstance);
    });

//listView = new ReportListView([{},{},{}]);
//listView.render();

//listView.on('click', '.report-list-item', function (evt) {
//    console.log(this.querySelector('.person').innerText);
//});
//
//listView.on('click', '.report-list-item', function (evt) {
//    console.log(this.querySelector('.role').innerText);
//});

//creationView = new ReportCreationView();
//creationView.render();



//user = new User();
//user.fetchInfo();

//session = Session;

    //Helper.ajax('get', Helper.url('bluelights'))
    //    .then(function (json) {
    //        console.log(json);
    //    });

//var gettingBluelights = Helper.ajax('get', Helper.url('bluelights') + '?query=nearby&lat=42.059347&long=-87.675487');
//gettingBluelights.then(function (request) {
//    console.table(JSON.parse(request.responseText).features);
//});

})(window);