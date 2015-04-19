angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "wifi.wps", 
		text: "WPS", 
		page: "/pages/wifi.wps.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("WifiWPSPageCtrl", function($scope){
	
}); 
