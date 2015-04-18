angular.module("luci")
.config(function($stateProvider){
	$stateProvider.state("status_overview",
		{
			url: "/status.overview", 
			views: {
				"content": {
					templateUrl: "/views/status.overview.html"
				}, 
				"navbar": {
					templateUrl: "/views/navbar.html"
				}
			}
		}); 
})
.controller("StatsOverviewCtrl", function ($scope, $session, $rootScope, $rpc) {
	$scope.sysinfo = {}; 
	$scope.info = {}; 
	
	$rpc.router.info({}, function(stats){
		$scope.info = stats; 
		$scope.$apply(); 
	}); 
	$rpc.system.info({}, function(sysinfo){
		sysinfo.date = String(new Date(sysinfo.localtime));
		sysinfo.loadavg = (sysinfo.load[0] * 0.0001) + " " + (sysinfo.load[1] * 0.0001) + " "+ (sysinfo.load[2] * 0.0001);
		sysinfo.memory.free_pcnt = ((sysinfo.memory.free / sysinfo.memory.total) * 100); 
		sysinfo.memory.buffered_pcnt = (sysinfo.memory.buffered / sysinfo.memory.total) * 100; 
		sysinfo.memory.buffered_kb = sysinfo.memory.buffered / 1000; 
		sysinfo.memory.free_kb = sysinfo.memory.free / 1000; 
		sysinfo.memory.shared_kb = sysinfo.memory.shared / 1000; 
		$scope.sysinfo = sysinfo; 
		$scope.$apply(); 
	}); 
}); 
