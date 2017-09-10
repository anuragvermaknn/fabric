/**
 * Created by nikhil on 7/27/16.
 */
(function () {
    'use strict';

    angular
        .module('common.services.HttpService', [])
        .factory('HttpService', HttpService);


    HttpService.$inject = ['$http', '$q'];

    function HttpService($http, $q) {

        var service = {
            httpRequest: httpRequest
        };

        return service;

        function httpRequest(config) {

            var deferred = $q.defer();

            $http(config).then(
                //success function
                function (response) {

                    // This is structured according to the API response : (success,error,data) and on success, the data key of the API response is returned.
                    deferred.resolve(response.data);
                },
                //error function
                function (err) {
                    deferred.reject(err);
                }
            );

            return deferred.promise;
        }
    }

})();