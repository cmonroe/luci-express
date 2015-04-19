angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "phone.speed_dialing", 
		text: "Speed Dialing", 
		page: "/pages/phone.speed_dialing.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("PhoneSpeedDialingCtrl", function($scope){
	
}); 
