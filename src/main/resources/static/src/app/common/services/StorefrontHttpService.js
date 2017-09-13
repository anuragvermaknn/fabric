/**
 * Created by shrey on 10th Sep 2017.
 */
(function() {

    'use strict';

    angular
        .module('common.services.StorefrontHttpService', [])

    .factory('StorefrontHttpService', ['HttpService', 'Utils',
        function(HttpService, Utils) {



            var API_VERSION1 = "/api/v1";




            var service = {


                getProductDetails : getProductDetails

            };

            return service;


            function getProductDetails() {
                var config = {
                    method: 'GET',
                    url: 'http://127.0.0.1:8081/product/items'
                    //url: 'https://api.myjson.com/bins/1dn3b5'
                };
                return HttpService.httpRequest(config);
            }

            //
            // function createOrder(cartJson, addressId, name, phone, couponCode, deviceData) {
            //     //mandatory
            //     var payload = {
            //         cartJson: cartJson,
            //         name: name,
            //         phone: phone,
            //         vD: deviceData
            //     };
            //
            //     //optional
            //     if (!Utils.isNullOrUndefined(addressId))
            //         payload.addressID = addressId;
            //
            //     if (!Utils.isNullOrUndefined(couponCode))
            //         payload.couponCode = couponCode;
            //
            //
            //     var config = {
            //         method: 'POST',
            //         url: STOREFRONT_PARENT_URL + ORDER_SUB_URL,
            //         data: payload,
            //         headers: {
            //             'X-JWT-Token': LoginService.getJwtToken(),
            //             'cp-origin': '2'
            //         }
            //     };
            //
            //     return HttpService.httpRequest(config);
            // }
            //
            // function getOrderHistory() {
            //     var config = {
            //         method: 'GET',
            //         url: STOREFRONT_PARENT_URL + ORDER_SUB_URL,
            //         headers: {
            //             'X-JWT-Token': LoginService.getJwtToken()
            //         }
            //     };
            //     return HttpService.httpRequest(config);
            //
            // }
            //
            // function getDetailedOrder(id) {
            //     var config = {
            //         method: 'GET',
            //         url: STOREFRONT_PARENT_URL + ORDER_SUB_URL + '/' + id,
            //         headers: {
            //             'X-JWT-Token': LoginService.getJwtToken()
            //         }
            //     };
            //     return HttpService.httpRequest(config);
            // }
            //
            // function saveAddress(addressDTO) {
            //     var config = {
            //         method: 'POST',
            //         url: STOREFRONT_PARENT_URL + ADDRESS_SUB_URL,
            //         data: addressDTO,
            //         headers: {
            //             'X-JWT-Token': LoginService.getJwtToken()
            //
            //         }
            //     };
            //     return HttpService.httpRequest(config);
            //
            // }
            //
            //
            //
            // function fetchSubmitState(id, packageId) {
            //     var config = {
            //         method: 'GET',
            //         url: STOREFRONT_PARENT_URL + MY_TEST_SERIES_SUB_URL + '/' + FETCH_SUBMIT_STATE + '?mappingId=' + id + '&packageId=' + packageId,
            //         headers: {
            //             'X-JWT-Token': LoginService.getJwtToken()
            //         }
            //     };
            //     return HttpService.httpRequest(config);
            // }
            //
            // function getVideoSolutionLanguages(mappingId, packageId, lang) {
            //
            //     var url = STOREFRONT_PARENT_URL + MY_TEST_SERIES_SUB_URL + VIEDO_URL + '/languages/' + mappingId;
            //     var config = {
            //         method: 'GET',
            //         url: url,
            //         headers: {
            //             'X-JWT-Token': LoginService.getJwtToken()
            //         }
            //     };
            //
            //     return HttpService.httpRequest(config);
            // }
            //
            // function getFaqs() {
            //     var config = {
            //         // url: STOREFRONT_PARENT_URL + MY_TEST_SERIES_SUB_URL +
            //         url: assetsURLPrefix + '/video-faqs.json'
            //     };
            //     return HttpService.httpRequest(config);
            // }


        }
    ]);
})();
