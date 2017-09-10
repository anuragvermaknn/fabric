angular.module('cart.controllers.cartCtrlInitial', [])
    .controller('cartCtrlInitial', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll',
        '$state', 'CartService', 'LoginService', '$rootScope', 'SFLocalStorageService',
        function ($scope, $location, $anchorScroll,
                  anchorSmoothScroll, $state, CartService, LoginService, $rootScope, SFLocalStorageService) {
            //$scope.finalAmt = 0;
            $scope.cartItemsDetail = CartService.getDisplayCart();
            var bagValue = function (couponCode) {
                $scope.finalAmt = CartService.getPayablePrice(couponCode).payablePrice;

            };

            $scope.removeItem = function (id) {
                CartService.deleteCartItem(id);
                $scope.cartItemsDetail = CartService.getDisplayCart();
                bagValue(null);
            };

            $scope.cartDetail = function () {
                if (LoginService.isLoggedIn()) {
                    $state.go('myCartDetail');
                } else {
                    LoginService.showLogin();
                }
            };

            var isWebView = function () {
                LoginService.setJwtToken(cpandroidjsbridge.getUserToken());
                LoginService.setUserName(cpandroidjsbridge.getUserName());
                LoginService.setUserEmail(cpandroidjsbridge.getUserEmail());
            };

            init = function () {
                if (typeof cpandroidjsbridge !== 'undefined') {
                    isWebView();
                }
                $anchorScroll();
                bagValue(null);
            };
            init();
        }
    ]);
