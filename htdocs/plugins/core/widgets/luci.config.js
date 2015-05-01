$juci.module("core")
.directive("luciConfig", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<div ng-transclude></div>', 
		replace: true, 
		transclude: true
	};  
})
.directive("luciConfigSection", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<div class="luci-config-section" ng-transclude></div>', 
		replace: true, 
		transclude: true
	 };  
})
.directive("luciConfigInfo", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<p class="luci-config-info" ng-transclude translate></p>', 
		replace: true, 
		transclude: true
	 };  
})
.directive("luciConfigHeading", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<h2 ng-transclude translate></h2>', 
		replace: true, 
		transclude: true
	 };  
})
.directive("luciConfigLines", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<table class="table" ><tbody ng-transclude></tbody></table>', 
		replace: true, 
		transclude: true
	 };  
})
.directive("luciConfigLine", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<tr><td class="col-xs-6"><label style="font-size: 1.2em">{{title | translate}}</label></td><td class="col-xs-6"><div class="btn-toolbar pull-right" ng-transclude></div></td></tr>', 
		replace: true, 
		scope: {
			title: "="
		}, 
		transclude: true
	 };  
})
.directive("luciConfigApply", function(){
	var plugin_root = $juci.module("core").plugin_root; 
	return {
		template: '<div class="row"><div class="btn-toolbar pull-right" >'+
			'<button class="btn btn-lg btn-primary" ng-click="onApply()" ng-disabled="busy"><i class="fa fa-spinner fa-spin" ng-show="busy"/>{{ "Apply"| translate }}</button><button class="btn btn-lg btn-default" ng-click="onCancel()">{{ "Cancel" | translate }}</button>'+
			'</div></div>', 
		replace: true
	 }; 
}); 

