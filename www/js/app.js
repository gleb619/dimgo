// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic', 
    'starter.controllers', 
    'toaster',
    'uiGmapgoogle-maps'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
  $stateProvider

    .state('app', {
		url : '/app',
		abstract : true,
		templateUrl : 'templates/menu.html',
		controller : 'AppCtrl'
	})

	.state('app.search', {
		url : '/search',
		views : {
			'menuContent' : {
				templateUrl : 'templates/search.html'
			}
		}
	})

	.state('app.browse', {
		url : '/browse',
		views : {
			'menuContent' : {
				templateUrl : 'templates/browse.html'
			}
		}
	})
	
	.state('app.main', {
		url : '/main',
		views : {
			'menuContent' : {
				templateUrl : 'templates/main_page.html',
				controller : 'MainControllerCtrl'
			}
		}
	})
	
	.state('app.gooddetail', {
		url : '/main/:id',
		views : {
			'menuContent' : {
				templateUrl : 'templates/good.html',
				controller : 'GoodCtrl'
			}
		}
	})
	
	.state('app.playlists', {
		url : '/playlists',
		views : {
			'menuContent' : {
				templateUrl : 'templates/playlists.html',
				controller : 'PlaylistsCtrl'
			}
		}
	})

	.state('app.single', {
		url : '/playlists/:playlistId',
		views : {
			'menuContent' : {
				templateUrl : 'templates/playlist.html',
				controller : 'PlaylistCtrl'
			}
		}
	});
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');

  $httpProvider.interceptors.push(function ($q, $rootScope, $location, toaster) {
      return {
			request : function(request) {
				// console.info('request: ', request);

				return request;
			},
			response : function(response) {
				// console.info('response: ', response);

				if (typeof response.data === 'string') {
					if (response.data.indexOf instanceof Function && response.data.indexOf('<body id="loginpage0"') != -1) {
						window.location.replace("../login?logout");
					}
				}

				return response;
			},
			responseError : function(rejection) {
				console.info('rejection: ', rejection);

				var status = rejection.status;
				var config = rejection.config;
				var method = config.method;
				var url = config.url;

				toaster.pop('error', "An error has occurred", method + " on " + url + " failed with status " + status);

				return $q.reject(rejection);
			}
		};
	});

//	$httpProvider.defaults.cache = false;

	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	
})
.constant("APP_INFO", {
      name: "starter-crm"
    , version: "1.0.0.1"
    , simple_version: 0.12
    , debug: true
    , prefix: "starter"
    , url: "http://localhost:8081/com.springsource.samples.webmvc/resources/"
});
;
