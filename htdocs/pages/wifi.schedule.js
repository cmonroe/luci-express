angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "wifi.schedule", 
		text: "Schedule", 
		page: "/pages/wifi.schedule.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("WifiSchedulePageCtrl", function($scope){
	
}); 
