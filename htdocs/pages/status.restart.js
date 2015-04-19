angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.restart", 
		text: "Restart", 
		page: "/pages/status.restart.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusRestartPageCtrl", function($scope){
	
}); 
