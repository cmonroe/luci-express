angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "internet", 
		text: "Internet"
	}); 
}); 
