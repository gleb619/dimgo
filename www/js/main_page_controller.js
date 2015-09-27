(function() {
	'use strict';
	
	angular.module('starter').controller('MainControllerCtrl', MainControllerCtrl);
	
	MainControllerCtrl.$inject = ['$scope', '$timeout', 'APP_INFO' ];
	function MainControllerCtrl ($scope, $timeout, APP_INFO) {
//		MainControllerCtrl.$inject = ['$scope', '$timeout', '$q', '$servicesStorage', '$staticStorage', 'toaster', '$route', '$location', '$rootScope', 'APP_INFO' ];
//		function MainControllerCtrl ($scope, $timeout, $q, $servicesStorage, $staticStorage, toaster, $route, $location, $rootScope, APP_INFO) {
		$scope.d = new Object();
		$scope.d.filtered = new Array();
		$scope.d.data = new Array();
		$scope.d.store = new Object();
		
		$scope.render = function() {
			$scope.d.filtered = null;
			
			let timer = $timeout(function() {
				$scope.d.filtered = angular.copy($scope.d.data);

				$timeout.cancel(timer);
				timer = null;
			}, 20);
		};
		
		$scope.stopLoading = function() {
			let timer = $timeout(function() {
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.render();

				$timeout.cancel(timer);
				timer = null;
			}, 1000);
		};

		$scope.mockup_load = function() {
			$scope.d.store.url = angular.copy(APP_INFO.url);;
			$scope.d.data = null;
			$scope.d.data = new Array();
			for (var index = 0; index < 5; index++) {
				$scope.d.data.push($scope.mockup_detaItem(index));
			}
			
			$scope.render();
		};
		
		$scope.mockup_load_more = function() {
			console.info("$scope.mockup_load_more#$scope.d.data: ", $scope.d.data.length);
			for (var index = 0; index < 2; index++) {
				$scope.d.data.push($scope.mockup_detaItem(index + $scope.d.data.length));
			}
			$scope.stopLoading();
		};
			
		$scope.mockup_detaItem = function(index) {
			let object = new Object();
			object.id = index;
			object.sellerimage = 'test1.jpg';
			object.name = 'good' + index;
			object.price = 1000;
			object.lastprice = 2000;
			object.image = 'test2.jpg';
			
			return object;
		};
		
		$scope.init = function(callback) {
			if(callback){
				callback();
			}
			$scope.mockup_load();
		};
		
		/*---------------------------*/
		
		(function() {
			$scope.init(function() {
				console.info("test: ", 1);
			});
		})()
		
		$scope.$on('$destroy', function() {
			for (var key in $scope) {
				if (key.substr(0, 1) != '$' && key != 'this')
					delete $scope[key];
			}
		});
		
	}
})();