"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('planly/adapters/application', ['exports', 'ember', 'emberfire/adapters/firebase'], function (exports, _ember, _emberfireAdaptersFirebase) {
  var inject = _ember['default'].inject;
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({
    firebase: inject.service()
  });
});
define('planly/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'planly/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _planlyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _planlyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _planlyConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _planlyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('planly/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'planly/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _planlyConfigEnvironment) {

  var name = _planlyConfigEnvironment['default'].APP.name;
  var version = _planlyConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('planly/components/create-task', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			createSubtask: function createSubtask() {
				console.log("hello");
				this.toggleProperty('enabled');
			}
		}
	});
});
define('planly/components/login-modal', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        actions: {
            signIn: function signIn(provider) {
                this.sendAction('signIn', provider);
            },
            toggleForm: function toggleForm() {
                this.toggleProperty('enabled');
            },
            submit: function submit(data) {
                console.log("modal submitting");
                this.sendAction('submit', data);
            }
        }
    });
});
define('planly/components/project-creation', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			closeProjectCreation: function closeProjectCreation() {
				$('#projectCreation').closeModal();
			}
		}
	});
});
define('planly/components/project-task', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('planly/components/sign-up', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			submit: function submit() {
				console.log("submitting");
				this.sendAction('submit', {
					firstName: this.get('first'),
					lastName: this.get('last'),
					email: this.get('email'),
					password: this.get('password')
				});
				this.store.createRecord('user', {
					firstName: this.get('first'),
					lastName: this.get('last'),
					email: this.get('email'),
					password: this.get('password')
				});
			}
		}
	});
});
define('planly/components/sub-task', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('planly/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('planly/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('planly/helpers/copyright', ['exports', 'ember-cli-copyright/helpers/copyright'], function (exports, _emberCliCopyrightHelpersCopyright) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliCopyrightHelpersCopyright['default'];
    }
  });
  Object.defineProperty(exports, 'copyright', {
    enumerable: true,
    get: function get() {
      return _emberCliCopyrightHelpersCopyright.copyright;
    }
  });
});
define('planly/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'planly/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _planlyConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_planlyConfigEnvironment['default'].APP.name, _planlyConfigEnvironment['default'].APP.version)
  };
});
define('planly/initializers/copyright', ['exports', 'ember-cli-copyright/initializers/copyright'], function (exports, _emberCliCopyrightInitializersCopyright) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliCopyrightInitializersCopyright['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCliCopyrightInitializersCopyright.initialize;
    }
  });
});
define('planly/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('planly/initializers/export-application-global', ['exports', 'ember', 'planly/config/environment'], function (exports, _ember, _planlyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_planlyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _planlyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_planlyConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('planly/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('planly/initializers/initialize-torii-session', ['exports', 'torii/configuration', 'torii/bootstrap/session'], function (exports, _toriiConfiguration, _toriiBootstrapSession) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      if (_toriiConfiguration['default'].sessionServiceName) {
        (0, _toriiBootstrapSession['default'])(application, _toriiConfiguration['default'].sessionServiceName);

        var sessionFactoryName = 'service:' + _toriiConfiguration['default'].sessionServiceName;
        application.inject('adapter', _toriiConfiguration['default'].sessionServiceName, sessionFactoryName);
      }
    }
  };
});
define('planly/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration'], function (exports, _toriiBootstrapTorii, _toriiConfiguration) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  if (window.DS) {
    initializer.after = 'store';
  }

  exports['default'] = initializer;
});
define('planly/instance-initializers/setup-routes', ['exports', 'torii/configuration', 'torii/bootstrap/routing', 'torii/router-dsl-ext'], function (exports, _toriiConfiguration, _toriiBootstrapRouting, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      if (_toriiConfiguration['default'].sessionServiceName) {
        var router = applicationInstance.get('router');
        var setupRoutes = function setupRoutes() {
          var authenticatedRoutes = router.router.authenticatedRoutes;
          var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
          if (hasAuthenticatedRoutes) {
            (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
          }
          router.off('willTransition', setupRoutes);
        };
        router.on('willTransition', setupRoutes);
      }
    }
  };
});
define('planly/instance-initializers/walk-providers', ['exports', 'torii/configuration', 'torii/lib/container-utils'], function (exports, _toriiConfiguration, _toriiLibContainerUtils) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in _toriiConfiguration['default'].providers) {
        if (_toriiConfiguration['default'].providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('planly/router', ['exports', 'ember', 'planly/config/environment'], function (exports, _ember, _planlyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _planlyConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('planly/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    beforeModel: function beforeModel() {

      return this.get("session").fetch()['catch'](function () {});
    },

    actions: {
      openModal: function openModal() {
        $('#login').openModal();
      },
      openProjectModel: function openProjectModel() {
        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
        $('#projectCreation').openModal();
      },
      signIn: function signIn(provider) {
        this.get("session").open("firebase", { provider: provider }).then(function (data) {
          console.log(data.currentUser);
        });
      },

      signOut: function signOut() {
        this.get("session").close();
      },

      submit: function submit(data) {
        var ref = new Firebase("https://planly.firebaseio.com");
        ref.createUser({
          email: data.email,
          password: data.password
        }, function (error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            console.log(this);
          }
        });
      }
    }
  });
});
// app/routes/application.js
define('planly/services/firebase', ['exports', 'emberfire/services/firebase', 'planly/config/environment'], function (exports, _emberfireServicesFirebase, _planlyConfigEnvironment) {

  _emberfireServicesFirebase['default'].config = _planlyConfigEnvironment['default'];

  exports['default'] = _emberfireServicesFirebase['default'];
});
define("planly/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 29
          }
        },
        "moduleName": "planly/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "btn-floating btn-small waves-effect waves-light grey");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "material-icons");
        var el4 = dom.createTextNode("add");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(element0, 5, 5);
        morphs[4] = dom.createMorphAt(element0, 7, 7);
        morphs[5] = dom.createMorphAt(element0, 9, 9);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/nav"], [], ["loc", [null, [1, 0], [1, 26]]]], ["element", "action", ["openProjectModel"], [], ["loc", [null, [4, 65], [4, 94]]]], ["content", "create-task", ["loc", [null, [6, 1], [6, 16]]]], ["content", "project-creation", ["loc", [null, [8, 1], [8, 21]]]], ["inline", "login-modal", [], ["signIn", "signIn", "submit", "submit"], ["loc", [null, [9, 1], [9, 48]]]], ["content", "outlet", ["loc", [null, [10, 1], [10, 11]]]], ["inline", "partial", ["partials/footer"], [], ["loc", [null, [13, 0], [13, 29]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("planly/templates/components/create-task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 31,
              "column": 8
            },
            "end": {
              "line": 33,
              "column": 8
            }
          },
          "moduleName": "planly/templates/components/create-task.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		    			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "sub-task", ["loc", [null, [32, 9], [32, 21]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 7
          }
        },
        "moduleName": "planly/templates/components/create-task.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "create-task");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n	    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "col s12");
        var el4 = dom.createTextNode("\n	    	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "card");
        var el5 = dom.createTextNode("\n	      		");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n				        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s6");
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "task-name");
        dom.setAttribute(el7, "data-error", "Please enter the task name");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Add a new task!");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s6");
        var el7 = dom.createTextNode("\n				        	");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "material-icons prefix");
        var el8 = dom.createTextNode("date_range");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "task-deadline");
        dom.setAttribute(el7, "data-error", "Please select deadline");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Deadline");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("		    		");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "card-action");
        var el7 = dom.createTextNode("\n		    			");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "row");
        var el8 = dom.createTextNode("\n		    				");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "col s1");
        var el9 = dom.createTextNode("\n		    					");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("a");
        dom.setAttribute(el9, "class", "btn-floating blue");
        var el10 = dom.createElement("i");
        dom.setAttribute(el10, "class", "material-icons");
        var el11 = dom.createTextNode("list");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n		    				");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n		    				");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "col s1");
        var el9 = dom.createTextNode("\n		    					");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("a");
        dom.setAttribute(el9, "class", "btn-floating yellow darken-1");
        var el10 = dom.createElement("i");
        dom.setAttribute(el10, "class", "material-icons");
        var el11 = dom.createTextNode("person_add");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n		    				");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n		    				");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8, "class", "col s1");
        var el9 = dom.createTextNode("\n		    					");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("a");
        dom.setAttribute(el9, "class", "btn-floating green");
        var el10 = dom.createElement("i");
        dom.setAttribute(el10, "class", "material-icons");
        var el11 = dom.createTextNode("attach_file");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n		    				");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n		    			");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n		    		");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("end of card-action");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("		    		");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "card-action");
        var el7 = dom.createTextNode("\n		    			");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "class", "waves-effect waves-light btn right");
        var el8 = dom.createTextNode("Create");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n		    		");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n		      	");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		     ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("end of card");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n	     ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	 ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" end of row");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1, 1, 1]);
        var element1 = dom.childAt(element0, [6, 1, 1, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        morphs[3] = dom.createElementMorph(element1);
        morphs[4] = dom.createMorphAt(element0, 9, 9);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "task-name", ["loc", [null, [8, 21], [8, 30]]]]], [], []], "id", "task-name", "class", "validate", "required", "", "aria-required", "true"], ["loc", [null, [8, 7], [8, 97]]]], ["inline", "input", [], ["type", "date", "value", ["subexpr", "@mut", [["get", "task-deadline", ["loc", [null, [13, 40], [13, 53]]]]], [], []], "class", "datepicker", "id", "task-deadline", "required", "", "aria-required", "true"], ["loc", [null, [13, 14], [13, 127]]]], ["element", "action", ["createSubtask"], [], ["loc", [null, [20, 39], [20, 65]]]], ["block", "if", [["get", "enabled", ["loc", [null, [31, 14], [31, 21]]]]], [], 0, null, ["loc", [null, [31, 8], [33, 15]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("planly/templates/components/login-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 6
            },
            "end": {
              "line": 14,
              "column": 6
            }
          },
          "moduleName": "planly/templates/components/login-modal.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "sign-up", [], ["submit", "submit"], ["loc", [null, [13, 6], [13, 33]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 6
          }
        },
        "moduleName": "planly/templates/components/login-modal.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "login");
        dom.setAttribute(el1, "class", "modal");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-content");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "id", "formTitle");
        var el4 = dom.createTextNode("Sign Up");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "loginContent");
        var el4 = dom.createTextNode("\n\n     ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "center-align");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "id", "googleIcon");
        dom.setAttribute(el5, "class", "waves-effect waves-blue btn white");
        var el6 = dom.createElement("img");
        dom.setAttribute(el6, "class", "");
        dom.setAttribute(el6, "src", "assets/g-logo.png");
        dom.setAttribute(el6, "alt", "google");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Sign Up with Google");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "center-align");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "id", "facebookIcon");
        dom.setAttribute(el5, "class", "waves-effect waves-blue btn fbBlue");
        var el6 = dom.createElement("img");
        dom.setAttribute(el6, "class", "");
        dom.setAttribute(el6, "src", "assets/facebooklogo.png");
        dom.setAttribute(el6, "alt", "facebook");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Sign Up with Facebook");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h5");
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("or");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "center-align");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "waves-effect waves-light btn deep-purple darken-3");
        dom.setAttribute(el5, "id", "signupButton");
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons left");
        var el7 = dom.createTextNode("mail_outline");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("Sign Up With Email");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 3]);
        var element1 = dom.childAt(element0, [1, 0]);
        var element2 = dom.childAt(element0, [3, 0]);
        var element3 = dom.childAt(element0, [7, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(element0, 9, 9);
        return morphs;
      },
      statements: [["element", "action", ["signIn", "google"], [], ["loc", [null, [6, 91], [6, 119]]]], ["element", "action", ["signIn", "facebook"], [], ["loc", [null, [7, 95], [7, 125]]]], ["element", "action", ["toggleForm"], [], ["loc", [null, [10, 87], [10, 110]]]], ["block", "if", [["get", "enabled", ["loc", [null, [12, 12], [12, 19]]]]], [], 0, null, ["loc", [null, [12, 6], [14, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("planly/templates/components/project-creation", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 49,
            "column": 0
          }
        },
        "moduleName": "planly/templates/components/project-creation.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "projectCreation");
        dom.setAttribute(el1, "class", "modal modal-fixed-footer");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "nav-wrapper teal");
        var el4 = dom.createElement("h4");
        dom.setAttribute(el4, "class", "center-align");
        var el5 = dom.createTextNode("Create a Project");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-content");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        dom.setAttribute(el4, "class", "col s12");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "center-align");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" Project name ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "name");
        dom.setAttribute(el7, "data-error", "Please enter a project name");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Project Name");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" Project goal");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "goal");
        dom.setAttribute(el7, "data-error", "Please enter a project goal");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Project Goal");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" deadline ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "deadline");
        dom.setAttribute(el7, "data-error", "Please select a deadline");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Deadline");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode(" \n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" team members ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s12");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "password");
        dom.setAttribute(el7, "data-error", "Please enter a valid email");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Team Members");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-footer");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-field col s6");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "class", "btn waves-effect waves-light red darken-1 center-align");
        var el6 = dom.createTextNode(" Cancel\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "input-field col s6 center-align");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "class", "btn waves-effect waves-light deep-purple darken-3");
        var el6 = dom.createTextNode(" Create\n		");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n	");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3, 1, 1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element0, [5, 1]);
        var element4 = dom.childAt(element3, [1, 1]);
        var element5 = dom.childAt(element3, [3, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [7]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [11]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element2, [15]), 1, 1);
        morphs[5] = dom.createElementMorph(element4);
        morphs[6] = dom.createElementMorph(element5);
        morphs[7] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["element", "action", ["createProject"], ["on", "submit"], ["loc", [null, [7, 25], [7, 63]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "name", ["loc", [null, [11, 20], [11, 24]]]]], [], []], "id", "name", "class", "validate", "required", "", "aria-required", "true"], ["loc", [null, [11, 6], [11, 86]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "goal", ["loc", [null, [16, 20], [16, 24]]]]], [], []], "name", "goal", "id", "goal", "class", "validate"], ["loc", [null, [16, 6], [16, 65]]]], ["inline", "input", [], ["type", "date", "value", ["subexpr", "@mut", [["get", "deadline", ["loc", [null, [21, 32], [21, 40]]]]], [], []], "name", "deadline", "id", "deadline", "class", "datepicker validate"], ["loc", [null, [21, 6], [21, 100]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "member", ["loc", [null, [26, 20], [26, 26]]]]], [], []], "name", "member", "id", "member"], ["loc", [null, [26, 6], [26, 54]]]], ["element", "action", ["closeProjectCreation"], [], ["loc", [null, [37, 4], [37, 37]]]], ["element", "action", ["submit"], [], ["loc", [null, [42, 3], [42, 22]]]], ["content", "yield", ["loc", [null, [48, 0], [48, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("planly/templates/components/project-task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "planly/templates/components/project-task.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("planly/templates/components/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 0
            },
            "end": {
              "line": 49,
              "column": 0
            }
          },
          "moduleName": "planly/templates/components/sign-up.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger");
          var el2 = dom.createTextNode("Invalid username or password.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 49,
            "column": 7
          }
        },
        "moduleName": "planly/templates/components/sign-up.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "login-content");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "col s12");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "row");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" first name ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "input-field col s12");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons prefix");
        var el7 = dom.createTextNode("perm_identity");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "first");
        dom.setAttribute(el6, "data-error", "Please enter a valid first name");
        dom.setAttribute(el6, "data-success", "valid");
        var el7 = dom.createTextNode("First Name");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" last name ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "input-field col s12");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons prefix");
        var el7 = dom.createTextNode("perm_identity");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "last");
        dom.setAttribute(el6, "data-error", "Please enter a valid last name");
        dom.setAttribute(el6, "data-success", "valid");
        var el7 = dom.createTextNode("Last Name");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" email ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "input-field col s12");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons prefix");
        var el7 = dom.createTextNode("mail_outline");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "email");
        dom.setAttribute(el6, "data-error", "Please enter a valid email");
        dom.setAttribute(el6, "data-success", "valid");
        var el7 = dom.createTextNode("Email");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" password ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "input-field col s12");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons prefix");
        var el7 = dom.createTextNode("lock_outline");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "password");
        dom.setAttribute(el6, "data-error", "Please enter a valid email");
        dom.setAttribute(el6, "data-success", "valid");
        var el7 = dom.createTextNode("Password");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" confirm password ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "input-field col s12");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons prefix");
        var el7 = dom.createTextNode("lock_outline");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "passwordConfirm");
        dom.setAttribute(el6, "data-error", "Please enter a valid email");
        dom.setAttribute(el6, "data-success", "valid");
        var el7 = dom.createTextNode("Confirm Password");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "center-align");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "btn waves-effect waves-light deep-purple darken-3");
        var el7 = dom.createTextNode(" Submit ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "material-icons right");
        var el8 = dom.createTextNode("send");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [21, 1]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]), 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [7]), 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [11]), 3, 3);
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [15]), 3, 3);
        morphs[6] = dom.createMorphAt(dom.childAt(element1, [19]), 3, 3);
        morphs[7] = dom.createElementMorph(element2);
        morphs[8] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]], ["element", "action", ["updateUser"], ["on", "submit"], ["loc", [null, [4, 24], [4, 59]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "first", ["loc", [null, [9, 19], [9, 24]]]]], [], []], "name", "first", "id", "first", "class", "validate", "required", "", "aria-required", "true"], ["loc", [null, [9, 5], [9, 100]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "last", ["loc", [null, [15, 19], [15, 23]]]]], [], []], "name", "id", "id", "last", "class", "validate"], ["loc", [null, [15, 5], [15, 61]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [21, 19], [21, 24]]]]], [], []], "name", "email", "id", "email", "type", "email", "class", "validate"], ["loc", [null, [21, 5], [21, 80]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [28, 19], [28, 27]]]]], [], []], "name", "password", "id", "password", "type", "password", "class", "validate"], ["loc", [null, [28, 5], [28, 92]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "passwordConfirm", ["loc", [null, [34, 19], [34, 34]]]]], [], []], "id", "passwordConfirm", "type", "password", "class", "validate"], ["loc", [null, [34, 5], [34, 90]]]], ["element", "action", ["submit"], [], ["loc", [null, [39, 5], [39, 24]]]], ["block", "if", [["get", "loginFailed", ["loc", [null, [47, 6], [47, 17]]]]], [], 0, null, ["loc", [null, [47, 0], [49, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("planly/templates/components/sub-task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 6
          }
        },
        "moduleName": "planly/templates/components/sub-task.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "sub-task");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n	    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "col s12");
        var el4 = dom.createTextNode("\n	    	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "card z-depth-0");
        var el5 = dom.createTextNode("\n	      		");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "row");
        var el6 = dom.createTextNode("\n				        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s6");
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n							");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "task-name");
        dom.setAttribute(el7, "data-error", "Please enter the task name");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Add a new task!");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "input-field col s6");
        var el7 = dom.createTextNode("\n				        	");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "material-icons prefix");
        var el8 = dom.createTextNode("date_range");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				          ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						  ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "for", "task-deadline");
        dom.setAttribute(el7, "data-error", "Please select deadline");
        dom.setAttribute(el7, "data-success", "valid");
        var el8 = dom.createTextNode("Deadline");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n				        ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "card-action");
        var el7 = dom.createTextNode("\n		    				");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col s1");
        var el8 = dom.createTextNode("\n		    					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8, "class", "btn-floating yellow darken-1");
        var el9 = dom.createElement("i");
        dom.setAttribute(el9, "class", "material-icons");
        var el10 = dom.createTextNode("person_add");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n		    				");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n		    				");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "col s1");
        var el8 = dom.createTextNode("\n		    					");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("a");
        dom.setAttribute(el8, "class", "btn-floating green");
        var el9 = dom.createElement("i");
        dom.setAttribute(el9, "class", "material-icons");
        var el10 = dom.createTextNode("attach_file");
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n		    				");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n		    			");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("end of card-action");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1, 1, 1, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "task-name", ["loc", [null, [8, 21], [8, 30]]]]], [], []], "id", "task-name", "class", "validate", "required", "", "aria-required", "true"], ["loc", [null, [8, 7], [8, 97]]]], ["inline", "input", [], ["type", "date", "value", ["subexpr", "@mut", [["get", "task-deadline", ["loc", [null, [13, 40], [13, 53]]]]], [], []], "class", "datepicker", "id", "task-deadline", "required", "", "aria-required", "true"], ["loc", [null, [13, 14], [13, 127]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("planly/templates/partials/-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 9
          }
        },
        "moduleName": "planly/templates/partials/-footer.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1, "id", "foot");
        dom.setAttribute(el1, "class", "page-footer  indigo");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col l6 s12");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h5");
        dom.setAttribute(el5, "class", "white-text");
        var el6 = dom.createTextNode("Footer Content");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "grey-text text-lighten-4");
        var el6 = dom.createTextNode("You can use rows and columns here to organize your footer content.");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "footer-copyright");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "container");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "grey-text text-lighten-4 right");
        dom.setAttribute(el4, "href", "#!");
        var el5 = dom.createTextNode("More Links");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [0, 3, 1]), 1, 1);
        return morphs;
      },
      statements: [["inline", "copyright", ["Planly"], [], ["loc", [null, [12, 6], [12, 30]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("planly/templates/partials/-nav", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "planly/templates/partials/-nav.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		  Logged in as ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn-flat");
          var el2 = dom.createTextNode("Sign out");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createElementMorph(element1);
          morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["content", "session.currentUser.displayName", ["loc", [null, [7, 17], [7, 52]]]], ["element", "action", ["signOut"], [], ["loc", [null, [8, 29], [8, 49]]]], ["content", "outlet", ["loc", [null, [9, 4], [9, 14]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.12",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "planly/templates/partials/-nav.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn-flat");
          var el2 = dom.createTextNode("Sign in");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["openModal"], [], ["loc", [null, [11, 29], [11, 51]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.12",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 7
          }
        },
        "moduleName": "planly/templates/partials/-nav.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n   ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "nav-wrapper indigo");
        var el3 = dom.createTextNode("\n     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        dom.setAttribute(el3, "class", "brand-logo");
        var el4 = dom.createTextNode("Planly");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n     ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "id", "nav-mobile");
        dom.setAttribute(el3, "class", "right hide-on-med-and-down");
        var el4 = dom.createTextNode("\n      	 ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("		");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n     ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n   ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 3, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [6, 8], [6, 31]]]]], [], 0, 1, ["loc", [null, [6, 2], [12, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('planly/torii-adapters/application', ['exports', 'ember', 'emberfire/torii-adapters/firebase'], function (exports, _ember, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({
    firebase: _ember['default'].inject.service()
  });
});
define('planly/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('planly/config/environment', ['ember'], function(Ember) {
  var prefix = 'planly';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("planly/app")["default"].create({"name":"planly","version":"0.0.0+c514977b"});
}

/* jshint ignore:end */
//# sourceMappingURL=planly.map