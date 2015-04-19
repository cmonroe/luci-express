angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "settings.upgrade", 
		text: "Upgrade", 
		page: "/pages/settings.upgrade.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("SettingsUpgradeCtrl", function($scope){
	
}); 
