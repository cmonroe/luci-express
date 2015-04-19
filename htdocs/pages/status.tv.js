angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.tv", 
		text: "TV", 
		page: "/pages/status.tv.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusTVPageCtrl", function($scope){
	
}); 
