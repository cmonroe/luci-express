//! Author: Martin K. Schröder <mkschreder.uk@gmail.com>
JUCI.app
.directive("overviewWidget10Network", function(){
	return {
		templateUrl: "widgets/overview.net.html", 
		controller: "overviewWidgetNetwork", 
		replace: true
	 };  
})
.directive("overviewStatusWidget10Network", function(){
	return {
		templateUrl: "widgets/overview.net.small.html", 
		controller: "overviewStatusWidgetNetwork", 
		replace: true
	 };  
})
.controller("overviewStatusWidgetNetwork", function($scope, $uci, $rpc){
	$scope.statusClass = "text-success"; 
	JUCI.interval.repeat("overview-network", 1000, function(done){
		async.series([function(next){
			// TODO: move this to factory
			$rpc.juci.network.clients().done(function(res){
				$scope.numClients = res.clients.length; 
				$scope.done = 1; 
			}); 
		}], function(){
			done(); 
		}); 
	}); 
	
})
.controller("overviewWidgetNetwork", function($scope, $rpc, $uci, $config, $network, $tr, gettext){
	$scope.defaultHostName = $tr(gettext("Unknown")); 
	async.series([
	function(next){
		// TODO: move this to factory
		$rpc.network.interface.dump().done(function(interfaces){
			var conn = ""; 
			if(interfaces && interfaces.interface){
				var i = interfaces.interface.find(function(x){
					return x.interface == $config.wan_interface; 
				})
				if(i){
					var dev = i.l3_device||i.device||""; 
					if(dev.indexOf("atm") == 0) conn = "ADSL"; 
					else if(dev.indexOf("ptm") == 0) conn = "VDSL"; 
					else if(dev.indexOf("eth") == 0) conn = "FTTH"; 
					else if(dev.indexOf("wwan") == 0) conn = "LTE"; 
					else if(dev.indexOf("wl") == 0) conn = "Wi-Fi"; 
					else conn = $tr(gettext("Network")); 
				}
			} 
			$scope.wan_type = conn; 
		}).always(function(){ next(); }); 
	}, 
	function(next){
		$network.getConnectedClients().done(function(clients){
			// TODO: this is not static. Need to find a way to more reliably separate lan and wan so we can list lan clients from all lans without including wans. 
			$scope.clients = clients.filter(function(cl) { return cl.device == "br-lan"; }); 
			next(); 
		}).fail(function(){
			next();
		});; 
	}], function(){
		$scope.$apply(); 
	}); 
}); 
