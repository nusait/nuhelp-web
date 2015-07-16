require('mapbox.js');
var View = require('View');
var Helper = require('Helper');
var mapTemp = require('notify-map-template');
var Config = require('Config');
var EnvVar = require('EnvVar');
var _ = require('lodash');
var moment = require('moment');

function bindViewEvents() {

}

function bindDomEvents() {

}

function NotifyMapView() {
    L.mapbox.accessToken = EnvVar.mapbox_token;
    var container = Helper.queryOne('#notify-map-view-container');
    var dim = calculateMapDimensions();
    container.style.height = dim[1] + 'px';
    var map = L.mapbox.map('notify-map-view-container', 'examples.map-i86nkdio')
        .setView([42.054566, -87.675615], 16);
    map.attributionControl.setPosition('bottomleft');
    this.mapInstance = map;
}

function removeExistingNotifyLines() {
    var map = this.mapInstance;
    _.each(this.lines, function (layerGroup) {
        map.removeLayer(layerGroup);
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
        var latLongs = [];
        var dots = [];
        var currentLine = L.layerGroup();
        _.each(locations, function (loc) {
            var latlng = L.latLng(loc.lat, loc.long);
            latLongs.push(latlng);
            var date = moment(new Date(loc.recorded_at));
            var timeStr = date.format('MM/DD h:mm:ss a') + ' (' + date.fromNow() + ')';
            var popup = L.popup().setContent('<p>Recorded At: ' + timeStr + ' </p>');
            var dot = L.circleMarker(latlng).setRadius(6).bindPopup(popup);
            dots.push(dot);
        }, this);
        var path = L.polyline(latLongs, {color: 'green'});
        currentLine.addLayer(path);
        _.each(dots, function (dot) {
           currentLine.addLayer(dot);
        });
        this.lines['notification-' + notify.id] = currentLine;
        currentLine.addTo(this.mapInstance);
    }.bind(this);

    Helper
        .ajax('get', Helper.url('notifications/' + notify.id, {include: 'locations'}))
        .then(drawLineFromJson);
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
    removeAllExistingLines: removeExistingNotifyLines
};

Helper.mixin(NotifyMapView.prototype, proto);

module.exports = NotifyMapView;
