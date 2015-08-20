require('mapbox.js');
var View = require('View');
var Helper = require('Helper');
var mapTemp = require('notify-map-template');
var EnvVar = require('EnvVar');
var _ = require('lodash');
var moment = require('moment');
//var facilities = require('Facilities');

function showMap(mapInstance) {
    Helper.queryOne('#map-title').classList.remove('hidden');
    Helper.queryOne('#notify-map-view-container').classList.remove('hidden');
    if (!! mapInstance) {
        mapInstance._onResize();
    } else if ( !! App.make('MapView')) {
        App.make('MapView').mapInstance._onResize();
    }
}

function hideMap() {
    Helper.queryOne('#map-title').classList.add('hidden');
    Helper.queryOne('#notify-map-view-container').classList.add('hidden');
}

function bindViewEvents() {
    this.events.on('auth.userLoggedIn', function () {
        showMap();
    });

    this.events.on('auth.userLoggedOut', function () {
        hideMap();
        this.removeAllExistingLines();
    }.bind(this));
}

function bindDomEvents() {

}

function NotifyMapView() {
    L.mapbox.accessToken = EnvVar.mapbox_token;
    var auth = App.make('auth');
    var container = Helper.queryOne('#notify-map-view-container');
    var dim = calculateMapDimensions();
    container.style.height = dim[1] + 'px';
    var map = L.mapbox.map('notify-map-view-container', 'nusaitweb.j0cchc70')
        .setView([42.054566, -87.675615], 16);
    map.attributionControl.setPosition('bottomleft');
    this.mapInstance = map;
    View.call(this);
    if (auth.check()) {
        showMap(map);
    }
}

function removeExistingNotifyLines() {
    var map = this.mapInstance;
    _.each(this.lines, function (layerGroup) {
        map.removeLayer(layerGroup.group);
    });
}

function calculateMapDimensions() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return [w, h - 50];
}

function drawNotifyLine(notify) {
    var drawLineFromJson = function (json) {
        var locations = json.locations;
        var groupObj = addNotifyStartingPoint.call(this, notify);
        _.each(locations, function (location) {
            this.addNewLocation(notify.id, location, groupObj);
        }, this);

        groupObj.group.addTo(this.mapInstance);
        this.reboundLine(notify.id);
    }.bind(this);

    Helper
        .ajax('get', Helper.url('notifications/' + notify.id, {include: 'locations'}))
        .then(drawLineFromJson);
}

function addNotifyStartingPoint(notify) {
    var currentGroup = L.layerGroup();
    var latlong = L.latLng(notify.origin_lat, notify.origin_long);
    var path = L.polyline([latlong], {color: 'green'});

    var date = moment(new Date(notify.created_at));
    var timeStr = date.format('MM/DD h:mm:ss a') + ' (' + date.fromNow() + ')';
    var popup = L.popup().setContent('<p>Recorded At: ' + timeStr + ' </p>');
    var dot = L.circleMarker(latlong, {color: '#F00'}).setRadius(6).bindPopup(popup);

    currentGroup.addLayer(path);
    currentGroup.addLayer(dot);
    var groupObj = {line: path, group: currentGroup};
    this.lines['notification-' + notify.id] = groupObj;

    return groupObj;
}

function addNotifyPoint(notifyId, location, groupObj) {
    var layer = this.lines['notification-' + notifyId];
    if (!! groupObj) {
        layer = groupObj;
    }
    if (typeof layer === 'undefined') return;

    var line = layer.line;

    var latlng = L.latLng(location.lat, location.long);
    line.addLatLng(latlng);

    var date = moment(new Date(location.recorded_at));
    var timeStr = date.format('MM/DD h:mm:ss a') + ' (' + date.fromNow() + ')';
    var popup = L.popup().setContent('<p>Recorded At: ' + timeStr + ' </p>');
    var dot = L.circleMarker(latlng).setRadius(6).bindPopup(popup);
    layer.group.addLayer(dot);
}

function reboundLine(notifyId) {
    var layer = this.lines['notification-' + notifyId];
    var bound = layer.line.getBounds();
    this.mapInstance.fitBounds(bound, {padding: [10, 30]});
}

NotifyMapView.prototype = Object.create(View.prototype);

var proto = {
    name: 'notifyMapView',
    sel: '#notify-map-view-container',
    template: mapTemp,
    lines: {},
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents,
    drawLine: drawNotifyLine,
    removeAllExistingLines: removeExistingNotifyLines,
    addNewLocation: addNotifyPoint,
    reboundLine: reboundLine
};

Helper.mixin(NotifyMapView.prototype, proto);

module.exports = NotifyMapView;
