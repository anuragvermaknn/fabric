angular.module('profile.controllers.orderCtrlAll', [])
    .controller('orderCtrlAll', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll',
        '$http', '$state', 'StorefrontHttpService', 'LoginService', '$rootScope',
        function($scope, $location, $anchorScroll, anchorSmoothScroll, $http, $state, StorefrontHttpService, LoginService, $rootScope) {

            $scope.username = LoginService.getUserName();
            $scope.userEmail = LoginService.getUserEmail();
            $scope.ordersEmpty = false;
            $scope.showDetails = false;


           var loadOrderHistoryData = function() {
                StorefrontHttpService.getOrderHistory()
                    .then(function(data) {
                        $scope.loaderActivated = false;
                        $('body').removeClass('stop-scrolling');

                        if (data.data.length === 0) {
                            $scope.ordersEmpty = true;
                            return;
                        }
                        $scope.orderDataHistory = data.data;
                        $scope.ordersEmpty = false;
                    }, function(error) {
                        $scope.loaderActivated = false;
                        $('body').removeClass('stop-scrolling');

                        setTimeout(loadOrderHistoryData, 10000);

                    });
            };
            $scope.isActive = function(viewLocation) {
                var active = (viewLocation === $location.path());
                return active;
            };

            $scope.getOrderDetail = function (orderId, index) {
                if(index === $scope.showDetailedPos){
                    $scope.showDetails = false;
                    index = '';
                    $scope.showDetailedPos = '';
                    return;
                }
                if($scope.showDetails){
                    $scope.showDetails = false;
                    $scope.loaderActivated = false;
                    $scope.getOrderDetail(orderId, index);
                    return;
                }

                $scope.loaderActivated = true;
               // $scope.currentActiveOrder = orderId;
                $scope.showDetailedPos = index;

                StorefrontHttpService.getDetailedOrder(orderId)
                    .then(function(successCallback){
                            $scope.loaderActivated = false;

                            $scope.showDetails = true;
                        $scope.currentActiveOrder = successCallback.data.orderId;
                        $scope.orderPackages = successCallback.data.packages;
                        $scope.shippingAddress = successCallback.data.address;
                        },
                        function(errorCallback){
                            $scope.showDetails = false;

                    });
            }

            function isLoggedIn() {
                login = LoginService.isLoggedIn();
                if (!login) {
                    $state.go('home');
                } else {
                    $scope.loaderActivated = $rootScope.online;
                    if ($scope.loaderActivated) {
                        $('body').addClass('stop-scrolling');

                    }
                    loadOrderHistoryData();
                }
            }

            init = function() {
                isLoggedIn();
                $anchorScroll();
            };
            init();
        }
    ]);
