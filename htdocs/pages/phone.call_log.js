angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "phone.call_log", 
		text: "Call Log", 
		page: "/pages/phone.call_log.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("PhoneCallLogPageCtrl", function($scope){
	
}); 
