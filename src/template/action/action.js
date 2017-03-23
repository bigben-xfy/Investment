
(function () {

    ApplicationConfiguration.registerModule('website.action');

    var app = angular.module('website.action');

    app.config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider) {
            $stateProvider
                .state('property', {
                  url: '/property',
                  templateUrl: 'src/template/action/view/property.html?v' + (+new Date())
                })
	            .state('project', {
		            url: '/project',
		            templateUrl: 'src/template/action/view/project.html?v' + (+new Date())
	            })
	            .state('debenture', {
		            url: '/debenture',
		            templateUrl: 'src/template/action/view/debenture.html?v' + (+new Date())
	            })
	            .state('collection', {
		            url: '/collection',
		            templateUrl: 'src/template/action/view/collection.html?v' + (+new Date())
	            })
	            .state('transactionHistory', {
		            url: '/transactionHistory',
		            templateUrl: 'src/template/action/view/transactionHistory.html?v' + (+new Date())
	            })
        }
    ]);
  
    app.controller('actionController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
	    $scope.testArr = [1,2,3,4,5,6,7,8];
      
	    $scope.toPage = function (url) {
		    if(url) $location.path(url);
		    else alert('页面赞缺失');
	    }
    }]);
    
}());







