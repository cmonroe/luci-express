angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.events", 
		text: "Events", 
		page: "/pages/status.events.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusEventsPageCtrl", function($scope){
	
}); 
