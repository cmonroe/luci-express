// service for managing session data
angular.module("luci")
.factory('$session', function($rpc, $rootScope) {
	return {
		sid: "00000000000000000000000000000000", 
		loggedIn: function(){
			
		}, 
		auth: function(access_policy){
			// here check if the user is allowed to access the auth object
			return 0; 
		}, 
		login: function(obj, success, error){
			var self = this; 
			$rpc.session.login(obj, function(result){
				$rootScope.sid = self.sid = result.ubus_rpc_session;
				if(success) success(self.sid); 
			}, function(result){
				if(error) error(); 
			}); 
		}
	};
});
