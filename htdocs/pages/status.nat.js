angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.nat", 
		text: "NAT", 
		page: "/pages/status.nat.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusNATPageCtrl", function($scope){
	
}); 
