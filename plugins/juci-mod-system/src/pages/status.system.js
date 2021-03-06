//! Author: Martin K. Schröder <mkschreder.uk@gmail.com>

JUCI.app
.controller("StatusSystemPage", function ($scope, $rootScope, $rpc, gettext, $tr) {
	$scope.systemStatusTbl = {
		rows: [["", ""]]
	}; 
	$scope.systemMemoryTbl = {
		rows: [["", ""]]
	}; 
	$scope.systemStorageTbl = {
		rows: [["", ""]]
	}; 
	var info = {};
	var sys = {};  
	var filesystems = []; 
	
	JUCI.interval.repeat("status.system.refresh", 1000, function(resume){
		async.parallel([
			function (cb){$rpc.juci.system.info().done(function(res){info = res; cb();}).fail(function(res){cb();});},
			function (cb){$rpc.system.info().done(function(res){sys = res; cb();}).fail(function(res){cb();});},
			function (cb){$rpc.juci.system.filesystems().done(function(res){
				filesystems = res.filesystems; 
				cb();
			}).fail(function(res){cb();});}
		], function(err){
			function timeFormat(secs){
				secs = Math.round(secs);
				var hours = Math.floor(secs / (60 * 60));

				var divisor_for_minutes = secs % (60 * 60);
				var minutes = Math.floor(divisor_for_minutes / 60);

				var divisor_for_seconds = divisor_for_minutes % 60;
				var seconds = Math.ceil(divisor_for_seconds);
				
				function pad(a,b){return(1e15+a+"").slice(-b)}; 
				
				return pad(hours,2)+":"+pad(minutes,2)+":"+pad(seconds,2);
			}
			$scope.systemStatusTbl.rows = [
				[$tr(gettext("Hostname")), info.system.name],
				[$tr(gettext("Model")), info.system.hardware],
				[$tr(gettext("Firmware Version")), info.system.firmware],
				[$tr(gettext("Kernel Version")), info.system.kernel],
				[$tr(gettext("Local Time")), new Date(sys.localtime * 1000)],
				[$tr(gettext("Uptime")), timeFormat(sys.uptime)]
				//[$tr(gettext("Load Average")), sys.load[0] + " " + sys.load[1] + " " + sys.load[2]]
			]; 
			$scope.systemMemoryTbl.rows = [
				[$tr(gettext("Usage")), '<juci-progress value="'+Math.round((sys.memory.total - sys.memory.free) / 1000)+'" total="'+ Math.round(sys.memory.total / 1000) +'" units="kB"></juci-progress>'],
				[$tr(gettext("Shared")), '<juci-progress value="'+Math.round(sys.memory.shared / 1000)+'" total="'+ Math.round(sys.memory.total / 1000) +'" units="kB"></juci-progress>'],
				[$tr(gettext("Buffered")), '<juci-progress value="'+Math.round(sys.memory.buffered / 1000)+'" total="'+ Math.round(sys.memory.total / 1000) +'" units="kB"></juci-progress>'],
				[$tr(gettext("Swap")), '<juci-progress value="'+Math.round((sys.swap.total - sys.swap.free) / 1000)+'" total="'+ Math.round(sys.swap.total / 1000) +'" units="kB"></juci-progress>']
			];
			
			$scope.systemStorageTbl.rows = []; 
			filesystems.map(function(disk){
				$scope.systemStorageTbl.rows.push([disk.filesystem+" ("+disk.path+")", '<juci-progress value="'+Math.round(disk.used / 1000)+'" total="'+ Math.round(disk.total / 1000) +'" units="kB"></juci-progress>']); 
			}); 
			$scope.$apply(); 
			resume(); 
		});
	}); 
}); 
