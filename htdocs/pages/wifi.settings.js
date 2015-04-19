angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "wifi.settings", 
		text: "Settings", 
		page: "/pages/wifi.settings.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("WifiSettingsPageCtrl", function($scope){
	
}); 
