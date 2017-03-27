
(function () {

    ApplicationConfiguration.registerModule('website.home');

    var app = angular.module('website.home');

    app.config(['$stateProvider','$urlRouterProvider',
        function($stateProvider,$urlRouterProvider) {
	        $urlRouterProvider.otherwise('/home');
    	
            $stateProvider
                .state('home', {
                  url: '/home',
                  templateUrl: 'src/template/home/view/home.html?v' + (+new Date())
                })
	            .state('service', {
		            url: '/service',
		            templateUrl: 'src/template/home/view/service.html?v' + (+new Date())
	            })
	            .state('flow', {
		            url: '/flow',
		            templateUrl: 'src/template/home/view/flow.html?v' + (+new Date())
	            })
	            .state('aboutUs', {
		            url: '/aboutUs',
		            templateUrl: 'src/template/home/view/aboutUs.html?v' + (+new Date())
	            })
	            .state('login', {
		            url: '/login',
		            templateUrl: 'src/template/home/view/login.html?v' + (+new Date())
	            })
	            .state('register', {
		            url: '/register',
		            templateUrl: 'src/template/home/view/register.html?v' + (+new Date())
	            })
            
        }
    ]);
  
    app.controller('homeController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
	    $scope.swiperArr = [1, 2, 3];
     
	    $scope.init = function () {
		    $scope.swiperHeight = window.innerWidth / 2.5;
		
		    $scope.maskHeight = window.innerHeight - 50;
	    }
	    
	    $scope.toPage = function (url) {
		    if(url) $location.path(url);
		    else alert('页面赞缺失');
	    }
    }]);
    
}());







