
(function () {

    ApplicationConfiguration.registerModule('website.home');

    var app = angular.module('website.home');

    app.config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider) {
	        $urlRouterProvider.otherwise('/home');
    	
            $stateProvider
                .state('home', {
                  url: '/home',
                  templateUrl: 'src/template/home/view/home.html'
                })
	            .state('service', {
		            url: '/service',
		            templateUrl: 'src/template/home/view/service.html'
	            })
	            .state('flow', {
		            url: '/flow',
		            templateUrl: 'src/template/home/view/flow.html'
	            })
	            .state('aboutUs', {
		            url: '/aboutUs',
		            templateUrl: 'src/template/home/view/aboutUs.html'
	            })
            
        }
    ]);
  
    app.controller('homeController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
	    
      
    }]);
    
}());







