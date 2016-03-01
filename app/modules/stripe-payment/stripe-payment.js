
angular.module('myApp.stripe-payment', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stripe-payment', {
    templateUrl: 'modules/stripe-payment/views/stripe-payment.html',
    controller: 'StripePaymentController'
  });
}]);