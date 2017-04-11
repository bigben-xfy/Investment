
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
	            .state('application', {
		            url: '/application',
		            templateUrl: 'src/template/action/view/application.html?v' + (+new Date())
	            })
        }
    ]);
	
	app.factory('action_api',['$resource', 'Constants', function($resource, Constants){
		return $resource("",{},
			{
				getProperties: {method:"get", url: Constants.host + '/api/properties'},
				getInvestments: {method:"get", url: Constants.host + '/api/investments'},
				getDebenture: {method:"get", url: Constants.host + '/api/products'}
			})
	}]);
  
    app.controller('actionController',['$scope','$location','$rootScope',function($scope,$location,$rootScope){
	    $scope.testArr = [1,2,3,4,5,6,7,8];
      
	    $scope.toPage = function (url) {
		    if(url) $location.path(url);
		    else alert('页面赞缺失');
	    }
    }]);
	
	app.controller('propertyController',['$scope', '$location', '$rootScope', 'action_api', function($scope, $location, $rootScope, action_api){
		$scope.testArr = [1,2,3,4,5,6,7,8];
		
		$scope.init = function () {
			$scope.userInfo = $rootScope.userInfo || JSON.parse(sessionStorage.getItem('userInfo'));
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			console.log($scope.userInfo);
			
			//$scope.pathName = $location.path().slice(1);
			
			action_api.getProperties({
				page: 1,
				limit: 100,
				sort: 'price-asc'
			}, function (result) {
				$scope.propertyList = result.data;
				$scope.properrtyCount = result.pagination.total;
			});
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.logout = function () {
			sessionStorage.removeItem('userInfo');
			$scope.toPage('home');
		}
	}]);
	
	app.controller('investmentController',['$scope', '$location', '$rootScope', 'action_api', function($scope, $location, $rootScope, action_api){
		$scope.testArr = [1,2,3,4,5,6,7,8];
		
		$scope.init = function () {
			$scope.userInfo = sessionStorage.getItem('userInfo');
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			action_api.getInvestments({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.investmentList = result.data;
				//$scope.properrtyCount = result.pagination.total;
			});
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.logout = function () {
			sessionStorage.removeItem('userInfo');
			$scope.toPage('home');
		}
	}]);
	
	app.controller('debentureController',['$scope', '$location', '$rootScope', 'action_api', function($scope, $location, $rootScope, action_api){
		$scope.testArr = [1,2,3,4,5,6,7,8];
		
		$scope.init = function () {
			$scope.userInfo = sessionStorage.getItem('userInfo');
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			action_api.getDebenture({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.debentureList = result.data;
				//$scope.properrtyCount = result.pagination.total;
			});
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.logout = function () {
			sessionStorage.removeItem('userInfo');
			$scope.toPage('home');
		}
	}]);
	
	app.controller('collectionController',['$scope', '$location', '$rootScope', 'action_api', function($scope, $location, $rootScope, action_api){
		$scope.testArr = [1,2,3,4,5,6,7,8];
		
		$scope.init = function () {
			$scope.userInfo = sessionStorage.getItem('userInfo');
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			action_api.getInvestments({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.investmentList = result.data;
			});
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.logout = function () {
			sessionStorage.removeItem('userInfo');
			$scope.toPage('home');
		}
	}]);
	
	app.controller('historyController',['$scope', '$location', '$rootScope', 'action_api', function($scope, $location, $rootScope, action_api){
		$scope.testArr = [1,2,3,4,5,6,7,8];
		
		$scope.init = function () {
			$scope.userInfo = sessionStorage.getItem('userInfo');
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			action_api.getInvestments({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.investmentList = result.data;
			});
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.logout = function () {
			sessionStorage.removeItem('userInfo');
			$scope.toPage('home');
		}
	}]);
    
}());







