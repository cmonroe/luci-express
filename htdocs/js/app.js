/*global angular*/

"use strict";

$.jsonRPC.setup({
  endPoint: '/ubus',
  namespace: 'luci'
});

$.jsonRPC.withOptions({
		namespace: "router", 
		endPoint: "/ubus"
	}, function(){
		this.request('call', {
			params: [ "00000000000000000000000000000000", "session", "login", { "username": "root", "password": "secret"  } ],
			success: function(result) {
				// Do something with the result here
				// It comes back as an RPC 2.0 compatible response object
			},
			error: function(result) {
				// Result is an RPC 2.0 compatible response object
			}
		})
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
		"luci.controllers", 
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
				}); 
				
		})
		.run(function(gettextCatalog){
			gettextCatalog.currentLanguage = "sv-SE"; 
			gettextCatalog.debug = true; 
		}); 

	$(document).ready(function(){
		$("#loading-indicator").hide(); 
	}); 

}());
