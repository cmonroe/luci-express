angular.module("luci")
	.directive("luciLogin", function(){
		return {
			// accepted parameters for this tag
			scope: {
			}, 
			templateUrl: "widgets/luci.login.html", 
			replace: true, 
			controller: "LoginControl",
			controllerAs: "ctrl"
		}; 
	})
	.controller("LoginControl", function($scope, $session){
	$scope.form = { "username": "", "password": "", "remember": 0 }; 
	$scope.doLogin = function(){
		$session.login({
			"username": $scope.form.username, 
			"password": $scope.form.password
		}, function success(res){
			alert("Logged in!"); 
		}, function fail(res){
			alert("Login failed!"); 
		}); 
	}
}); 
