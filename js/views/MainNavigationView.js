var Auth = require('Auth');
var View = require('View');
var Helper = require('Helper');
var navTemp = require('mainnav-template');
var greetingPartial = require('mainnav-greeting');

var q = Helper.queryOne;
var hasClass=Helper.hasClass;

function bindViewEvents() {
    console.log('bound view event in mainnav');
    this.events.on('auth.userLoggedOut', function () {
        q('.logout').classList.add('hidden');
        q('.login').classList.remove('hidden');
        q('.greeting').classList.add('hidden');
    }.bind(this));

    this.events.on('auth.userLoggedIn', function (user) {
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

function MainNavigationView(options) {
    console.log('main nav', options);
    View.call(this, options);
}

MainNavigationView.prototype = Object.create(View.prototype);

function render() {
    View.prototype.render.call(this, this.model);
    if ( !! this.model) {
        this.addGreeting(this.model);
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