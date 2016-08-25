require("source-map-support").install();
exports.id = 0;
exports.modules = [
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		function checkForUpdate(fromUpdate) {
			module.hot.check(function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update.");
						console.warn("[HMR] " + err.stack || err.message);
						console.warn("[HMR] You need to restart the application!");
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}
				if(!updatedModules) {
					if(fromUpdate)
						console.log("[HMR] Update applied.");
					else
						console.warn("[HMR] Cannot find update.");
					return;
				}
	
				module.hot.apply({
					ignoreUnaccepted: true
				}, function(err, renewedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update (Need to do a full reload!)");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
	
					__webpack_require__(2)(updatedModules, renewedModules);
	
					checkForUpdate(true);
				});
			});
		}
	
		process.on(__resourceQuery.substr(1) || "SIGUSR2", function() {
			if(module.hot.status() !== "idle") {
				console.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
				console.warn("[HMR] Need to be in idle state to start hot update.");
				return;
			}
	
			checkForUpdate();
		});
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
/***/ function(module, exports) {



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var App_1 = __webpack_require__(5);
	var path = __webpack_require__(7);
	normalizePath();
	var app = new App_1.App().App;
	var debug = __webpack_require__(14)("mysite:server");
	var http = __webpack_require__(15);
	var port = normalizePort(process.env.PORT || "4000");
	app.set("port", port);
	var server = http.createServer(app);
	server.listen(port);
	server.on("error", onError);
	server.on("listening", onListening);
	function normalizePath() {
	    if (process.env.NODE_PATH) {
	        return;
	    }
	    process.env.NODE_PATH = path.resolve(path.join(__dirname, "..", "..", ".deploy"));
	    console.log("App path: " + process.env.NODE_PATH);
	}
	function normalizePort(val) {
	    var port = parseInt(val, 10);
	    if (isNaN(port)) {
	        return val;
	    }
	    if (port >= 0) {
	        return port;
	    }
	    return false;
	}
	function onError(error) {
	    if (error.syscall !== "listen") {
	        throw error;
	    }
	    var bind = typeof port === "string"
	        ? "Pipe " + port
	        : "Port " + port;
	    switch (error.code) {
	        case "EACCES":
	            console.error(bind + " requires elevated privileges");
	            process.exit(1);
	            break;
	        case "EADDRINUSE":
	            console.error(bind + " is already in use");
	            process.exit(1);
	            break;
	        default:
	            throw error;
	    }
	}
	function onListening() {
	    var addr = server.address();
	    var bind = typeof addr === "string"
	        ? "pipe " + addr
	        : "port " + addr.port;
	    debug("Listening on " + bind);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "Server\\App"))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var express = __webpack_require__(6);
	var path = __webpack_require__(7);
	var Routes_1 = __webpack_require__(8);
	var App = (function () {
	    function App() {
	        this.Routes = [];
	        this.App = express();
	        this.ConfigApp();
	        this.ConfigRoutes();
	    }
	    App.prototype.ConfigApp = function () {
	        //this.App.use(UnCapitalize);
	        this.App.use(express.static(process.env.NODE_PATH + "/public"));
	    };
	    App.prototype.ConfigRoutes = function () {
	        var router = express.Router();
	        var apiAdress = "/api/v1/";
	        router.get("/", this.index);
	        this.Routes.push(new Routes_1.PeopleRoute());
	        this.Routes.forEach(function (route) { return route.SetUp(router, apiAdress); });
	        this.App.use(router);
	        this.App.use(this.index);
	    };
	    App.prototype.index = function (req, res, next) {
	        res.sendFile(path.resolve(process.env.NODE_PATH + '/public/index.html'));
	    };
	    return App;
	}());
	exports.App = App;


/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(9));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Services_1 = __webpack_require__(10);
	var PeopleRoute = (function () {
	    function PeopleRoute() {
	        this.peopleService = new Services_1.PeopleService();
	    }
	    PeopleRoute.prototype.Index = function (req, res) {
	        this.peopleService.GetPeople(req.query.count || 50)
	            .map(function (value, index) { return value; })
	            .subscribe(function (result) { return res.json(result); });
	    };
	    PeopleRoute.prototype.Company = function (req, res) {
	        this.peopleService.GetPerson()
	            .map(function (value, index) { return value; })
	            .subscribe(function (result) { return res.json(result); });
	    };
	    PeopleRoute.prototype.SetUp = function (router, baseAddress) {
	        var _this = this;
	        router.get(baseAddress + "people/", function (req, res) { return _this.Index(req, res); });
	        router.get(baseAddress + "people/company", function (req, res) { return _this.Company(req, res); });
	    };
	    return PeopleRoute;
	}());
	exports.PeopleRoute = PeopleRoute;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(11));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var rxjs_1 = __webpack_require__(12);
	__webpack_require__(13);
	var PeopleService = (function () {
	    function PeopleService() {
	    }
	    PeopleService.prototype.GetPerson = function () {
	        return rxjs_1.Observable.create(function (observer) {
	            observer
	                .next({
	                Name: "Márvio",
	                Email: "1@2.com",
	                IdPerson: "1"
	            });
	            observer.complete();
	        });
	    };
	    PeopleService.prototype.GetPeople = function (count) {
	        return rxjs_1.Observable.create(function (observer) {
	            var result = [];
	            for (var index = 0; index < count; index++) {
	                result.push({
	                    Name: "Márvio " + index.toString(),
	                    Email: index.toString() + "@2.com",
	                    IdPerson: index.toString()
	                });
	            }
	            observer
	                .next(result);
	            observer.complete();
	        });
	    };
	    return PeopleService;
	}());
	exports.PeopleService = PeopleService;


/***/ }
];
//# sourceMappingURL=0.38ffc629f5953d82b5be.hot-update.js.map