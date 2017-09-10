/**
 * Created by nikhil on 7/29/16.
 */
(function () {

    'use strict';

    angular
        .module('common.services.CouponHttpService', [])
        .factory('CouponHttpService', ['HttpService', function (HttpService) {

            // FIXME : change this URL to where coupon is running.
            var couponStagingUrl = "http://storefront-userstage-env.us-east-1.elasticbeanstalk.com";

            var couponProductionUrl = "";

            var COUPON_PARENT_URL = couponStagingUrl;

            var SHOW_DISCOUNT_URL = "/showDiscount";

            var service = {
                checkDiscount: checkDiscount
            };

            return service;

            function checkDiscount(couponCode, packageIds) {

                var couponCodes = [couponCode];

                var payload = {
                    couponCodes: couponCodes,
                    packageIds: packageIds
                };

                var config = {
                    method: 'POST',
                    url: COUPON_PARENT_URL + SHOW_DISCOUNT_URL,
                    data: payload
                };

                return HttpService.httpRequest(config);

            }
        }]);

}());