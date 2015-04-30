var Auth = require('Auth');
var View = require('View');
var Helper = require('Helper');
var navTemp = require('mainnav-template');
var greetingPartial = require('mainnav-greeting');

var q = Helper.queryOne;
var hasClass=Helper.hasClass;

function bindViewEvents() {
    var Auth = App.make('auth');
    console.log('bound view event in mainnav');
    this.events.on('auth.userLoggedOut', function () {
        q('.logout').classList.add('hidden');
        q('.login').classList.remove('hidden');
        q('.greeting').classList.add('hidden');
    }.bind(this));

    this.events.on('auth.userLoggedIn', function (user) {
        console.log(user);
        q('.logout').classList.remove('hidden');
        q('.login').classList.add('hidden');
        q('.greeting').classList.remove('hidden');
        this.addGreeting(user);
    }.bind(this));

}

function bindDomEvents() {
    console.log('bound dom event in mainnav');
    this.on('click', '.logout', function (evt) {
        evt.preventDefault();
        App.make('auth').logout()
            .then(function (response) {
                return console.log(response.headers);
            });
    });
}

function addGreeting(user) {
    this.el.querySelector('.greeting').innerHTML = greetingPartial({user: user});
}

function MainNavigationView(container) {
    View.call(this, container);
}

MainNavigationView.prototype = Object.create(View.prototype);

function render(obj) {
    View.prototype.render.call(this, obj);
    if ( !! obj.user) {
        this.addGreeting(obj.user);
    }
}

var proto = {
    sel: '#main-nav-container',
    template: navTemp,
    bindViewEvents: bindViewEvents,
    bindDomEvents: bindDomEvents,
    render: render,
    addGreeting: addGreeting
};

Helper.mixin(MainNavigationView.prototype, proto);

module.exports = MainNavigationView;