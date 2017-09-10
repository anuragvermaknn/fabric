/**
 * Created by nikhil on 7/29/16.
 */
(function () {

    'use strict';

    angular
        .module('common.services.CartService', [])
        .factory('CartService', ['SFLocalStorageService', 'StorefrontHttpService', '$rootScope', 'Utils', '$sce',
            function (SFLocalStorageService, StorefrontHttpService, $rootScope, Utils, $sce) {

                var CART_ITEMS = 'CART_ITEMS';
                var CART_ITEMS_COUNT = 'CART_ITEMS_COUNT';

                $rootScope.cartCount = getCartItemCount();
                $rootScope.currentCartPrice = getPayablePrice().basePrice
                var service = {
                    addCartItem: addCartItem,
                    deleteCartItem: deleteCartItem,
                    clearCart: clearCart,
                    getCartItemCount: getCartItemCount,
                    getDisplayCart: getDisplayCart,
                    getPayablePrice: getPayablePrice,
                    getCartForServer: getCartForServer,
                    paymentPayU: paymentPayU,
                    isShippable: isShippable,
                    getPackageIds: getPackageIds,
                    getCartForVideoPkg: getCartForVideoPkg

                };

                return service;

                function clearCart() {
                    SFLocalStorageService.removeItem(CART_ITEMS);
                    SFLocalStorageService.removeItem(CART_ITEMS_COUNT);
                }

                function isShippable() {

                    var cart = getDisplayCart();

                    if (Utils.isNullOrUndefined(cart))
                        return false;
                    else {

                        for (var i = 0, len = cart.length; i < len; ++i) {
                            if (cart[i].shippable) {
                                return true;
                            }
                        }
                        return false;
                    }
                }

                function getDisplayCart() {
                    var cart = getCart();
                    if (Utils.isNullOrUndefined(cart)) {
                        return {};
                    } else {
                        //var finalCart = [];
                        var finalCart = Object.keys(cart).map(function (key) {
                            return cart[key];
                        });
                        return finalCart;
                    }
                }

                function addCartItem(cartItem) {
                    var cart = getCart();

                    if (!Utils.isNullOrUndefined(cart) && !Utils.isNullOrUndefined(cart[cartItem.id]) && !Utils.isNullOrUndefined(cart[cartItem.validity]))
                        return false;


                    // omitting description from cart item and keeping other values
                    var obj = {
                        id: cartItem.id,
                        title: cartItem.title,
                        imageUrl: cartItem.imageUrl,
                        maximumRetailPrice: cartItem.maximumRetailPrice,
                        sellingPrice: cartItem.sellingPrice,
                        count: cartItem.count,
                        shippable: cartItem.shippable,
                        deviceNameVideo: cartItem.deviceName,
                        validityVideoPkg: cartItem.validity,
                        validityDispName: cartItem.validityDisplay,
                        deviceId: cartItem.deviceId,
                        lN:cartItem.language

                    };


                    if (Utils.isNullOrUndefined(cart)) {

                        var cart = {};

                        cart[obj.id] = obj;

                        setCart(cart);

                        increaseCartItemCount();

                    }

                    if(cart[obj.id] != undefined){
                        var noOfItems = getCartItemCount();

                        cart[obj.id] = obj;

                        setCart(cart);

                    }

                    else {

                        var noOfItems = getCartItemCount();

                        cart[obj.id] = obj;

                        setCart(cart);

                        increaseCartItemCount();
                    }

                    $rootScope.currentCartPrice = getPayablePrice().basePrice;


                }

                function deleteCartItem(id) {

                    var cart = getCart();

                    if (Utils.isNullOrUndefined(cart)) {

                        return;
                    } else {

                        // This will preserve order and not rearrange array elements after deletion
                        delete cart[id];

                        setCart(cart);

                        decreaseCartItemCount();
                    }
                }

                function getCartPrice() {

                    var cart = getCart();
                    var price = 0;

                    if (!Utils.isNullOrUndefined(cart)) {

                        var priceArr = Object.keys(cart).map(function (key) {
                            return cart[key].sellingPrice;
                        });

                        for (var i = 0; i < priceArr.length; i++) {
                            price = price + parseInt(priceArr[i]);
                        }
                    }

                    return price;
                }

                function getPayablePrice() {

                    var BASE_PRICE_KEY = "basePrice";
                    var DISCOUNT_KEY = "discount";
                    var PAYABLE_PRICE_KEY = "payablePrice";
                    var ERROR_KEY = "error";
                    var PACKAGE_ID_KEY = "packageId";
                    var cartPriceObject = {};

                    var packageIds = getPackageIds();

                    var priceBeforeCoupon = getCartPrice();

                    if (!Utils.isNullOrUndefined(packageIds)) {

                        cartPriceObject[BASE_PRICE_KEY] = priceBeforeCoupon;
                        cartPriceObject[PAYABLE_PRICE_KEY] = cartPriceObject[BASE_PRICE_KEY];
                        cartPriceObject[DISCOUNT_KEY] = 0;

                    } else {
                        // TODO : What should be done here?
                        cartPriceObject[BASE_PRICE_KEY] = 0;
                        cartPriceObject[PAYABLE_PRICE_KEY] = 0;
                        cartPriceObject[DISCOUNT_KEY] = 0;
                    }

                    return cartPriceObject;
                }

                function getCartForServer() {

                    var packageIds = getPackageIds();

                    var cart = {};

                    for (var i = 0; i < packageIds.length; i++) {
                        // Hard coding qty of each package to 1
                        cart[packageIds[i]] = 1;
                    }

                    return JSON.stringify(cart);
                }


                function getCartForVideoPkg() {
                    var packageIds = getPackageIds();
                    var cart = [];
                    var tempCart = getDisplayCart();
                    for (var i = 0; i < packageIds.length; i++) {
                        if (tempCart[i].deviceId) {
                            var vidObj = {
                                pI: tempCart[i].id,
                                mO: tempCart[i].validityVideoPkg,
                                dI: tempCart[i].deviceId,
                                lN:tempCart[i].lN
                            };
                            cart.push(vidObj);
                        }
                    }

                    return cart;
                }

                function getPackageIds() {

                    var cart = getCart();

                    var packageIds = [];

                    if (!Utils.isNullOrUndefined(cart)) {

                        packageIds = Object.keys(cart).map(function (key) {
                            return cart[key].id;
                        });

                        return packageIds;

                    } else {
                        return null;
                    }


                }

                function getCart() {
                    return JSON.parse(SFLocalStorageService.getItem(CART_ITEMS));
                }

                function setCart(cart) {
                    return SFLocalStorageService.setItem(CART_ITEMS, JSON.stringify(cart));
                }

                function decreaseCartItemCount() {
                    var count = getCartItemCount();
                    count = count - 1;
                    setCartItemCount(count);
                }

                function increaseCartItemCount() {
                    var count = getCartItemCount();
                    count = count + 1;
                    setCartItemCount(count);
                }

                function getCartItemCount() {
                    var count = SFLocalStorageService.getItem(CART_ITEMS_COUNT);
                    if (Utils.isNullOrUndefined(count))
                        return 0;
                    else
                        return Number(count);
                }

                function setCartItemCount(count) {
                    SFLocalStorageService.setItem(CART_ITEMS_COUNT, count);
                    $rootScope.cartCount = getCartItemCount();
                }

                function paymentPayU(url, paramDTO) {
                    url = $sce.trustAsResourceUrl(url);
                    $rootScope.$broadcast('form.submit', {
                        url: url,
                        params: paramDTO
                    });
                }


            }
        ])
        .directive('formSubmitter', formSubmitterDirective);

    function formSubmitterDirective($timeout) {

        var templateString = '<form action="{{ formData.url }}" method="post">' +
            '   <input type="hidden" id="key" name="key" value="{{formData.params.key}}" >' +
            '   <input type="hidden" id="hash" name="hash" value="{{formData.params.hash}}" >' +
            '   <input type="hidden" id="txnid" name="txnid" value="{{formData.params.txnid}}" >' +
            '   <input type="hidden" id="service_provider" name="service_provider" value="{{formData.params.service_provider}}" >' +
            '   <input type="hidden" id="amount" name="amount" value="{{formData.params.amount}}" >' +
            '   <input type="hidden" id="firstname" name="firstname" value="{{formData.params.firstname}}" >' +
            '   <input type="hidden" id="email" name="email" value="{{formData.params.email}}" >' +
            '   <input type="hidden" id="phone" name="phone" value="{{formData.params.phone}}" >' +
            '   <input type="hidden" id="productinfo" name="productinfo" value="{{formData.params.productinfo}}" >' +
            '   <input type="hidden" id="surl" name="surl" value="{{formData.params.surl}}" >' +
            '   <input type="hidden" id="furl" name="furl" value="{{formData.params.furl}}" >' +
            '   <input type="hidden" id="udf1" name="udf1" value="{{formData.params.udf1}}" >' +
            '</form>';

        return {
            restrict: 'E',
            replace: true,
            template: templateString,
            link: function ($scope, $element, $attrs) {
                $scope.$on('form.submit', function (event, data) {

                    $scope.formData = data;

                    $timeout(function () {
                        $element.submit();
                    })
                })
            }
        }
    }
}());
