

function createDelegateEventListener(eventName, eventListenersObj, delegate) {
    delegate.addEventListener(eventName, function (evt) {
        var eventArray = eventListenersObj[eventName];
        for (var selector in eventArray) {
            var el = evt.target.closest(selector);
            if ( !! el) {
                eventArray[selector].forEach(function (callback) {
                    callback.call(el, evt);
                });
            }
        }
    }.bind(this));
}

function addDelegateEvent(event, selector, callback, eventListenersObj, delegate) {
    if (typeof eventListenersObj[event] === 'undefined') {
        eventListenersObj[event] = {};
        createDelegateEventListener(event, eventListenersObj, delegate);
    }
    var eventListeners = eventListenersObj[event];
    var selectorListenerArray = eventListeners[selector] || (eventListeners[selector] = []);
    selectorListenerArray.push(callback);
}

function addDirectEvent(event, callback, el) {
    el.addEventListener(event, callback);
}

function addEvent (event, funcOrSelector, func) {
    //if (typeof context === 'undefined') {
    //    context = this;
    //}

    if ( typeof funcOrSelector === 'function') {
        addDirectEvent(event, funcOrSelector, this.el);
    } else {
        var delegate = this.el;
        if (typeof this.parent !== 'undefined') {
            delegate = this.parent.el || this.parent;
        }
        addDelegateEvent(event, funcOrSelector, func, this.elEventListeners, delegate);
    }
}

var Delegate = {
    on: addEvent
};

module.exports = Delegate;