(function() {
	'use strict';
	
	angular.module('starter').controller('GoodCtrl', GoodCtrl);
	
	GoodCtrl.$inject = ['$scope', '$timeout', '$ionicLoading', '$ionicModal', 'toaster', 'APP_INFO' ];
	function GoodCtrl ($scope, $timeout, $ionicLoading, $ionicModal, toaster, APP_INFO) {
		$scope.d = new Object();
		$scope.d.item = new Array();
		$scope.d.store = new Object();
		$scope.d.map = { center: { latitude: 43.241020807439114, longitude: 76.87820083618156 }, zoom: 12 };
		
		$ionicModal.fromTemplateUrl('templates/order.html', {
			scope : $scope
		}).then(function(modal) {
			$scope.orderModal = modal;
		});
		
		$ionicModal.fromTemplateUrl('templates/map.html', {
			scope : $scope
		}).then(function(modal) {
			$scope.mapModal = modal;
		});
		
		$scope.closeMap = function() {
			$scope.mapModal.hide();
		};
		
		$scope.openMap = function() {
			console.info(": ", 'test');
			$scope.mapModal.show();
		};
		
		$scope.closeOrder = function() {
			$scope.orderModal.hide();
		};

		$scope.order = function() {
			$scope.orderModal.show();
		};

		$scope.doOrder = function() {
			console.info(": ", 'test');
			toaster.pop('success', "Order " + 1, 'Your order was successful confirmd.');
			$scope.closeOrder();
		};		
		
		$scope.loading = function(enable) {
			let timer = $timeout(function() {
				if(enable){
					$ionicLoading.show({
						template: 'Loading...'
					});
				}
				else {
					$ionicLoading.hide();
				}
				
				$timeout.cancel(timer);
				timer = null;
			}, 100);
		};

		$scope.mockup_load = function() {
			$scope.loading(true);
			$scope.d.store.url = angular.copy(APP_INFO.url);;
			$scope.d.item = null;
			$scope.d.item = new Object();
			$scope.d.item.name = '123';
			$scope.d.item.price = 10000;
			$scope.d.item.lastprice = 25457;
			$scope.d.item.address = '270 Edgewood Road Zion, IL 60099';
			$scope.d.item.availability = true;
			$scope.d.item.image = 'test3.jpg';
			$scope.d.item.color = '#9B8BC7';
			$scope.d.item.images = new Array();
			
			for (var index = 0; index < 3; index++) {
				$scope.d.item.images.push({ caption: 'image' + index, image: 'test' + index + '.jpg' });	
			}
			
			$scope.loading(false);
		};
		
		$scope.refresh = function() {
			$scope.d.item = null;
			$scope.d.item = new Object();
			let timer = $timeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
				$scope.mockup_load();

				$timeout.cancel(timer);
				timer = null;
			}, 20);

		};
		
		$scope.init = function(callback) {
			$scope.mockup_load();
			if(callback){
				callback();
			}
		};
		
		/*---------------------------*/
		
		(function() {
			$scope.init(function() {
				console.info("init#good");
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