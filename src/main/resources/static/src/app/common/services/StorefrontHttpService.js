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
         //var parentUrl="http://fabric-env.smw9rqcurp.us-east-1.elasticbeanstalk.com:8081";
           var parentUrl='http://54.234.50.76:8081';
            
            var service = {
                getProductDetails : getProductDetails,
                getClothDetail : getClothDetail,
                renderProductImage : renderProductImage
            };

            return service;

            function renderProductImage(imageDTO) {
                var config = {
                    method : 'POST',
                    url: parentUrl+'/data/image',
                    data: imageDTO
                };
                return HttpService.httpRequest(config);
            }

            function getClothDetail() {
                var config = {
                    method : 'GET',
                    url: parentUrl+ '/get/AllCategroies/data'
                };
                return HttpService.httpRequest(config);
            }

            function getProductDetails() {
                var config = {
                    method: 'GET',
                    url: parentUrl+'/product/items'
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
