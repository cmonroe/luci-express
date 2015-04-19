angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "settings.password", 
		text: "Password", 
		page: "/pages/settings.password.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("SettingsPasswordCtrl", function($scope){
	
}); 
