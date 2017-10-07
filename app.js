//Module

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
  'self',      
  'http://api.openweathermap.org/**'
  ]);
   
    $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);
    
});

//.run(function($rootScope){
//  //Just add a reference to some utility methods in rootscope.
//  $rootScope.Utils = {
//     keys : Object.keys
//  }
//    
//});

// //Routes
weatherApp.config(function($routeProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})

	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
    
    .when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
});

//Service

weatherApp.service('cityService', function() {
    this.city = "New York, NY";
    
});

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){

        $scope.city = cityService.city;
        
        $scope.$watch('city', function(){
            cityService.city = $scope.city;
        });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
        $scope.city = cityService.city;
//        $scope.res=[];
        
        $scope.days = $routeParams.days || '2';
    
        $scope.weatherAPI = 
            $resource("http://api.openweathermap.org/data/2.5/forecast/daily?&APPID=9ffaf4dc678102d06cd10558c84f7c02", {
            jsonpCallbackParam: 'callback' }, {get: { method: "JSONP" }});
    
        
        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt:$scope.days });
        
    $scope.convertToCelcius = function(degC){
        
        return Math.round(degC - 273.15);
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt*1000);
    }
    
    }]);
//        $scope.res.push($scope.weatherResult);
//    
//        console.log($scope.weatherResult);

// this.getWeatherAPI=function(city,days){
//                var url='http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&cnt='+days+'&APPID='+this.APP_ID;
//                
//                return $http({
//                    method:'get',
//                    url:url
//                });
//
//            }


