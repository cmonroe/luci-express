// luci rpc module for communicating with the server
angular.module("luci")
.factory('$rpc', function($rootScope, $config){
	var calls = $config.rpc.exposed_calls; 
	var ret = {}; 
	calls.forEach(function(call){
		function _find(path, obj){
			if(!obj.hasOwnProperty(path[0])){
				obj[path[0]] = {}; 
			}
			if(path.length == 1) {
				var namespace = call.split("."); 
				namespace.pop(); namespace = namespace.join("."); 
				(function(namespace, method){
					obj[path[0]] = function(data, success, error){
						var func = (function(data, success, error){
							$.jsonRPC.withOptions({
								namespace: "", 
								endPoint: "/ubus"
							}, function(){	 
								var sid = "00000000000000000000000000000000"; 
								if($rootScope.sid) sid = $rootScope.sid; 
								
								//alert("SID: "+sid); 
								this.request('call', {
									params: [ sid, namespace, method, data],
									success: function(result){
										//alert("SID: "+sid + " :: "+ JSON.stringify(result)); 
										if(result && result.result && success) {
											if(result.result[0] != 0 && error) error(result.result[1]); 
											else success(result.result[1]); 
										}
									}, 
									error: function(result){
										console.log("RPC error: "+JSON.stringify(result)); 
										if(result && result.result && error){
											error(result.result); 
										}
									}
								})
							}); 
						})(data, success, error); 
					}
				})(namespace, path[0]); 
			} else {
				var child = path[0]; 
				path.shift(); 
				_find(path, obj[child]); 
			}
		}
		_find(call.split("."), ret); 
	}); 
	return ret; 
}); 
