angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "wifi", 
		text: "WiFi"
	}); 
}); 
