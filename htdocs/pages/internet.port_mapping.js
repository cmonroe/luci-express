angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "internet.port_mapping", 
		text: "Port Mapping", 
		page: "/pages/internet.port_mapping.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("InternetPortMappingPageCtrl", function($scope){
	
}); 
