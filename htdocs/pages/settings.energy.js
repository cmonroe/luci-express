angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "settings.energy", 
		text: "Energy", 
		page: "/pages/settings.energy.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("SettingsEnergyCtrl", function($scope){
	
}); 
