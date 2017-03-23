
(function () {
	
	ApplicationConfiguration.registerModule('website.filter');
	
	var app = angular.module('website.filter');
	
	app.filter('numberToMoney', function(){
		return function(input){
			return input
		}
	});
}());













