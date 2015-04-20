/*global angular*/

$.jsonRPC.setup({
  endPoint: '/ubus',
  namespace: 'luci'
});

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

angular.module("luci", [
	"ui.bootstrap",
	"ui.router", 
	"gettext"
	])
	.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
		//$locationProvider.otherwise({ redirectTo: "/" });
		$locationProvider.hashPrefix('!');
		//$stateProvider.otherwise("login"); 
		$urlRouterProvider.otherwise("/"); 
		$stateProvider.state("home", {
			url: "/", 
			views: {
				"content": {
					templateUrl: "pages/overview.html"
				}
			}, 
			luci_config: {}
		}); 
	})
	.run(function($rootScope, $state, $session, gettextCatalog, $rpc, $navigation){
		// set current language
		gettextCatalog.currentLanguage = "se"; 
		//gettextCatalog.debug = true; 
		// make sure that we redirect to login page if we are not logged in
		/*$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  if ($session.isLoggedIn()){
			// User isn’t authenticated
			$state.transitionTo("login");
			event.preventDefault(); 
		  }
		});*/
		
		// get the menu navigation
		$rpc.luci2.ui.menu().done(function(data){
			//console.log(JSON.stringify(data)); 
			Object.keys(data.menu).map(function(key){
				var view = data.menu[key].view; 
				var path = (view || key).replace("/", "."); 
				var obj = {
					path: path, 
					text: data.menu[key].title
				}; 
				if(view){
					obj.path = view.replace("/", "."); 
				}
				$navigation.register(obj); 
			}); 
			$rootScope.$apply(); 
			/*var tree = {children_list: []}; 
			Object.keys(data.menu).map(function(key){
				var parts = key.split("/"); 
				var obj = tree; 
				var parent = tree; 
				var insert = {
					path: (data.menu[key].view || "").replace("/", "."), 
					text: data.menu[key].title,
					children_list: []
				}; 
				// find the leaf and the parent of the leaf
				parts.map(function(part){
					if(obj.hasOwnProperty(part)) {
						parent = obj; 
						obj = obj[part]; 
					} else {
						obj[part] = {children_list: []}; 
						parent = obj; 
						obj = obj[part]; 
					}
				}); 
				Object.assign(obj, insert); 
				parent.children_list.push(obj); 
			}); */
		}); 
	})
	
angular.module("luci").controller("BodyCtrl", function ($scope, $session, $location, $window) {
	$scope.menuClass = function(page) {
		var current = $location.path().substring(1);
		return page === current ? "active" : "";
	};
	$session.init().fail(function(){
		$location.path("/login"); 
	}); 
})

$(document).ready(function(){
	
	$("#loading-indicator").hide(); 
}); 
