
angular.module('myApp.stripe-payment')
.factory('StripePaymentFactory', ['$http', function($http){

	return {
		get: function() {
			return $http.get('json/products.json');
		}
	};
}]);