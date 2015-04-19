angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "internet.dns", 
		text: "DNS", 
		page: "/pages/internet.dns.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("InternetDNSPageCtrl", function($scope){
	
}); 
