angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "wifi.general", 
		text: "General", 
		page: "/pages/wifi.general.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("WifiGeneralPageCtrl", function($scope){
	
}); 
