$juci.module("router")
.controller("InternetFirewallPageCtrl", function($scope, $uci){
	$uci.sync("firewall").done(function(){
		$scope.firewall = $uci.firewall; 
		//settings.firewall = Number(settings.firewall); 
		//settings.ping_wan = Number(settings.ping_wan); 
		
		$scope.$apply(); 
	}); 
}); 
