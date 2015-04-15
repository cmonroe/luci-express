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
		this.request('method.name', {
			params: {"test": "test"},
			success: function(result) {
				// Do something with the result here
				// It comes back as an RPC 2.0 compatible response object
			},
			error: function(result) {
				// Result is an RPC 2.0 compatible response object
			}
		})
	}); 

var luci = angular.module("luci", [
    "luci.controllers"
]);

luci.config(function ($routeProvider) {
    $routeProvider
        .when("/",
        {
            controller: "HomePage",
            templateUrl: "views/main.html"
        })
        .when("/search/:zipcode/:place",
        {
            controller: "SearchCtrl",
            templateUrl: "partials/search.html"
        })
        .otherwise({ redirectTo: "/" });
});
