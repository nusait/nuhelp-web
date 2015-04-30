var View = require('View');
var Helper = require('Helper');
var mapTemp = require('notify-map-template');
var Config = require('Config');
var Mapbox = require('mapbox.js');

function bindViewEvents() {
    //this.events.on('notifyAddedToList', function () {
    //    console.log('loggedin!!!!');
    //    this.hide();
    //}.bind(this));
    //
    //this.events.on('notifyRemovedFromList', function () {
    //    if(this.rendered) {
    //        return this.show();
    //    }
    //    return this.render();
    //}.bind(this));
}

function bindDomEvents() {
    //console.log('bound dom event in login');
    //this.on('submit', 'form', function (evt) {
    //    evt.preventDefault();
    //    console.log(evt);
    //    var netid = this.querySelector('#netid').value;
    //    var password = this.querySelector('#password').value;
    //    var login = App.make('auth').login(netid, password);
    //    login.then(function (json) {
    //        //console.log(json);
    //    });
    //});
}

function NotifyMapView() {
    L.mapbox.accessToken = Config.mapToken;
    var map = L.mapbox.map('notify-map-view-container', 'examples.map-i86nkdio')
        .setView([42.054566, -87.675615], 16);
    this.mapInstance = map;
}

NotifyMapView.prototype = Object.create(View.prototype);

var proto = {
    name: 'loginView',
    sel: '#login-view-container',
    template: mapTemp,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents
};

Helper.mixin(NotifyMapView.prototype, proto);

module.exports = NotifyMapView;
