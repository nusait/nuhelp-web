var Helper = require('Helper');
var _  = require('lodash');

function Authority() {
    App.make('events').on('auth.userLoggedIn', function () {
        this.fetchManifest();
    }.bind(this));

    App.make('events').on('auth.userLoggedOut', function () {
        this.manifest = null;
    }.bind(this));
}

function start() {
    return this.fetchManifest();
}

function fetchPermissionManifest() {
    return Helper.ajax('get', Helper.url('users', {'query': 'permission'})).then(function (json) {
        this.setManifest(json);
        App.make('events').emit('authority.newPermissionManifest');
    }.bind(this));
}

function canPerformActionOnResource(action, resource) {
    if (this.resources().indexOf(resource) > -1) {
        var actions = _.values(this.manifest[resource]);
        return (actions.indexOf(action) > -1);
    }
    return false;
}

function resources() {
    return _.keys(this.manifest);
}

function setManifest(json) {
    this.manifest = json;
}

Authority.prototype = {
    manifest: null,
    fetchManifest: fetchPermissionManifest,
    setManifest: setManifest,
    start: start,
    can: canPerformActionOnResource,
    resources: resources
};

module.exports = Authority;