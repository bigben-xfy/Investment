
(function () {
	
	ApplicationConfiguration.registerModule('website.filter');
	
	var app = angular.module('website.filter');
	
	/*app.filter('numberToMoney', function(){
		return function(input){
			return input.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		}
	});*/
	
	app.filter('to_trusted', ['$sce', function ($sce) {
		return function (text) {
			return $sce.trustAsHtml(text);
		}
	}]);
	
	app.filter('numberToMoney', [function () {
		return function (num) {
			if (num){
				num = parseFloat(num);
				return '$' + (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
			}
			return '0'
		}
	}]);
}());













