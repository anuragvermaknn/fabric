angular.module('common.directives.backButton', [])

.directive('backButton', ['$window', function($window) {
    return {
        restrict: 'A',
        templateUrl: 'common/directives/backButton.tpl.html',
        link: function(scope, elem) {
            elem.bind('click', function() {
                $window.history.back();
            });
        }
    };
}]);
