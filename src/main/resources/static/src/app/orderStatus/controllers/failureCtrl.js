angular.module('orderStatus.controllers.failureCtrl', [])
    .controller('failureCtrl', ['$scope', '$anchorScroll', 'anchorSmoothScroll', '$stateParams', 'LoginService','StorefrontHttpService','$state',
        function($scope, $anchorScroll, anchorSmoothScroll, $stateParams, LoginService, StorefrontHttpService, $state) {
        $scope.loaderActivated = true;
        $scope.orderId = $stateParams.orderId;
        $scope.emailId = LoginService.getUserEmail();
        $anchorScroll();
        var isWebView = function () {
            if (typeof cpandroidjsbridge === 'undefined') {
                $scope.isWebView = false;
            }
            else {
                $scope.isWebView = true;

            }
        };

        var init = function () {
            StorefrontHttpService.getDetailedOrder($scope.orderId).then(function(successCallback){
                if(successCallback.data.status !== 'PAID'){
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

    }]);
