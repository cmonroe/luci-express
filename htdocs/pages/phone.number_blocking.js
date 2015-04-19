angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "phone.number_blocking", 
		text: "Number Blocking", 
		page: "/pages/phone.number_blocking.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("PhoneNumberBlockingPageCtrl", function($scope){
	
}); 
