'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.stripe-payment',
  'angularPayments',
  'mm.foundation',
  'ngAnimate',
  'angularSpinner'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/stripe-payment'});

  // initialize stripe key
  window.Stripe.setPublishableKey('pk_test_NdQVoDqWpjH3gmPzr47529aN');
}]);
