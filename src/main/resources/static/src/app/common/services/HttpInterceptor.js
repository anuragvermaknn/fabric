/**
 * Created by nikhil on 9/26/16.
 */

(function () {

    'use strict';

    angular
        .module('storefront')
        .factory('HttpInterceptor', HttpInterceptor);

    HttpInterceptor.$inject = ['$q', '$rootScope', '$state'];

    function HttpInterceptor($q, $rootScope, $state) {

        // Do not rename methods. These override functions of $httpProvider
        var methods = {
            request: request,
            responseError: responseError
        };

        return methods;

        // All requests going through HttpService will have a jwt-token in header if present
        function request(config) {
            var tempToken = $rootScope.jwtToken;
            if (config.url.indexOf('api.adda247.com') > -1 || config.url.indexOf('/api/') > -1) {

                config.headers['X-Auth-Token'] = 'fpoa43edty5';

                if (tempToken)
                    config.headers['X-JWT-Token'] = tempToken;
            }
            if (config.url.indexOf('userapi.adda247.com') > -1) {
                config.headers['cp-origin'] = '2';
            }
            return config;
        }

        function responseError(response) {

            //redirect to home if 401
            if (response.status === 401 && response.data.path !== '/forgotPassword') {
                $rootScope.isTestForumActive = false;
                $state.go('home');
                return;
            }

            return $q.reject(response);
        }

    }

})();
