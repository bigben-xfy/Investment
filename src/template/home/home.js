
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
	            .state('question', {
		            url: '/question',
		            templateUrl: 'src/template/home/view/question.html?v' + (+new Date())
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
				login: {method:'post', url: Constants.host + '/api/login'},
				getArticle: {method: 'get', url: Constants.host + '/api/articles'},
				getPassword: {method: 'get', url: Constants.host + '/api/password/reset'}
			})
	}]);
  
    app.controller('homeController',['$scope','$location','$rootScope', 'home_api', function($scope,$location,$rootScope,home_api){
	    $scope.swiperArr = [1, 2, 3];
     
	    $scope.init = function () {
		    $scope.swiperHeight = window.innerWidth / 2.5;
		
		    $scope.maskHeight = window.innerHeight - 50;
		
		    $scope.newsData = []
		    home_api.getArticle({
			    page: 1,
			    limit: 100
		    }, function (result) {
			    _.each(result.data, function (item, key) {
				    switch (item.type) {
					    case '常见问题':
					    	$scope.questionData = item.content;
					    	break;
					    case '我们的服务':
						    $scope.serviceData = item.content;
						    break;
					    case '流程介绍':
						    $scope.flowData = item.content;
						    break;
					    case '关于我们':
						    $scope.aboutData = item.content;
						    break;
					    case '公司快讯':
						    if($scope.newsData.length < 3) $scope.newsData.push(item);
						    break;
					    
				    }
			    })
		    })
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
			$scope.passwordEmail = ''
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
						name: result.data.name || '未命名',
						token: result.data.token
					}
					sessionStorage.setItem('userInfo', JSON.stringify($rootScope.userInfo));
					$scope.toPage('property');
				}else if(result.code == 4000){
					alert('密码错误');
				}else {
					alert(result.message + '!' + result.data[0]);
				}
			});
			
			/*sessionStorage.setItem('userInfo', {
				username: $scope.userEmail
			});
			$scope.toPage('property');*/
		}
		
		$scope.getFindPassword = function () {
			$.ajax({
				type: 'GET',
				url: 'http://abc.deexcul.com/api/password/reset?email=' + encodeURI($scope.passwordEmail),
				dataType: "json",
				success: function (result) {
					alert('重置')
				},
				error: function (error) {
					alert(error)
				}
			})
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
				username: $scope.userName,
				password: $scope.password,
				password_check: $scope.checkPassword,
				email: $scope.email,
				name: $scope.realName,
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
					localStorage.setItem('userName', $scope.email);
					alert('注册成功');
					$location.path('login');
				} else alert(result.message + '!' + result.data[0]);
			});
		}
	}]);
    
}());







