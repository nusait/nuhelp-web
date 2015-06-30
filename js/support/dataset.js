(function (ELEMENT) {
    ELEMENT.setDataAttribute = function (name, value) {
        if (value !== undefined) return this.setAttribute('data-' + name, value);
        else return this.removeDataAttribute(name);
    };
    ELEMENT.removeDataAttribute = function (name) {
        return this.removeAttribute('data-' + name);
    };
    ELEMENT.setDataAttributes = function (items) {
        if (items instanceof Object) {
            for (attr in items) if (items.hasOwnProperty(attr)) this.setDataAttribute(attr, items[attr]);
        }
    };
    if (!ELEMENT.__lookupGetter__("dataset")) {
        ELEMENT.__defineGetter__("dataset", function () {
            try { // simulate DOMStringMap w/accessor support
                var getter_test = {};
                getter_test.__defineGetter__("test", function () {
                }); // test setting accessor on normal object
                delete getter_test;
                var HTML5_DOMStringMap = {};
            } catch (e) {
                var HTML5_DOMStringMap = document.createElement("div")
            } // use a DOM object for IE8
            function lambda(o) {
                return function () {
                    return o
                }
            };
            function dataSetterFunc(ref_el, attrName) {
                return function (val) {
                    return ref_el.setDataAttribute(attrName, val)
                }
            };
            for (attr in this.attributes) {
                if (this.attributes.hasOwnProperty(attr) && this.attributes[attr].name && /^data-[a-z_\-\d]*$/i.test(this.attributes[attr].name)) {
                    var attrName = this.attributes[attr].name.substr(5), attrVal = this.attributes[attr].value;
                    try {
                        HTML5_DOMStringMap.__defineGetter__(attrName, lambda(attrVal || ''));
                        HTML5_DOMStringMap.__defineSetter__(attrName, dataSetterFunc(this, attrName));
                    }
                    catch (e) {
                        HTML5_DOMStringMap[attrName] = attrVal
                    } // if accessors are not working
                }
            }
            return HTML5_DOMStringMap;
        });
    }
})(Element.prototype);