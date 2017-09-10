angular.module('topbar.controllers.TopbarCtrl', [])
    .controller('TopbarCtrl', ['$state', '$scope', '$mdDialog', '$facebook', '$mdMedia',
        'SFLocalStorageService', 'CartService', 'LoginService', '$rootScope', '$mdToast',
        function ($state, $scope, $mdDialog, $facebook, $mdMedia, SFLocalStorageService,
                  CartService, LoginService, $rootScope, $mdToast) {

            $scope.google = false;
            $scope.showLogin = showLogin;
            $scope.forgotFlag = false;
            $scope.otpValid = false;
            $scope.errorFlag = false;
            $scope.otp = '';
            $scope.imgPrefix = $rootScope.assetsURLPrefix;
            $scope.OTPValidPending = true;
            $scope.status = '  ';
            $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            $scope.notReg = false;
            var opened = false;

            $scope.cnfrmPass = function () {
                if ($scope.clientPassword && $scope.clientConfirmPassword === $scope.clientPassword) {
                    $scope.disable = false;
                    return true;
                } else {
                    $scope.disable = true;
                    return false;
                }
            };


            $scope.exitCanvas = function () {
                document.getElementById("exit-canvas").click();

            };

            $scope.gClick = function () {
                $scope.google = true;
                return;
            };

            $scope.gSignIn = function () {
                if (!opened) {
                    angular.element(document.getElementById('google2')).trigger('click');
                    opened = true;
                }
            };

            $scope.isLoggedIn = function () {
                return LoginService.isLoggedIn();
            };

            $scope.logout = function () {
                $scope.google = false;
                $rootScope.jwtToken = '';
                SFLocalStorageService.clearAll();
                $rootScope.cartCount = CartService.getCartItemCount();
                $state.go('home');
                // $window.location.reload();
            };

            $scope.$on('event:google-plus-signin-success', function (event, authResult) {
                // Send login to server 
                gapi.client.load('plus', 'v1', apiClientLoaded);
                googleIdToken = authResult.id_token;

            });

            function apiClientLoaded() {
                gapi.client.plus.people.get({userId: 'me'}).execute(handleResponse);
            }

            function handleResponse(resp) {
                var googleParamsDTO = {
                    name: resp.displayName,
                    email: resp.emails[0].value,
                    providerUserId: resp.id,
                    providerToken: googleIdToken,
                    providerName: 'g'
                };

                LoginService.googleSignIn(googleParamsDTO).then(function (data) {

                    if (data.jwtToken) {
                        LoginService.setJwtToken(data.jwtToken);
                        LoginService.setUserName(data.userInfo.name);
                        LoginService.setUserEmail(data.userInfo.email);
                        $mdDialog.hide();
                    }

                }, function () {

                });
            }

            $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
                // Auth failure or signout detected
            });


            function showLogin(ev) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: 'TopbarCtrl',
                    templateUrl: 'topbar/views/tabDialog.tpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                });
            }

            $scope.loginFacebook = function () {
                $facebook.login()
                    .then(function () {
                        var resp = $facebook.getAuthResponse();
                        $facebook.api("/me?fields=id,name,email")
                            .then(function (response) {

                                if (!response.email) {
                                    var toast = $mdToast.simple().content('Email Not Found. Try another way to sign in!')
                                        .position('bottom right').hideDelay(15000).highlightAction(true);

                                    $mdToast.show(toast);
                                } else {
                                    return LoginService.registerWithFacebook(response, resp.accessToken);
                                }

                            })
                            .then(function (data) {

                                if (data) {
                                    LoginService.setJwtToken(data.jwtToken);
                                    LoginService.setUserName(data.userInfo.name);
                                    LoginService.setUserEmail(data.userInfo.email);
                                    $mdDialog.hide();
                                }

                            });
                    });
            };


            $scope.userRegister = function () {
                $scope.errorRegFlag = false;
                var userDetailRegistrationDTO = {
                    name: $scope.clientName,
                    email: $scope.clientEmail,
                    sec: $scope.clientPassword,
                    providerName: "email"

                };
                LoginService.registerNewUser(userDetailRegistrationDTO).then(function (data) {

                    if (data.jwtToken) {
                        LoginService.setJwtToken(data.jwtToken);
                        LoginService.setUserName(data.userInfo.name);
                        LoginService.setUserEmail(data.userInfo.email);
                        $mdDialog.hide();
                    }

                }, function (error) {
                    $scope.disable = true;

                    $scope.errorRegMessage = error.data.message;
                    $scope.errorRegFlag = true;
                    $scope.clientPassword = '';
                    $scope.clientConfirmPassword = '';
                    // $scope.clientEmail = '';
                    $scope.projectForm.clientEmail.$touched = false;
                    $scope.projectForm.clientPassword.$touched = false;
                    $scope.projectForm.clientConfirmPassword.$touched = false;

                    $scope.projectForm.clientEmail.$setPristine = true;
                    $scope.projectForm.clientPassword.$setPristine = true;
                    $scope.projectForm.clientConfirmPassword.$setPristine = true;

                    $scope.projectForm.clientEmail.$error = false;
                    $scope.projectForm.clientPassword.$error = false;
                    $scope.projectForm.clientConfirmPassword.$error = false;


                });
            };

            $scope.userLogin = function () {
                $scope.errorFlag = false;
                var userLoginDetailsDTO = {
                    email: $scope.clientEmailLogin,
                    sec: $scope.changedPassword,
                    providerName: "email"
                };
                LoginService.loginUser(userLoginDetailsDTO).then(function (success) {
                    LoginService.setJwtToken(success.jwtToken);
                    LoginService.setUserName(success.userInfo.name);
                    LoginService.setUserEmail(success.userInfo.email);
                    $mdDialog.hide();

                }, function (error) {
                    $scope.errorCaseMessage = error.data.message;
                    $scope.errorFlag = true;

                });
            };

            $scope.changePasswordLogin = function () {
                var userLoginDetailsDTO = {
                    email: $scope.clientEmailLogin,
                    sec: $scope.changedPassword,
                    providerName: "email",
                    otp: $scope.otpEntered
                };

                LoginService.forgotPasswdReg(userLoginDetailsDTO).then(function (data) {

                    if (data.jwtToken) {
                        LoginService.setJwtToken(data.jwtToken);
                        LoginService.setUserName(data.userInfo.name);
                        LoginService.setUserEmail(data.userInfo.email);
                        $mdDialog.hide();
                    }

                }, function (error) {

                });
            };

            $scope.forgotPassword = function () {
                $scope.notReg = false;
                $scope.hidePasswdField = true;
                if ($scope.clientEmailLogin === undefined) {
                    $scope.forgotFlag = false;
                } else {
                    var emailId = $scope.clientEmailLogin;
                    LoginService.forgotPassword(emailId).then(function (data) {
                        $scope.forgotFlag = true;
                        var toast = $mdToast.simple().content('OTP sent to registered email!').position('bottom right').hideDelay(8000).highlightAction(true);
                        $mdToast.show(toast).then(function (response) {


                        });
                    }, function (error) {
                        $scope.notReg = true;
                        $scope.forgotFlag = false;
                        $scope.errorText = 'Please register first.';
                       // $scope.hidePasswdField = false;
                        var toast = $mdToast.simple().content('You are not registered with us. Please sign up.').position('bottom right').hideDelay(8000).highlightAction(true);
                        $mdToast.show(toast).then(function (response) {
                        });
                    });

                }

            };

            $scope.myFunc = function (val) {
                if (val.length === 6) {
                    $scope.otpEntered = val;
                    var otpValidationDTO = {
                        email: $scope.clientEmailLogin,
                        otp: val
                    };
                    LoginService.otpValidation(otpValidationDTO).then(function (data) {
                        $scope.OTPValidPending = false;
                        $scope.otpInvalid = false;

                        angular.element("[name='" + $scope.loginForm.$changeLoginPassword + "']").focus();


                    }, function (error) {
                        $scope.loginForm.pincode.$touched = true;
                        $scope.otpInvalid = true;
                        $scope.errorOTPMessage = error.data.message;
                    });
                }
                else {
                    $scope.otpInvalid = false;

                }
            };


            $scope.myNewPassword = function (val) {
                $scope.changedPassword = val;
            };

        }
    ]);
