angular.module('orderStatus.controllers.successCtrl', [])
    .controller('successCtrl', ['$scope', '$anchorScroll', 'anchorSmoothScroll', '$stateParams',
        'LoginService', '$rootScope', 'CartService', '$window', 'StorefrontHttpService', '$state',

        function($scope, $anchorScroll, anchorSmoothScroll, $stateParams, LoginService, $rootScope,
                 CartService, $window, StorefrontHttpService, $state) {



            $scope.loaderActivated = true;
            CartService.clearCart();
            $rootScope.cartCount = CartService.getCartItemCount();
            $scope.orderId = $stateParams.orderId;
            $scope.emailId = LoginService.getUserEmail();

            var isWebView = function () {
                if (typeof cpandroidjsbridge === 'undefined') {
                  $scope.isWebView = false;
                }
                else {
                    $scope.isWebView = true;

                }
            };


            $anchorScroll();
            $scope.fireConversion = function() {
                $window.google_trackConversion({
                    google_conversion_id: 867441732,
                    google_conversion_language: "en",
                    google_conversion_format: "3",
                    google_conversion_color: "ffffff",
                    google_conversion_label: "ag2NCKqcpmwQxLjQnQM",
                    google_conversion_value: 500,
                    google_conversion_currency: "INR",
                    google_remarketing_only: false
                });
            };

            $scope.goToNative = function () {
                if (typeof cpandroidjsbridge === 'undefined') {
                    return;
                }
                else{
                    cpandroidjsbridge.openMyTestSeries();
                }
            };

            $scope.fireConversion();

            var init = function () {



                StorefrontHttpService.getDetailedOrder($scope.orderId).then(function(successCallback){

                    if(successCallback.data.status === 'PAID'){
                        isWebView();

                    }
                    else{

                        $state.go('home');
                    }
                    $scope.loaderActivated = false;


                }, function(errorCallback){
                    $state.go('home');
                });

            };

            init();

        }
    ]);
