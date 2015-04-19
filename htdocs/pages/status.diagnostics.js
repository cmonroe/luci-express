angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.diagnostics", 
		text: "Diagnostics", 
		page: "/pages/status.diagnostics.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusDiagnostics", function($scope){
	
}); 
