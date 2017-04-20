
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
	
	app.factory('home_api',['$resource', 'Constants', function($resource, Constants){
		return $resource("",{},
			{
				register: {method:'post', url: Constants.host + '/api/signup'},
				login: {method:'post', url: Constants.host + '/api/login'}
			})
	}]);
  
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
	
	app.controller('loginController',['$scope','$location','$rootScope','home_api',function($scope,$location,$rootScope,home_api){
		
		$scope.init = function () {
			if(sessionStorage.getItem('userInfo')) $scope.toPage('property');
			
			$scope.bgHeight = window.outerHeight - 50;
			$scope.email = localStorage.getItem('userName');
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.login = function () {
			if(!$scope.email || !$scope.password) {
				alert('账号密码不能为空');
				return false;
			}
			
			if($scope.rememberUser){
				localStorage.setItem('userName', $scope.email);
			}
			
			home_api.login({
				email: $scope.email,
				password: $scope.password
			}, function (result) {
				if(result.code === 200) {
					$rootScope.userInfo = {
						userName: $scope.email,
						phone: result.data.cellphone,
						name: result.data.name || '未命名'
					}
					sessionStorage.setItem('userInfo', JSON.stringify($rootScope.userInfo));
					$scope.toPage('property');
				}else {
					alert(result.message + '!' + result.data[0]);
				}
			});
			
			/*sessionStorage.setItem('userInfo', {
				username: $scope.userEmail
			});
			$scope.toPage('property');*/
		}
	}]);
	
	app.controller('registerController',['$scope','$location','$rootScope', 'home_api',function($scope,$location,$rootScope,home_api){
		
		$scope.init = function () {
			$scope.bgHeight = window.outerHeight - 50;
		}
		
		$scope.toPage = function (url) {
			if(url) $location.path(url);
			else alert('页面赞缺失');
		}
		
		$scope.register = function () {
			$scope.formatData = {
				last_name: $scope.userName,
				password: $scope.password,
				password_check: $scope.checkPassword,
				email: $scope.email,
				first_name: $scope.realName,
				cellphone: $scope.phone
			}
			
			$scope.formKeys = _.keys($scope.formatData);
			for(var i = 0; i < $scope.formKeys.length; i++){
				var key = $scope.formKeys[i];
				if(!$scope.formatData[key]) {
					alert('请填写完整注册信息');
					return false;
				}
			}
			
			if($scope.password != $scope.checkPassword) {
				alert('两次密码输入不同，请重新输入');
				$scope.checkPassword = '';
				return false;
			}
			
			home_api.register($scope.formatData, function (result) {
				if(result.code == 200) {
					alert('注册成功');
					$location.path('login');
				} else alert(result.message + '!' + result.data[0]);
			});
		}
	}]);
    
}());







