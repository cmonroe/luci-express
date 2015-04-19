angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "settings.network", 
		text: "Network", 
		page: "/pages/settings.network.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("SettingsNetworkCtrl", function($scope){
	
}); 
