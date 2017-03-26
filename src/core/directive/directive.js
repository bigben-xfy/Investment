
(function () {
	
	ApplicationConfiguration.registerModule('website.directive');
	
	var app = angular.module('website.directive');
	
	app.directive('homeSwiper',['$timeout', function($timeout){
		return{
			restrict:'A',
			link:function(scope,element,attr){
				$timeout(function(){
					//var swiper;
					new Swiper(element, {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						spaceBetween: 100,
						speed: 600,
						initialSlide: 0,
						loop: true,
						autoplay: 30000
					})
					
				},0)
			}
		}
	}]);
	
}());








