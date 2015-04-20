angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "login", 
		text: "Login",
		page: "/pages/login.html"
	});
})
.controller("LoginPageCtrl", function($scope){
	
}); 
