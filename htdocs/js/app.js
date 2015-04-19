/*global angular*/

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
	})
	.run(function($rootScope, $state, $session, gettextCatalog){
		// set current language
		gettextCatalog.currentLanguage = "se"; 
		//gettextCatalog.debug = true; 
		// make sure that we redirect to login page if we are not logged in
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.access_policy && !$session.auth(toState.access_policy)){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
	})
angular.module("luci").controller("BodyCtrl", function ($scope, $location, $window) {
		$scope.menuClass = function(page) {
			var current = $location.path().substring(1);
			return page === current ? "active" : "";
		};
	})

$(document).ready(function(){
	
	$("#loading-indicator").hide(); 
}); 
