angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "settings.configuration", 
		text: "Configuration", 
		page: "/pages/settings.configuration.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("SettingsConfigurationCtrl", function($scope){
	
}); 
