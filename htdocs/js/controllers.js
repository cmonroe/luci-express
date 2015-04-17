
/*
angular.module('luci.login').controller('LoginModalCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: '/view/login.html',
      controller: 'LoginModalCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

angular.module('luci.login').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
*/

angular.module("luci")
	.controller("HomePage", function ($scope, $session, $rootScope, $rpc) {
		$session.login({
			username: "root", 
			password: "test"
		}, function(sid){
			$rpc.router.dslstats({}, function(stats){
				alert(JSON.stringify(stats)); 
			}); 
		}, function(result){
			
		}); 
	})
	.controller("StatsCtrl", function($scope, $rpc, $session){
		$scope.dslstats = {}; 
		$session.login({
			username: "root", 
			password: "test"
		}, function(sid){
			$rpc.router.dslstats({}, function(dslstats){
				dslstats = dslstats.dslstats; 
				
				// todo fields
				with({dslstats: dslstats}){
					dslstats.ip = "TODO"; 
					dslstats.ipstate = "TODO"; 
					dslstats.mode_details = "TODO"; 
					dslstats.line_status_configured = "TODO"; 
					dslstats.line_type_configured = "TODO"; 
					dslstats.line_type = "TODO"; 
				}
				
				// compute floating point values (because ubus blobs do not support floats yet)
				function reconstruct_floats(obj) {
					for (var property in obj) {
						if (obj.hasOwnProperty(property)) {
							if (typeof obj[property] == "object") {
								reconstruct_floats(obj[property]);
							} else {
								var matches = property.match(/(.*)_x([\d]*)/); 
								if(matches && matches.length == 3){
									try {
										obj[matches[1]] = parseFloat(String(obj[property])) / parseFloat(matches[2]); 
									} catch(e) {
										obj[matches[1]] = "Err"; 
									}
								}
							}
						}
					}
				}
				reconstruct_floats(dslstats); 
				
				//alert("Settings stats to: "+JSON.stringify(stats)); 
				$scope.dslstats = dslstats; 
				$scope.$apply(); 
			}); 
		}); 
	})
	.controller("StatsOverviewCtrl", function ($scope, $session, $rootScope, $rpc) {
		$scope.sysinfo = {}; 
		$scope.info = {}; 
		$session.login({
			username: "root", 
			password: "test"
		}, function(sid){
			$rpc.router.info({}, function(stats){
				$scope.info = stats; 
				$scope.$apply(); 
			}); 
			$rpc.system.info({}, function(sysinfo){
				sysinfo.date = String(new Date(sysinfo.localtime));
				sysinfo.loadavg = (sysinfo.load[0] * 0.0001) + " " + (sysinfo.load[1] * 0.0001) + " "+ (sysinfo.load[2] * 0.0001);
				sysinfo.memory.free_pcnt = ((sysinfo.memory.free / sysinfo.memory.total) * 100); 
				sysinfo.memory.buffered_pcnt = (sysinfo.memory.buffered / sysinfo.memory.total) * 100; 
				sysinfo.memory.buffered_kb = sysinfo.memory.buffered / 1000; 
				sysinfo.memory.free_kb = sysinfo.memory.free / 1000; 
				sysinfo.memory.shared_kb = sysinfo.memory.shared / 1000; 
				$scope.sysinfo = sysinfo; 
				$scope.$apply(); 
			}); 
		}, function(result){
			
		}); 
	})
	.controller("BodyCtrl", function ($scope, $location, $window) {
		
		$scope.menuClass = function(page) {
			var current = $location.path().substring(1);
			return page === current ? "active" : "";
		};
	})
	.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	})
	.controller('LoginModalCtrl', function ($scope, $modal, $log) {
		
		$scope.items = ['item1', 'item2', 'item3'];

		$scope.open = function (size) {

			var modalInstance = $modal.open({
				templateUrl: '/views/login.html',
				controller: 'LoginModalCtrl',
				size: size,
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	})
	.controller("HeaderController", function($scope, $location) { 
		$scope.isActive = function (viewLocation) { 
			return viewLocation === $location.path();
		};
	}); 

