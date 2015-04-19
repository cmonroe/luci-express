angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "phone.numbers", 
		text: "Numbers", 
		page: "/pages/phone.numbers.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("PhoneNumbersPageCtrl", function($scope){
	
}); 
