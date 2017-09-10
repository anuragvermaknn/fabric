angular.module('profile.controllers.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$location', '$anchorScroll', 'anchorSmoothScroll', '$state', 'LoginService', '$mdDialog', '$window', function($scope, $location, $anchorScroll, anchorSmoothScroll, $state, LoginService, $mdDialog) {
        $scope.disable = true;
        $scope.isActive = function(viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
        loadProfileData = function() {
            $scope.clientName = LoginService.getUserName();
            $scope.clientEmail = LoginService.getUserEmail();
        }

        $scope.cnfrmPass = function() {
            if ($scope.clientPassword && $scope.clientConfirmPassword === $scope.clientPassword) {
                $scope.disable = false;
                return true;
            } else {
                $scope.disable = true;
                return false;
            }
        }

        $scope.saveChanges = function() {
            var changePasswordDTO = {
                email: $scope.clientEmail,
                sec: $scope.clientPassword
            };
            LoginService.changePassword(changePasswordDTO)
                .then(function(data) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Changes Saved Successfully!')
                        .ok('Got it!')
                        .targetEvent()
                    );
                    $scope.clientPassword = '';
                    $scope.clientConfirmPassword = '';
                    $scope.projectForm.clientPassword.$touched = false;
                    $scope.projectForm.clientConfirmPassword.$touched = false;
                    $scope.projectForm.clientPassword.$error = false;
                    $scope.projectForm.clientConfirmPassword.$error = false;
                    $scope.projectForm.clientPassword.$setPristine = true;
                    $scope.projectForm.clientConfirmPassword.$setPristine = true;
                    $scope.disable = true;

                }, function(error) {
                    $scope.disable = true;

                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Failure')
                        .textContent('Something went wrong!')
                        .ok('Got it!')
                        // You can specify either sting with query selector
                        .openFrom('#left')
                        // or an element
                        .closeTo(angular.element(document.querySelector('#right')))
                    );
                });
        }

        function isLoggedIn() {
            login = LoginService.isLoggedIn();
            if (!login) {
                $state.go('home');
            } else {
                loadProfileData();
            }
        }
        init = function() {
            isLoggedIn();
            $anchorScroll();
        }
        init();
    }]);
