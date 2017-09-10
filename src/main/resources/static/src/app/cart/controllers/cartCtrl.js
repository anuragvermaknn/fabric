angular.module('cart.controllers.cartCtrl', [])
    .controller('cartCtrl', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll',
        '$state', 'CartService', 'StorefrontHttpService', 'LoginService',
        function ($scope, $location, $anchorScroll, anchorSmoothScroll, $state, CartService,
                  StorefrontHttpService, LoginService) {
            $scope.couponBtn = false;
            $scope.cartItemsDetail = CartService.getDisplayCart();
            $scope.hasSavedAddress = false;
            $scope.noInternet = false;
            $scope.paymentStarted = false;
            $scope.noNumber = false;
            var clientName = LoginService.getUserName();
            var clientEmail = LoginService.getUserEmail();
            $scope.address = {};
            var prevCpn = null;
            $scope.clientNamePrefilled = clientName;
            $(".removeIcon").click(function () {
                $(".className input[type='text']").val("");
            });

            $scope.removeCoupon = function () {
                $scope.noInternet = false;
                $scope.couponBtn = false;
                $scope.couponInput = false;
                $scope.couponCode = null;
                $scope.applied = false;
                $scope.discount = 0;
                $scope.payablePrice = $scope.basePrice - $scope.discount;
                prevCpn = null;

            };

            $scope.addCoupon = function (code) {
                $scope.noInternet = false;

                $scope.couponCode = code;
                if (code === '') {
                    $scope.couponBtn = false;
                    $scope.couponInput = false;
                    return;
                }
                $scope.applied = false;
                $scope.couponBtn = true;
                $scope.couponInput = true;
                $scope.discount = 0;
                $scope.payablePrice = $scope.basePrice - $scope.discount;
                prevCpn = null;
            };

            $scope.bagValue = function () {
                $scope.basePrice = CartService.getPayablePrice().basePrice;
                $scope.discount = CartService.getPayablePrice().discount;
                $scope.payablePrice = CartService.getPayablePrice().payablePrice;
            };

            $scope.applyCoupon = function () {
                if(CartService.getCartForVideoPkg() !== ''){
                    for(var i=0; i < CartService.getCartForVideoPkg().length; i++){
                        if(CartService.getCartForVideoPkg()[i].dI === 1){
                            $scope.couponValid = true;
                            $scope.isTabletInCart = true;
                            $scope.couponBtn = true;
                            $scope.couponInput = true;
                            $scope.applied = true;
                            prevCpn = null;
                            return;
                        }


                    }

                }

                $scope.couponBtn = false;
                if ($scope.couponCode === prevCpn) {
                    alert("Coupon Already Applied");
                    $scope.couponBtn = true;
                    return;
                }

                if ($scope.payablePrice <= 0) {
                    $scope.payablePrice = 0;
                    alert('You have availed maximum discount');
                    return;
                }

                var couponCodes = [];
                couponCodes.push($scope.couponCode);


                var packageIds = CartService.getPackageIds();

                var couponData = {};
                couponData.usedBy = LoginService.getUserEmail();
                couponData.couponCodes = couponCodes;
                couponData.packageIds = packageIds;

                StorefrontHttpService.bagValue(couponData).then(function (successCallback) {
                    totalDiscount(successCallback);

                    $scope.payablePrice = $scope.basePrice - $scope.discount;
                    $scope.couponInput = false;
                    $scope.couponValid = true;
                    $scope.applied = true;
                    prevCpn = $scope.couponCode;
                    $scope.couponBtn = true;
                    $scope.isTabletInCart = false;

                }, function (error) {

                    if (error.status === -1) {
                        $scope.couponBtn = true;
                        $scope.noInternet = true;
                        return;
                    }
                    $("#couponApplyBtn").html('Apply');
                    // $scope.couponCode = null;
                    $scope.couponValid = false;
                    $scope.couponBtn = true;
                    $scope.couponInput = true;
                    $scope.applied = true;
                    prevCpn = null;

                });
            };

            function totalDiscount(data) {
                for (var i = 0; i < data.length; i++) {
                    var temp = data[i];

                    var mrp = $scope.basePrice;
                    var cartItems = $scope.cartItemsDetail;
                    if (temp.isAll) {
                        tempDiscount(temp, mrp);
                    } else {
                        for (var w = 0; w < cartItems.length; w++) {
                            if (cartItems[w].id == temp.packageId) {
                                mrp = cartItems[w].sellingPrice;
                                tempDiscount(temp, mrp);
                            }
                        }
                    }
                }

                $scope.discount = Math.min($scope.basePrice, $scope.discount);
            }

            function tempDiscount(temp, mrp) {

                if (temp.amountOff) {
                    $scope.discount = $scope.discount + temp.amountOff;
                }

                if (temp.percentOff) {
                    $scope.discount = $scope.discount + (mrp * temp.percentOff / 100);
                }

            }

            $scope.isShippable = CartService.isShippable();


            $scope.formSubmit = function (formData) {
                if (!formData.$valid) {
                    angular.element("[name='" + formData.$name + "']").find('.ng-invalid:visible:first').focus();
                    $anchorScroll();
                    return false;
                }
                else {
                    $scope.paymentProceed();
                }
            };


            $scope.formSubmitMobile = function (formData) {
                if (!formData.$valid) {
                    angular.element("[name='" + formData.$name + "']").find('.ng-invalid:visible:first').focus();
                    return false;
                }
                else {
                    $scope.paymentProceed();
                }
            };

            $scope.paymentProceed = function () {

                if (!$scope.isShippable) {
                    if (!$scope.phoneNumber) {
                        $scope.noNumber = true;
                        return;

                    }
                }

                $scope.paymentStarted = true;
                if (typeof prevCpn === 'object') {
                    prevCpn = null;
                }
                var nameParamPayU = clientName || clientEmail;
                StorefrontHttpService.createOrder(CartService.getCartForServer(),
                    $scope.addressId, nameParamPayU, $scope.phoneNumber, prevCpn, CartService.getCartForVideoPkg())
                    .then(function (data) {
                        var params = data.data;
                        var amount = parseInt(params.amount);
                        if (amount < 1) {
                            $state.go('orderSuccess', {
                                orderId: params.txnid
                            });
                            return;
                        }

                        var paymentDTO = {};

                        for (var key in params) {
                            if (params.hasOwnProperty(key)) {
                                if (key !== 'postUrl') {
                                    paymentDTO[key] = params[key];
                                }
                            }
                        }


                        CartService.paymentPayU(params.postUrl, paymentDTO);
                        $scope.paymentStarted = false;

                    }, function (error) {
                        $scope.paymentStarted = false;
                        if (error.status === -1) {
                            alert('Check your internet connection!');
                            return;
                        }
                        alert(error.data.message);
                    });
            };

            $scope.removeItem = function (id) {
                CartService.deleteCartItem(id);
                $scope.cartItemsDetail = CartService.getDisplayCart();
                $scope.bagValue();
                $scope.isShippable = CartService.isShippable();
                $scope.couponCode = prevCpn;
                //$scope.couponBtn = true;
                prevCpn = null;
                $scope.removeCoupon();

            };

            $scope.getToastPosition = function () {
                sanitizePosition();
                return Object.keys($scope.toastPosition)
                    .filter(function (pos) {
                        return $scope.toastPosition[pos];
                    })
                    .join(' ');
            };

            $scope.saveNumber = function (val) {
                $scope.phoneNumber = val;
                if (val.length === 10) {
                    var phoneNumberDTO = {
                        email: clientEmail,
                        phone: val
                    };
                    LoginService.savePhoneNumber(phoneNumberDTO).then(function (data) {
                    }, function (error) {

                    });
                }
            };

            $scope.displayIsd = function () {
                $scope.showIsd = true;
                $scope.noNumber = false;

            };

            $scope.hideIsd = function (val) {
                $scope.phoneNumber = val || $scope.phoneNumber;
                if ($scope.phoneNumber && $scope.phoneNumber.length < 10) {
                    $scope.showIsd = true;
                }
                if (val === undefined || val === '') {
                    $scope.showIsd = false;
                }
            };

            $scope.saveAddress = function (data) {
                var addressDTO = {
                    name: data.clientName.$viewValue,
                    firstLine: data.clientAddress.$viewValue,
                    secondLine: data.clientAddress2.$viewValue,
                    city: data.clientCity.$viewValue,
                    state: data.clientState.$viewValue,
                    pincode: data.pincode.$viewValue,
                    landmark: data.landmark.$viewValue,
                    phone: data.fMobileNumber.$viewValue
                };
                StorefrontHttpService.saveAddress(addressDTO).then(function (data) {
                    $scope.hasSavedAddress = true;
                    $scope.validatedFirstLineAddress = data.data.firstLine;
                    $scope.validatedSecondLineAddress = data.data.secondLine;
                    $scope.validatedCity = data.data.city;
                    $scope.validatedState = data.data.state;
                    $scope.validatedPinCode = data.data.pincode;
                    $scope.addressId = data.data.id;
                    $scope.hasLandmark = data.data.landmark;


                }, function (error) {
                    $scope.hasSavedAddress = false;

                });
                $anchorScroll();
            };

            $scope.editCurrentAddress = function () {
                $scope.hasSavedAddress = false;
            };


            // var loadSavedAddress = function() {
            //     var addressData = StorefrontHttpService.getAllAddresses().then(function(successCallback) {
            //         //console.log(successCallback);
            //         $scope.hasSavedAddress = true;
            //         var preLoadedAddress = successCallback.data;
            //         $scope.validatedFirstLineAddress = preLoadedAddress.firstLine;
            //         $scope.validatedSecondLineAddress = preLoadedAddress.secondLine;
            //         $scope.validatedCity = preLoadedAddress.city;
            //         $scope.validatedState = preLoadedAddress.state;
            //         $scope.validatedPinCode = preLoadedAddress.pincode;
            //         $scope.addressId = preLoadedAddress.id;
            //     }, function(errorCallback) {
            //         //
            //     });
            //     //console.log(addressData);
            // }


            init = function () {
                //loadSavedAddress();
                $anchorScroll();
                $scope.bagValue();
            };
            init();
        }
    ]);
