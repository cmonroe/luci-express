angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "internet.exposed_host", 
		text: "Exposed Host", 
		page: "/pages/internet.exposed_host.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("InternetExHostPageCtrl", function($scope){
	
}); 
