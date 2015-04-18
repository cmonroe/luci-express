angular.module("luci").controller("LoginCtrl", function($scope, $session){
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
