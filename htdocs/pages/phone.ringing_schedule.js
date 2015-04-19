angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "phone.ringing_schedule", 
		text: "Ringing Schedule", 
		page: "/pages/phone.ringing_schedule.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("PhoneRingingScheduleCtrl", function($scope){
	
}); 
