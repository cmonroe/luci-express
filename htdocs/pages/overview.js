angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "overview", 
		text: "Overview"
	});
	$navigationProvider.register({
		path: "overview.overview", 
		text: "Overview", 
		page: "/pages/overview.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("OverviewPageCtrl", function($scope){
	
}); 
