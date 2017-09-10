/**
 * Created for nikhil on 7/27/16.
 */
// This is only for usage in other services. Do not Inject this service directly into controllers
(function() {

    'use strict';

    angular
        .module('common.services.SFLocalStorageService', ['LocalStorageModule'])

    .factory('SFLocalStorageService', SFLocalStorageService);

    SFLocalStorageService.$inject = ['localStorageService'];

    function SFLocalStorageService(localStorageService) {

        // var USER_INFO = 'USER_INFO';

        var MAG_ID = 'MAG_ID';
        var LISTING = 'LISTING';
        var service = {
            getItem: get,
            setItem: set,
            removeItem: remove,
            clearAll: clearAll,
            setMagId: setMagId,
            getMagId: getMagId,
            setListingsMeta: setListingsMeta,
            getListingsMeta: getListingsMeta
        };

        return service;


        function setListingsMeta(listingsArr) {
            return set(LISTING, listingsArr);
        }

        function getListingsMeta() {
            return get(LISTING);
        }

        function setMagId(id) {
            return set(MAG_ID, id);
        }

        function getMagId() {
            return get(MAG_ID);
        }

        function set(key, val) {
            return localStorageService.set(key, val);
        }

        function get(key) {
            return localStorageService.get(key);
        }

        function remove(key) {
            return localStorageService.remove(key);
        }

        function clearAll() {
            return localStorageService.clearAll();
        }
    }

})();
