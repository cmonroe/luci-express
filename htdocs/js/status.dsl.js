angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.dsl", 
		text: "DSL", 
		page: "/views/status.dsl.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatsCtrl", function($scope, $rpc, $session){
		$scope.dslstats = {}; 
		
		$scope.dslConnectionInfo = {
			title: "test", 
			rows: [["None", "None"]]
		}; 
		$scope.dslModeInfo = {
			rows: [["None", "None"]]
		}; 
		$scope.dslStatusInfo = {
			rows: []
		}; 
		$scope.dslRateInfo = {
			rows: []
		}; 
		$scope.dslOpInfo = {
			rows: []
		}; 
		$scope.dslErrorInfo = {
			rows: []
		}; 
		$scope.dslCellInfo = {
			rows: []
		}; 
		
		$rpc.router.dslstats({}, function(dslstats){
			dslstats = dslstats.dslstats; 
			
			// todo fields
			with({dslstats: dslstats}){
				dslstats.ip = "TODObash get directory of file"; 
				dslstats.ipstate = "TODO"; 
				dslstats.mode_details = "TODO"; 
				dslstats.line_status_configured = "TODO"; 
				dslstats.line_type_configured = "TODO"; 
				dslstats.line_type = "TODO"; 
			}
			
			// compute floating point values (because ubus blobs do not support floats yet)
			function reconstruct_floats(obj) {
				for (var property in obj) {
					if (obj.hasOwnProperty(property)) {
						if (typeof obj[property] == "object") {
							reconstruct_floats(obj[property]);
						} else {
							var matches = property.match(/(.*)_x([\d]*)/); 
							if(matches && matches.length == 3){
								try {
									obj[matches[1]] = parseFloat(String(obj[property])) / parseFloat(matches[2]); 
								} catch(e) {
									obj[matches[1]] = "Err"; 
								}
							}
						}
					}
				}
			}
			reconstruct_floats(dslstats); 
			
			//alert("Settings stats to: "+JSON.stringify(stats)); 
			// map data to the view tables
			
			$scope.dslConnectionInfo.rows = [
				[ dslstats.ip, dslstats.ipstate ]
			]; 
			$scope.dslModeInfo.rows = [
				[ dslstats.mode, dslstats.mode_details ]
			]; 
			$scope.dslStatusInfo.rows = [
				[ 'Line Status', dslstats.line_status_configured, dslstats.line_status ], 
				[ 'Line Type', dslstats.line_type_configured, dslstats.line_type ]
			]
			$scope.dslstats = dslstats; 
			$scope.$apply(); 
		}); 
	}); 
