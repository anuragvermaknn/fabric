angular.module('app.orderStatus', [
    'orderStatus.controllers'
])

.config(function config($stateProvider) {
    $stateProvider.state('orderSuccess', {
            url: '/orderSuccess/orderId=:orderId',
            templateUrl: 'orderStatus/views/orderSuccess.tpl.html',
            controller: 'successCtrl'
        })
        .state('orderFailure', {
            url: '/orderFailure/orderId=:orderId',
            templateUrl: 'orderStatus/views/orderFailure.tpl.html',
            controller: 'failureCtrl'
        });
});
