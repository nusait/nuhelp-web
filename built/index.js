(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var loginTemp = require('./templates/login.hbs');
var Auth = require('Auth');
var Navigation = require('Navigation');
var View = require('View');
var Helper = require('Helper');
var ReportListView = require('ReportListView');

var login = loginTemp();

//document.body.insertAdjacentHTML('beforeend', login);

document.querySelector('#login-view').innerHTML = login;

document.querySelector('#login-view form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    var netid = this.querySelector('#netid').value;
    var password = this.querySelector('#password').value;
    var login = Auth.login(netid, password);
    login.then(function (request) {
        console.log(request.responseText);
    });
});

Navigation.bindNavigationEvents();

var reports = [
    {
        id: 1,
        phone: null,
        email: null,
        date_of_incident: "2014-02-23",
        time_of_incident: "21:29:07",
        location: null,
        incident_lat: "76.0345520",
        incident_long: "136.8774500",
        origin_lat: "-7.5497320",
        origin_long: "146.4325620",
        person: "Domenica Robel III",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Fuga harum minima atque ea sit et. Iusto ipsa a excepturi velit omnis quia et eum. Eaque iure ab quas ab optio aliquam voluptatem.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 2,
        phone: "(375)109-9110x070",
        email: "norn@hotmail.com",
        date_of_incident: "2002-02-27",
        time_of_incident: "18:27:08",
        location: null,
        incident_lat: "74.0486150",
        incident_long: "136.2629850",
        origin_lat: "40.4397420",
        origin_long: "-50.1685980",
        person: "Kelton Becker",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Porro possimus voluptatem doloremque consequuntur vel aut similique. Sapiente qui voluptatem eligendi est. Velit itaque velit assumenda eligendi ex nihil ut.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 3,
        phone: null,
        email: null,
        date_of_incident: "1992-08-15",
        time_of_incident: "09:37:37",
        location: null,
        incident_lat: "-60.0585640",
        incident_long: "22.3852430",
        origin_lat: "63.4073330",
        origin_long: "69.8874420",
        person: "Mrs. Shane Kuhic Sr.",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Laudantium excepturi doloremque sint maiores necessitatibus culpa fugiat. Temporibus non voluptate veniam est omnis. Et nisi error voluptate incidunt ea et cum. Accusamus vel et sapiente iste.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 4,
        phone: "1-806-056-1969x505",
        email: "brian28@hotmail.com",
        date_of_incident: "2010-06-02",
        time_of_incident: "00:48:19",
        location: null,
        incident_lat: "-56.6140020",
        incident_long: "33.7358770",
        origin_lat: "-0.1123880",
        origin_long: "30.8453520",
        person: "Vern Kessler",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Architecto est numquam omnis est similique vel dolor. Doloribus debitis quaerat exercitationem. Alias reiciendis nesciunt voluptatem eligendi ipsum sed. Sit a qui quo dolorem.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 5,
        phone: null,
        email: null,
        date_of_incident: "1977-11-07",
        time_of_incident: "10:49:36",
        location: null,
        incident_lat: "75.6089700",
        incident_long: "-103.9611010",
        origin_lat: "-89.1361990",
        origin_long: "-41.7162440",
        person: "Alysson Kozey",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Molestiae et dignissimos eum. Sunt ab ut odio nisi recusandae ex. Sed doloremque cum expedita porro aut tempora. Omnis et unde non exercitationem error nulla eum odio.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 6,
        phone: "(746)531-8295",
        email: "zconroy@yahoo.com",
        date_of_incident: "1999-04-23",
        time_of_incident: "06:23:51",
        location: null,
        incident_lat: "-86.1973270",
        incident_long: "-18.7653810",
        origin_lat: "-39.7184850",
        origin_long: "-37.8769150",
        person: "Karen Davis",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Temporibus delectus qui vero. Error aut asperiores fuga magnam et. Autem quo qui pariatur facere. Quod tempore id quia quis voluptas.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 7,
        phone: null,
        email: null,
        date_of_incident: "1998-01-20",
        time_of_incident: "05:23:31",
        location: null,
        incident_lat: "-25.8949230",
        incident_long: "-169.2716690",
        origin_lat: "85.2319770",
        origin_long: "-134.5087030",
        person: "Mr. Rosalind Hagenes I",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Architecto praesentium unde quis dolor aut eum. Harum omnis maxime ab enim enim omnis. Atque debitis laboriosam rerum voluptatem rerum. Asperiores nihil qui quam quibusdam.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 8,
        phone: "895-866-5678",
        email: "carmel.dickinson@yahoo.com",
        date_of_incident: "1993-07-29",
        time_of_incident: "11:58:11",
        location: null,
        incident_lat: "-18.7152980",
        incident_long: "-168.1680320",
        origin_lat: "41.2217850",
        origin_long: "130.4164670",
        person: "Hans Effertz",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Tenetur dicta tempore deleniti praesentium inventore vero. Et veritatis rem debitis aliquam consequatur totam consequatur. Deserunt nam iusto et architecto.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 9,
        phone: null,
        email: null,
        date_of_incident: "2005-09-08",
        time_of_incident: "12:06:12",
        location: null,
        incident_lat: "-22.7668730",
        incident_long: "-113.8227150",
        origin_lat: "-58.8006840",
        origin_long: "67.7350690",
        person: "Martine Mohr",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Aut possimus deserunt enim molestias maiores sit labore. Dolor velit consequuntur optio atque. Quia facere assumenda aut facere quas autem. Non voluptatem id nemo natus et nam.",
        user_id: null,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    },
    {
        id: 10,
        phone: "06443098239",
        email: "savion.bradtke@yahoo.com",
        date_of_incident: "1987-03-02",
        time_of_incident: "02:06:30",
        location: null,
        incident_lat: "-89.1689050",
        incident_long: "-56.0455630",
        origin_lat: "84.7810690",
        origin_long: "-104.5929130",
        person: "Violette Veum",
        role: "Subject of Concern",
        concern_type: "Assault",
        concern_description: "Aut dolore repellat nostrum dolores nesciunt blanditiis est. Vel ipsam maiores esse itaque doloribus quia praesentium. Voluptas nulla eaque laudantium magnam.",
        user_id: 1,
        created_at: "2014-08-27 13:39:22",
        updated_at: "2014-08-27 13:39:22"
    }
];
window.Helper = Helper;
listView = new ReportListView(reports);
listView.render();
listView.on('click', '.report-list-item', function (evt) {
    console.log(evt);
    console.log(this.querySelector('.person').innerText);
});
listView.on('click', '.report-list-item', function (evt) {
    console.log(this.querySelector('.role').innerText);
});

window.body = document.body;
window.liView = document.querySelector('#report-list-view');
window.roleView = document.querySelector('.role');

console.log(Helper.has(roleView, liView));
},{"./templates/login.hbs":5,"Auth":2,"Helper":4,"Navigation":3,"ReportListView":7,"View":8}],2:[function(require,module,exports){
function submitLogin(netid, password) {
    var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var path = 'api/login';

        request.open('post', path, true);
        request.setRequestHeader('Want-Cookies', 'true');

        var formData = new FormData();
        formData.append('netid', netid);
        formData.append('password', password);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                resolve(request);
            }
        };
        console.log('send request to: ' + path);
        request.send(formData);
    });
    return promise;
}

function submitLogout() {
    var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var path = 'api/logout';

        request.open('get', path, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                resolve(request);
            }
        };
        request.send();
    });
    return promise;
}

var Auth = {
    login: submitLogin,
    logout: submitLogout
};

module.exports = Auth;
},{}],3:[function(require,module,exports){
var Helpers = require('Helper');
var Auth = require('Auth');

var q = Helpers.queryOne;
var hasClass=Helpers.hasClass;

function bindNavigationEvents() {
    q('#topnav').addEventListener('click', function (evt) {
        evt.preventDefault();

        var target = evt.target;
        if(hasClass(target, 'logout')) {
            var logout = Auth.logout();
            logout.then(function (request) {
                return console.log(request.responseText);
            });
        }
    });
}

var Navigation = {
    bindNavigationEvents: bindNavigationEvents
};

module.exports = Navigation;
},{"Auth":2,"Helper":4}],4:[function(require,module,exports){
function hasClass(node, className) {
   return node.classList.contains(className);
}

function mixin(target, mixin) {
    Object.keys(mixin).forEach(function(prop) {
        target[prop] = mixin[prop];
    });
    return target;
}

function queryOne(selector) {
    var parent = this;
    if ( typeof parent.querySelector === 'undefined') {
        parent = document;
    }
    return parent.querySelector(selector);
}

function queryAll(selector) {
    var parent = this;
    var elements, result;
    if ( typeof parent.querySelectorAll === 'undefined') {
        parent = document;
    }
    elements = parent.querySelectorAll(selector);
    result = Array.prototype.slice.call(elements);
    return result;
}

function isElementThisSelector(el, selector) {
    var parent = this;
    var elements, result;
    if ( typeof parent.querySelectorAll === 'undefined') {
        parent = document;
    }
    elements = parent.querySelectorAll(selector);
    result = Array.prototype.slice.call(elements);
    return result.indexOf(el) > -1;
}

function isElementChildOfParent(child, parent, upperStop) {
    if (typeof upperStop === 'undefined') {
        upperStop = document.body;
    }
    if (child === parent) {
        return true;
    }

    if (child === upperStop) {
        return false;
    }

    return isElementChildOfParent(child.parentElement, parent, upperStop);
}

var Helper = {
    queryOne: queryOne,
    queryAll: queryAll,
    hasClass: hasClass,
    mixin: mixin,
    is: isElementThisSelector,
    has: isElementChildOfParent
};

module.exports = Helper;
},{}],5:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form action=\"\">\n    <label class=\"hidden\" for=\"netid\">NetID:</label><input type=\"text\" id=\"netid\" name=\"netid\" placeholder=\"NetID\"/>\n    <br>\n    <label class=\"hidden\" for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\"/>\n    <button type=\"submit\">Login</button>\n</form>\n";
  });

},{"hbsfy/runtime":16}],6:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div class=\"report-list-item\">\n        <span class=\"person\">";
  if (helper = helpers.person) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.person); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n        <span class=\"role\">";
  if (helper = helpers.role) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.role); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

},{"hbsfy/runtime":16}],7:[function(require,module,exports){
var View = require('View');
var Helper = require('Helper');
var reportListTemp = require('report-list-template');

function ReportListView (reports) {
    View.call(this);
    this.reports = reports;
    this.el = document.querySelector('#report-list-view');
}

ReportListView.prototype = Object.create(View.prototype);

ReportListView.prototype.constructor = ReportListView;

var proto = {
    reports: [],
    template: reportListTemp,
    render: function () {
        this.el.innerHTML = this.template(this.reports);
    }
};

Helper.mixin(ReportListView.prototype, proto);
Helper.mixin = function (target) {
    target.doSomething = Helper.prototype.doSomething;
};

module.exports = ReportListView;
},{"Helper":4,"View":8,"report-list-template":6}],8:[function(require,module,exports){
var Helper = require('Helper');

var mixin = Helper.mixin;
var qa = Helper.queryAll;
var is = Helper.is;

function View (node) {
    this.elEventListeners = {};
    if (typeof node !== 'undefined') {
        this.el = node;
    }
}

function createDelegateEventListener(eventName) {
    this.el.addEventListener(eventName, function (evt) {
        var eventArray = this.elEventListeners[eventName];
        for (var selector in eventArray) {
            if (is(evt.target, selector)) {
                eventArray[selector].forEach(function (callback) {
                    callback.call(evt.target, evt);
                });
            }
        }
    }.bind(this));
}

function addDelegateEvent(event, selector, callback) {
    if (typeof this.elEventListeners[event] === 'undefined') {
        this.elEventListeners[event] = {};
        createDelegateEventListener.call(this, event);
    }
    var eventListeners = this.elEventListeners[event];
    var selectorListenerArray = eventListeners[selector] || (eventListeners[selector] = []);
    selectorListenerArray.push(callback);
}

function addDirectEvent(event, callback) {
    this.el.addEventListener(event, callback);
}

function addEvent (event, funcOrSelector, func) {
    var callback = func;
    var selector = funcOrSelector;
    if ( typeof funcOrSelector == 'function') {
        callback = funcOrSelector;
        addDirectEvent.call(this, event, callback);
    } else {
        addDelegateEvent.call(this, event, selector, callback);
    }
}

var proto = {
    el: document.body,
    elEventListeners: {}, //'input' : [func, func]
    on: addEvent,
    qa: qa.bind(this.el)
};

mixin(View.prototype, proto);

module.exports = View;

},{"Helper":4}],9:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":10,"./handlebars/exception":11,"./handlebars/runtime":12,"./handlebars/safe-string":13,"./handlebars/utils":14}],10:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "1.3.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 4;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(arg) {
    if(arguments.length === 2) {
      return undefined;
    } else {
      throw new Exception("Missing helper: '" + arg + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      return fn(context);
    }
  });

  instance.registerHelper('each', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { 
              data.key = key; 
              data.index = i;
              data.first = (i === 0);
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    if (!Utils.isEmpty(context)) return options.fn(context);
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var obj = {};
  Utils.extend(obj, object);
  return obj;
};
exports.createFrame = createFrame;
},{"./exception":11,"./utils":14}],11:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],12:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
    var result = env.VM.invokePartial.apply(this, arguments);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    programs: [],
    program: function(i, fn, data) {
      var programWrapper = this.programs[i];
      if(data) {
        programWrapper = program(i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(i, fn);
      }
      return programWrapper;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = {};
        Utils.extend(ret, common);
        Utils.extend(ret, param);
      }
      return ret;
    },
    programWithDepth: env.VM.programWithDepth,
    noop: env.VM.noop,
    compilerInfo: null
  };

  return function(context, options) {
    options = options || {};
    var namespace = options.partial ? options : env,
        helpers,
        partials;

    if (!options.partial) {
      helpers = options.helpers;
      partials = options.partials;
    }
    var result = templateSpec.call(
          container,
          namespace, context,
          helpers,
          partials,
          options.data);

    if (!options.partial) {
      env.VM.checkRevision(container.compilerInfo);
    }

    return result;
  };
}

exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
  var args = Array.prototype.slice.call(arguments, 3);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(this, [context, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn(context, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;
},{"./base":10,"./exception":11,"./utils":14}],13:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],14:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj, value) {
  for(var key in value) {
    if(Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = value[key];
    }
  }
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;
},{"./safe-string":13}],15:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":9}],16:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":15}]},{},[1]);
