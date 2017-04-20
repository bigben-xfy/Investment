
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
				getPropertyDetail: {method:"get", url: Constants.host + '/api/properties/:id'},
				getInvestments: {method:"get", url: Constants.host + '/api/investments'},
				getDebenture: {method:"get", url: Constants.host + '/api/products'},
				getCollection: {method:"get", url: Constants.host + '/api/collects'},
				collectProperty: {method: 'post', url: Constants.host + '/api/collect/properties'},
				collectInvestment: {method: 'post', url: Constants.host + '/api/collect/investments'},
				collectDebenture: {method: 'post', url: Constants.host + '/api/collect/products'}
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
			
			$scope.priceArr = [
				'',
				'0-1',
				'1-2',
				'2-3',
				'3-4',
				'4-5',
				'5'
			];
			$scope.roomArr = ['','1','1+','2','2+','3','3+','4','4+','5','5+'];
			$scope.houseArr = ['','villa','apartment','house','business','industry','land','farm'];
			$scope.price = $scope.priceArr[0];
			$scope.room = $scope.roomArr[0];
			$scope.house = $scope.houseArr[0];
			
			$scope.paginationArr = [];
			$scope.pageSize = 10;
			$scope.getPropertyData(1, $scope.pageSize);
			
			
			/*$scope.collectionList = window.localStorage.getItem('collectionList');
			if($scope.collectionList) {
				$scope.collectionList = $scope.collectionList.join();
				_.each($scope.collectionList, function () {
				
				})
			}else {
				$scope.collectionList = []
			}*/
		}
		
		$scope.setPrice = function (price) {
			$scope.price = price;
			$scope.getPropertyData($scope.pageIndex, $scope.pageSize);
		}
		$scope.setRoom = function (room) {
			$scope.room = room;
			$scope.getPropertyData($scope.pageIndex, $scope.pageSize);
		}
		$scope.setHouse = function (house) {
			$scope.house = house;
			$scope.getPropertyData($scope.pageIndex, $scope.pageSize);
		}
		
		$scope.getPropertyData = function (pageIndex, PageSize) {
			action_api.getProperties({
				page: pageIndex,
				limit: PageSize,
				sort: 'price-asc',
				price: $scope.price,
				type: $scope.house,
				room: encodeURI($scope.room)
			}, function (result) {
				$scope.propertyList = result.data;
				$scope.paginationData = result.pagination;
				$scope.pageIndex = pageIndex;
				
				$scope.totalPage = result.pagination.total_pages;
				if($scope.totalPage <= 5) $scope.paginationArr = _.range(1, $scope.totalPage + 1);
				else {
					if(pageIndex > 3 && pageIndex < $scope.totalPage - 1) {
						$scope.paginationArr = _.range(pageIndex - 1, pageIndex + 2);
						$scope.paginationArr.push($scope.totalPage);
						$scope.paginationArr.unshift(1);
					}else if(pageIndex <= 3) {
						$scope.paginationArr = _.range(1, 5);
						$scope.paginationArr.push($scope.totalPage);
					}
				}
			});
		}
		
		$scope.nextPage = function () {
			if($scope.pageIndex === $scope.totalPage) return false;
			$scope.getPropertyData($scope.pageIndex + 1, $scope.pageSize);
		}
		
		$scope.previousPage = function () {
			if($scope.pageIndex === 1) return false;
			$scope.getPropertyData($scope.pageIndex - 1, $scope.pageSize);
		}
		
		$scope.collectProperty = function (id, index, isDelete) {
			action_api.collectProperty({
				id: id,
				is_delete: isDelete
			}, function (result) {
				if(result.code == 200) {
					$scope.propertyList[index].collected = $scope.propertyList[index].collected == 1 ? 0 : 1
					alert(isDelete == 0 ?'收藏成功' : '取消收藏成功');
				}
			})
			//var property = $scope.propertyList[index];
		}
		
		$scope.getPropertyDetail = function (id, index) {
			/*action_api.getPropertyDetail({
				id: id
			}, function (result) {
				
			})*/
			$scope.propertyDetail = $scope.propertyList[index]
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
			$scope.userInfo = $rootScope.userInfo || JSON.parse(sessionStorage.getItem('userInfo'));
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			$scope.paginationArr = [];
			$scope.pageSize = 10;
			$scope.getInvestmentData(1, $scope.pageSize);
			
			/*action_api.getInvestments({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.investmentList = result.data;
				//$scope.properrtyCount = result.pagination.total;
			});*/
		}
		
		$scope.getInvestmentData = function (pageIndex, PageSize) {
			action_api.getInvestments({
				page: pageIndex,
				limit: PageSize,
				sort: 'price-asc'
			}, function (result) {
				$scope.investmentList = result.data;
				$scope.paginationData = result.pagination;
				$scope.pageIndex = pageIndex;
				
				$scope.totalPage = result.pagination.total_pages;
				if($scope.totalPage <= 5) $scope.paginationArr = _.range(1, $scope.totalPage + 1);
				else {
					if(pageIndex > 3 && pageIndex < $scope.totalPage - 1) {
						$scope.paginationArr = _.range(pageIndex - 1, pageIndex + 2);
						$scope.paginationArr.push($scope.totalPage);
						$scope.paginationArr.unshift(1);
					}else if(pageIndex <= 3) {
						$scope.paginationArr = _.range(1, 5);
						$scope.paginationArr.push($scope.totalPage);
					}
				}
			});
		}
		
		$scope.nextPage = function () {
			if($scope.pageIndex === $scope.totalPage) return false;
			$scope.getInvestmentData($scope.pageIndex + 1, $scope.pageSize);
		}
		
		$scope.previousPage = function () {
			if($scope.pageIndex === 1) return false;
			$scope.getInvestmentData($scope.pageIndex - 1, $scope.pageSize);
		}
		
		$scope.getInvestmentDetail = function (id, index) {
			/*action_api.getPropertyDetail({
			 id: id
			 }, function (result) {
			 
			 })*/
			$scope.investmentDetail = $scope.investmentList[index]
		}
		
		$scope.collectInvestment = function (id, index, isDelete) {
			action_api.collectInvestment({
				id: id,
				is_delete: isDelete
			}, function (result) {
				if(result.code == 200) {
					$scope.investmentList[index].collected = $scope.investmentList[index].collected == 1 ? 0 : 1
					alert(isDelete == 0 ?'收藏成功' : '取消收藏成功');
				}
			})
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
			$scope.userInfo = $rootScope.userInfo || JSON.parse(sessionStorage.getItem('userInfo'));
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			$scope.paginationArr = [];
			$scope.pageSize = 10;
			$scope.getDebentureData(1, $scope.pageSize);
			
			/*action_api.getDebenture({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.debentureList = result.data;
				//$scope.properrtyCount = result.pagination.total;
			});*/
		}
		
		$scope.getDebentureData = function (pageIndex, PageSize) {
			action_api.getDebenture({
				page: pageIndex,
				limit: PageSize,
				sort: 'price-asc'
			}, function (result) {
				$scope.debentureList = result.data;
				$scope.paginationData = result.pagination;
				$scope.pageIndex = pageIndex;
				
				$scope.totalPage = result.pagination.total_pages;
				if($scope.totalPage <= 5) $scope.paginationArr = _.range(1, $scope.totalPage + 1);
				else {
					if(pageIndex > 3 && pageIndex < $scope.totalPage - 1) {
						$scope.paginationArr = _.range(pageIndex - 1, pageIndex + 2);
						$scope.paginationArr.push($scope.totalPage);
						$scope.paginationArr.unshift(1);
					}else if(pageIndex <= 3) {
						$scope.paginationArr = _.range(1, 5);
						$scope.paginationArr.push($scope.totalPage);
					}
				}
			});
		}
		
		$scope.nextPage = function () {
			if($scope.pageIndex === $scope.totalPage) return false;
			$scope.getDebentureData($scope.pageIndex + 1, $scope.pageSize);
		}
		
		$scope.previousPage = function () {
			if($scope.pageIndex === 1) return false;
			$scope.getDebentureData($scope.pageIndex - 1, $scope.pageSize);
		}
		
		$scope.collectDebenture = function (id, index, isDelete) {
			action_api.collectDebenture({
				id: id,
				is_delete: isDelete
			}, function (result) {
				if(result.code == 200) {
					$scope.debentureList[index].collected = $scope.debentureList[index].collected == 1 ? 0 : 1
					alert(isDelete == 0 ?'收藏成功' : '取消收藏成功');
				}
			})
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
			$scope.userInfo = $rootScope.userInfo || JSON.parse(sessionStorage.getItem('userInfo'));
			if(!$scope.userInfo) {
				$scope.toPage('login');
			}
			
			//$scope.pathName = $location.path().slice(1);
			
			$scope.paginationArr = [];
			$scope.pageSize = 10;
			$scope.getCollectionData(1, $scope.pageSize);
			
			/*action_api.getCollection({
				page: 1,
				limit: 100
			}, function (result) {
				$scope.collectionList = result.data;
			});*/
		}
		
		$scope.getCollectionData = function (pageIndex, PageSize) {
			action_api.getCollection({
				page: pageIndex,
				limit: PageSize
				//sort: 'price-asc'
			}, function (result) {
				$scope.collectionList = result.data;
				$scope.paginationData = result.pagination;
				$scope.pageIndex = pageIndex;
				
				$scope.totalPage = result.pagination.total_pages;
				if($scope.totalPage <= 5) $scope.paginationArr = _.range(1, $scope.totalPage + 1);
				else {
					if(pageIndex > 3 && pageIndex < $scope.totalPage - 1) {
						$scope.paginationArr = _.range(pageIndex - 1, pageIndex + 2);
						$scope.paginationArr.push($scope.totalPage);
						$scope.paginationArr.unshift(1);
					}else if(pageIndex <= 3) {
						$scope.paginationArr = _.range(1, 5);
						$scope.paginationArr.push($scope.totalPage);
					}
				}
			});
		}
		
		$scope.nextPage = function () {
			if($scope.pageIndex === $scope.totalPage) return false;
			$scope.getCollectionData($scope.pageIndex + 1, $scope.pageSize);
		}
		
		$scope.previousPage = function () {
			if($scope.pageIndex === 1) return false;
			$scope.getCollectionData($scope.pageIndex - 1, $scope.pageSize);
		}
		
		$scope.buy = function () {
			console.log($scope.name);
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
			$scope.userInfo = $rootScope.userInfo || JSON.parse(sessionStorage.getItem('userInfo'));
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







