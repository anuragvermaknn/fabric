/**
 * Created by nikhil on 7/29/16.
 */
(function() {

    'use strict';

    angular
        .module('common.services.LoginService', [])
        .factory('LoginService', LoginService);

    LoginService.$inject = ['HttpService', 'SFLocalStorageService', 'Utils', '$mdDialog', '$mdMedia', 'userUrl', '$rootScope'];

    function LoginService(HttpService, SFLocalStorageService, Utils, $mdDialog, $mdMedia, userUrl, $rootScope) {

        var JWT_KEY = 'JWT_TOKEN';
        var USERNAME = 'USERNAME';
        var USER_EMAIL = 'USER_EMAIL';
        var STUDENT_EMAIL = 'STUDENT_EMAIL';


        // Change following 1 url for staging <-> production
        // Change Begins

        var USER_AUTH_API = userUrl;

        // Change Ends

        var service = {
            getJwtToken: getJwtToken,
            setJwtToken: setJwtToken,
            removeJwtToken: removeJwtToken,
            isLoggedIn: isLoggedIn,
            changePassword: changePassword,
            //refresh: refresh,
            registerWithFacebook: registerWithFacebook,
            setUserName: setUserName,
            getUserName: getUserName,
            setUserEmail: setUserEmail,
            getUserEmail: getUserEmail,
            googleSignIn: googleSignIn,
            showLogin: showLogin,
            registerNewUser: registerNewUser,
            loginUser: loginUser,
            forgotPassword: forgotPassword,
            otpValidation: otpValidation,
            forgotPasswdReg: forgotPasswdReg,
            savePhoneNumber: savePhoneNumber,
            getClassroomEmail: getClassroomEmail,
            setClassroomEmail: setClassroomEmail,
            createCookie: createCookie
        };

        return service;




        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function googleSignIn(googleParamsDTO) {
            var googleLogin;
            if (googleLogin === true) {
                return;
            }

            var googleLoginObj = {
                method: 'POST',
                url: USER_AUTH_API + '/register',
                data: googleParamsDTO
            };
            if (googleLoginObj.data.email) {
                googleLogin = true;
                return HttpService.httpRequest(googleLoginObj);
            }
        }

        function registerWithFacebook(response, token) {

            var facebookLoginObj = {
                method: 'POST',
                url: USER_AUTH_API + '/register',
                data: {
                    "name": response.name,
                    "email": response.email || null,
                    "providerToken": token,
                    "providerUserId": response.id,
                    "providerName": "f"
                }
            };

            return HttpService.httpRequest(facebookLoginObj);
        }

        function registerNewUser(userDetailRegistrationDTO) {

            var config = {
                method: 'POST',
                url: USER_AUTH_API + '/register',
                data: userDetailRegistrationDTO

            };

            return HttpService.httpRequest(config);
        }

        function loginUser(userLoginDetailsDTO) {

            var config = {
                method: 'POST',
                url: USER_AUTH_API + '/login',
                data: userLoginDetailsDTO
            };

            return HttpService.httpRequest(config);
        }

        function showLogin(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: 'TopbarCtrl',
                templateUrl: 'topbar/views/tabDialog.tpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        }


        function isLoggedIn() {
            return !Utils.isNullOrUndefined(getJwtToken());
        }

        function forgotPassword(emailId) {
            var config = {
                method: 'GET',
                url: USER_AUTH_API + '/forgotPassword?emailId=' + emailId
            };
            return HttpService.httpRequest(config);

        }

        function otpValidation(otpValidationDTO) {
            var config = {
                method: 'POST',
                url: USER_AUTH_API + '/verifyOTP',
                data: otpValidationDTO
            };
            return HttpService.httpRequest(config);
        }


        function forgotPasswdReg(userLoginDetailsDTO) {
            var config = {
                method: 'POST',
                url: USER_AUTH_API + '/register',
                data: userLoginDetailsDTO

            };

            return HttpService.httpRequest(config);
        }

        function changePassword(changePasswordDTO) {
            var config = {
                method: 'POST',
                url: USER_AUTH_API + '/changePassword',
                data: changePasswordDTO,
                headers: {
                    'X-JWT-Token': getJwtToken()
                }
            };
            return HttpService.httpRequest(config);
        }

        function savePhoneNumber(phoneDTO) {
            var config = {
                method: 'POST',
                url: USER_AUTH_API + '/addPhone',
                data: phoneDTO,
                headers: {
                    'X-JWT-Token': getJwtToken()
                }
            };
            return HttpService.httpRequest(config);
        }

        function getJwtToken() {
            $rootScope.jwtToken = $rootScope.jwtToken || SFLocalStorageService.getItem(JWT_KEY);
            return $rootScope.jwtToken;
        }

        function setJwtToken(token) {
            createCookie('cp_token', $rootScope.jwtToken, 7);
            $rootScope.jwtToken = token;
            return SFLocalStorageService.setItem(JWT_KEY, token);
        }

        function removeJwtToken() {
            return SFLocalStorageService.removeItem(JWT_KEY);
        }

        function setUserName(name) {
            return SFLocalStorageService.setItem(USERNAME, name);
        }

        function getUserName() {
            return SFLocalStorageService.getItem(USERNAME);
        }

        function setUserEmail(email) {
            return SFLocalStorageService.setItem(USER_EMAIL, email);
        }

        function getUserEmail() {
            return SFLocalStorageService.getItem(USER_EMAIL);
        }

        function setClassroomEmail(email) {
            return SFLocalStorageService.setItem(STUDENT_EMAIL, email);
        }

        function getClassroomEmail() {
            return SFLocalStorageService.getItem(STUDENT_EMAIL);
        }

    }
})();
