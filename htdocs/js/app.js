/*global angular*/

"use strict";

$.jsonRPC.setup({
  endPoint: '/ubus',
  namespace: 'luci'
});

(function () {
		
    angular.module('autoActive', [])
        .directive('autoActive', ['$location', function ($location) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();
                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass('active');
                            } else {
                                angular.element(li).removeClass('active');
                            }
                        });
                    }
                }

                setActive();

                scope.$on('$locationChangeSuccess', setActive);
            }
        }
    }]);
	
	angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
	/* jshint -W100 */
		gettextCatalog.setStrings('sv-SE', {"About":"Om","Test":"Jag testar"});
	/* jshint +W100 */
	}]);
	var luci = angular.module("luci", [
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
					url: "/home", 
					controller: "HomePage",
					templateUrl: "/views/main.html"
				})
				.state("about",
				{
					url: "/about", 
					templateUrl: "/views/about.html"
				})
				.state("status_dsl",
				{
					url: "/status.dsl", 
					templateUrl: "/views/status.dsl.html"
				})
				.state("status_overview",
				{
					url: "/status.overview", 
					templateUrl: "/views/status.overview.html"
				}); 
				
		})
		.run(function(gettextCatalog){
			gettextCatalog.currentLanguage = "sv-SE"; 
			gettextCatalog.debug = true; 
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
	
	angular.module("luci").factory('$session', function($rpc, $rootScope) {
		return {
			sid: "00000000000000000000000000000000", 
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

}());
