
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
	}); 

