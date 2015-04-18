/*global angular*/

"use strict";

$.jsonRPC.setup({
  endPoint: '/ubus',
  namespace: 'luci'
});

angular.module("luci", [
	"ui.bootstrap",
	"ui.router", 
	"gettext"
	])
	.config(function ($stateProvider, $locationProvider) {
		//$locationProvider.otherwise({ redirectTo: "/" });
		$locationProvider.hashPrefix('!');
		$stateProvider
			.state("home",
			{
				url: "", 
				views: {
					"content": {
						templateUrl: "/views/login.html"
					}
				}
			})
			.state("login",
			{
				url: "/login", 
				views: {
					"content": {
						templateUrl: "/views/login.html"
					}, 
					"navbar": {
						templateUrl: "/views/navbar.html"
					}
				}
			})
			.state("status_dsl",
			{
				url: "/status.dsl", 
				views: {
					"content": {
						templateUrl: "/views/status.dsl.html"
					}, 
					"navbar": {
						templateUrl: "/views/navbar.html"
					}
				}
			})
			
			
	})
	.run(function($rootScope, $state, $session, gettextCatalog){
		gettextCatalog.currentLanguage = "se"; 
		gettextCatalog.debug = true; 
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.access_policy && !$session.auth(toState.access_policy)){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
	}); 
	
angular.module("luci")
	.directive("luciTable", function(){
		return {
			scope: {
				data: "=data", 
				columns: "=", 
				title: "="
			}, 
			templateUrl: "widgets/table.html", 
			replace: true, 
			controller: "TableControl",
			controllerAs: "ctrl"
		}; 
	}).controller("TableControl", function($scope){
		$scope.data = {}; 
		if($scope.columns && $scope.columns.length){
			if(!$scope.data.hasOwnProperty("columns"))
				$scope.data.columns = []; 
			Object.assign($scope.data.columns, $scope.columns); 
		}
		/*$scope.data = {
			columns: ["test", "bar", "foo"], 
			rows: [["1", "2", "4"], ["a", "b", "c"]]
		}; */
	}); 
	
angular.module("luci").factory('$rpc', function($rootScope){
	var calls = [
		"session.login", 
		"router.dslstats",
		"router.info",
		"system.info"
	]; 
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
										alert("error: "+JSON.stringify(result)); 
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

angular.module("luci").provider('$navigation', function navigationProvider(){
	var data = {
		children: {},
		children_list: []
	}; 
	var self = this; 
	this.tree = function(){
		return data; 
	}
	this.register = function(item){
		if(!item.path) return; 
		var parts = item.path.split("."); 
		var obj = data; 
		while(parts.length > 1){
			if(obj.children.hasOwnProperty(parts[0])){
				obj = obj.children[parts.shift()]; 
			} else {
				obj.children[parts[0]] = {
					children: {},
					children_list: []
				};
				obj = obj.children[parts.shift()]; 
			}
		} 
		if(!item.children) item.children = {}; 
		if(!obj.children.hasOwnProperty(parts[0])){
			obj.children[parts[0]] = item; 
			obj.children_list.push(item); 
		} else {
			var o = obj.children[parts[0]]; 
			var children = o.children; 
			Object.assign(o, item);
			Object.assign(o.children, children); 
		}
		obj.children_list = Object.keys(obj.children).map(key => obj.children[key]);
		
		//alert(JSON.stringify(data)); 
		return data; 
	}; 
	this.$get = function() {
		return self; 
	}
}); 

angular.module("luci").factory('$session', function($rpc, $rootScope) {
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

$(document).ready(function(){
	$("#loading-indicator").hide(); 
}); 
