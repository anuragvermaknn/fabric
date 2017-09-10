(function () {
    'use strict';

    angular.module('pdp.controllers.PdpCtrl', [])
        .controller('PdpCtrl', ['$scope', '$anchorScroll', 'StorefrontHttpService', '$stateParams', '$sce', 'CartService', '$rootScope', 'SFLocalStorageService', '$state', '$mdToast',


            function ($scope, $anchorScroll, StorefrontHttpService, $stateParams, $sce, CartService, $rootScope, SFLocalStorageService, $state, $mdToast) {
                $scope.title = 'Product Description';
                $scope.loaderActivated = false;
                $scope.vidValidity = '';
                var createVideoCarousel;

                $scope.selectedObj = {};
                var validityMap = {};
                var deviceMap = {};
                var videoObj = {};
                var id = $stateParams.id;
                var loadData = function () {
                    $scope.loaderActivated = true;
                    StorefrontHttpService.getPackagesById(id)
                        .then(function (data) {
                            $scope.loaderActivated = false;
                            $scope.details = data.data;
                            $scope.detailedDescription = $sce.trustAsHtml($scope.details.description);
                            $scope.validityArr = [];
                            $scope.deviceArr = [];

                            if ($scope.details.vpData) {
                                processData($scope.details.vpData);
                                $scope.createDeviceArray(null, $scope.selectedObj.vDN);
                                $scope.createValidityArray(null, $scope.selectedObj.name);
                                createVideoCarousel(5);
                            }

                        }, function (error) {
                            $scope.loaderActivated = false;
                            //do something
                        });
                };

                createVideoCarousel = function (videosId) {
                    StorefrontHttpService.getPackagesByCategoryId(videosId)
                        .then(function (data) {
                            $scope.videoCarousalData = data.data;
                        }, function (error) {
                            //do something
                        });

                }

                var processData = function (vpData) {
                    //vpData[0].price.toLocaleString()
                    $scope.selectedObj = vpData[0];

                    for (var i = 0; i < vpData.length; i++) {

                        var tempData = vpData[i];
                        var device = tempData.name;
                        var validity = tempData.vDN;

                        var deviceArr = deviceMap[device];
                        if (!deviceArr) {
                            deviceArr = [];
                        }

                        var validityArr = validityMap[validity];

                        if (!validityArr) {
                            validityArr = [];
                        }

                        deviceArr.push(tempData);
                        validityArr.push(tempData);

                        deviceMap[device] = deviceArr;
                        validityMap[validity] = validityArr;

                    }
                }


                $scope.createDeviceArray = function (map, validity) {
                    if (!map) {
                        map = validityMap;
                    }
                    $scope.deviceArr = [];
                    if (!validity) {

                        for (var key in  map) {
                            var arr = map[key];
                            for (var i = 0; i < arr.length; i++) {
                                var obj = arr[i];
                                $scope.deviceArr.push(obj);
                            }
                        }
                    } else {
                        var arr = map[validity];
                        for (var i = 0; i < arr.length; i++) {
                            var obj = arr[i];
                            $scope.deviceArr.push(obj);
                        }
                    }
                    // console.log($scope.deviceArr);
                }

                $scope.createValidityArray = function (map, device) {
                    if (!map) {
                        map = deviceMap;
                    }
                    $scope.validityArr = [];
                    if (!device) {
                        for (var key in  map) {
                            var arr = map[key];
                            for (var i = 0; i < arr.length; i++) {
                                var obj = arr[i];
                                $scope.validityArr.push(obj);
                            }
                        }
                    } else {
                        var arr = map[device];
                        for (var i = 0; i < arr.length; i++) {
                            var obj = arr[i];
                            $scope.validityArr.push(obj);
                        }
                    }

                };


                $scope.buyNow = function (data) {
                    CartService.clearCart();
                    CartService.addCartItem(data);
                    $rootScope.cartCount = CartService.getCartItemCount();
                    $state.go('myCart');
                };

                $scope.mBuyNow = function (data) {
                    CartService.clearCart();
                    CartService.addCartItem(data);
                    $rootScope.cartCount = CartService.getCartItemCount();
                    $state.go('myCartMobile');
                };

                $scope.createDTO = function (obj, param) {
                    videoObj = {
                        deviceId: obj.id,
                        id: $scope.details.id,
                        imageUrl: $scope.details.imageUrl,
                        maximumRetailPrice: obj.maximumRetailPrice,
                        sellingPrice: obj.price,
                        shippable: $scope.details.shippable,
                        title: $scope.details.title,
                        deviceName: obj.name,
                        validity: obj.month,
                        validityDisplay: obj.vDN
                    };
                    if (param === 'atC') {
                        $scope.addToCart(videoObj);
                    }
                    if (param === 'bN') {
                        $scope.buyNow(videoObj);
                    }
                }

                $scope.addToCart = function (data) {
                    CartService.addCartItem(data);
                    var toast = $mdToast.simple().content('Item added to cart!').action('BUY NOW').position('bottom right').hideDelay(10000).highlightAction(true);
                    $mdToast.show(toast).then(function (response) {
                        if (response == 'ok') {
                            $state.go('myCart');
                        }
                    });
                };

                $scope.addToMCart = function (data) {
                    CartService.addCartItem(data);
                    var toast = $mdToast.simple().content('Item added to cart!').action('BUY NOW').position('bottom right').hideDelay(10000).highlightAction(true);
                    $mdToast.show(toast).then(function (response) {
                        if (response == 'ok') {
                            $state.go('myCartMobile');
                        }
                    });
                };

                // set the location.hash to the id of
                // the element you wish to scroll to.

                // call $anchorScroll()

                var init = function () {
                    loadData();
                    $anchorScroll();


                };
                init();

            }
        ]);

})();
