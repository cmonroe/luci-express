angular.module("luci")
.factory('$config', function($rootScope){
	return {
		themes: {
			"default": "/themes/default/",
			"red" : "/themes/inteno-red/"
		}, 
		rpc: {
			exposed_calls: [
				"session.login", 
				"router.dslstats",
				"router.info",
				"system.info"
			]
		}
	}; 
}); 
