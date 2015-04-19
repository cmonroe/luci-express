
angular.module("luci")
.directive("luciNavbar", function(){
	return {
		// accepted parameters for this tag
		scope: {
		}, 
		templateUrl: "widgets/luci.navbar.html", 
		replace: true, 
		controller: "NavigationCtrl",
		controllerAs: "ctrl"
	}; 
})
.controller("NavigationCtrl", function($scope, $navigation){
	$scope.tree = $navigation.tree(); 
	$scope.hasChildren = function(menu){
		return Object.keys(menu.children) > 0; 
	}
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
	$(function(){
		var themes = {
			"default": "/bower_components/bootstrap/dist/css/bootstrap.min.css",
			"red" : "/themes/red/css/bootstrap.min.css"
		}
		var themesheet = $('<link href="'+themes['default']+'" rel="stylesheet" />');
		themesheet.appendTo('head');
		$('.theme-link').click(function(){
			 var themeurl = themes[$(this).attr('data-theme')]; 
				themesheet.attr('href',themeurl);
		});
	});
}); 

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

