
(function() {
    window.ApplicationConfiguration = (function() {
        // Init module configuration options
        var applicationModuleName = 'website';
        var applicationModuleVendorDependencies = ['ui.router','ngResource','ipCookie'];

        // Add a new vertical module
        var registerModule = function(moduleName) {
            // Create angular module
            angular.module(moduleName, []);

            // Add the module to the AngularJS configuration file
            angular.module(applicationModuleName).requires.push(moduleName);
        };

        return {
            applicationModuleName: applicationModuleName,
            applicationModuleVendorDependencies: applicationModuleVendorDependencies,
            registerModule: registerModule
        };
    })();

    angular.module('website', [
        'ui.router',
        'ngResource',
        'ipCookie'
    ]);

    angular.module('website').config(['$httpProvider','$locationProvider',function($httpProvider,$locationProvider){
        //Access-Control-Allow-Origin
	    $httpProvider.defaults.useXDomain = false;
	    $httpProvider.defaults.withCredentials = false;
	    $httpProvider.defaults.headers['Cache-Control'] = 'no-cache';
	    $httpProvider.defaults.headers['Pragma'] = 'no-cache';
	    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $httpProvider.defaults.transformRequest = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        //console.log(value);
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name+ '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];

    }]);

    angular.module('website').run(['$rootScope','$location',function($rootScope,$location){

        $rootScope.$on("$locationChangeSuccess",function(event, toState, toParams){//page change

        })

    }])


}());


