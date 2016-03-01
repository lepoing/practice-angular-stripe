
angular.module('myApp.stripe-payment')

.controller('StripePaymentController', ['$scope', '$modal', '$http', 'StripePaymentFactory', 
	function($scope, $modal, $http, StripePaymentFactory) {
	$scope.cart = [];

	// Load products from server
	StripePaymentFactory.get('json/products.json')
		.success(function (response) {
			$scope.products = response.products;
		});

	$scope.addToCart = function (product) {
		var found = false;
		$scope.cart.forEach(function (item) {
			if (item.id === product.id) {
				item.quantity++;
				found = true;
			}
		});
		if (!found) {
			$scope.cart.push(angular.extend({quantity: 1}, product));
		}
	};

	$scope.getCartPrice = function () {
		var total = 0;
		$scope.cart.forEach(function (product) {
			total += product.price * product.quantity;
		});
		return total;
	};

	$scope.checkout = function () {
		$modal.open({
			templateUrl: 'modules/stripe-payment/views/checkout.html',
			controller: 'CheckoutController',
			resolve: {
				totalAmount: $scope.getCartPrice
			}
		});
	};
}])

.controller('CheckoutController', ['$scope', 'totalAmount', 
	function ($scope, totalAmount) {

	$scope.totalAmount = totalAmount;

	$scope.onSubmit = function () {
		$scope.processing = true;
	};

	$scope.stripeCallback = function (code, result) {
		$scope.processing = false;
		$scope.hideAlerts();
		if (result.error) {
			$scope.stripeError = result.error.message;
		} else {
			$scope.stripeToken = result.id;
		}
	};

	$scope.hideAlerts = function () {
		$scope.stripeError = null;
		$scope.stripeToken = null;
	};
}]);