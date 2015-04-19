angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "internet.firewall", 
		text: "Firewall", 
		page: "/pages/internet.firewall.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("InternetFirewallPageCtrl", function($scope){
	
}); 
