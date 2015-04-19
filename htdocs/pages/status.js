angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status", 
		text: "Status"
	});
});
