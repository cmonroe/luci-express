angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "wifi.mac_filter", 
		text: "Mac Filter", 
		page: "/pages/wifi.mac_filter.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("WifiMacFilterPageCtrl", function($scope){
	
}); 
