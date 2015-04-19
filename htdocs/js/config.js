angular.module("luci")
.factory('$config', function($rootScope){
	var config = {
		rpc: {
			exposed_calls: [
				"session.login", 
				"router.dslstats",
				"router.info",
				"system.info"
			]
		}
	}; 
	return config; 
}); 
