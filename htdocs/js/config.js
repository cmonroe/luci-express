angular.module("luci").factory('$config', function($rootScope){
	return {
		mode: "basic", // basic or expert supported
		themes: {
			"default": "/themes/default/",
			"red" : "/themes/default-red/"
		}, 
		rpc: {
			host: "", // default is the same host that runs the gui 
			exposed_calls: [
				"session.login", 
				"session.access", 
				"session.destroy", 
				"luci2.ui.menu", 
				"router.dslstats",
				"router.info",
				"system.info"
			]
		}
	}; 
}); 
