angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.about", 
		text: "About", 
		page: "/pages/status.about.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusAbout", function($scope){
	
}); 
