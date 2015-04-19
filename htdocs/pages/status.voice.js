angular.module("luci")
.config(function($stateProvider, $navigationProvider){
	$navigationProvider.register({
		path: "status.voice", 
		text: "Voice", 
		page: "/pages/status.voice.html", 
		access_policy: {
			groups: ["admin"]
		}
	}); 
})
.controller("StatusVoicePageCtrl", function($scope){
	
}); 
