/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */


    'use strict';
    app.controller('AppCtrl', AppCtrl);

    AppCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window','$state'];

    function AppCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window,$state) {
        var vm = $scope;
        var that =this;
        vm.isIE = isIE();
        vm.isSmart = isSmart();
        vm.isState = isState;
        vm.isRecruiter = isRecruiter;
        // config
        vm.app = {
            name: '1000 Recruiters',
            version: '1.0.0',
            // for chart colors
            color: {
                'primary':      '#0cc2aa',
                'accent':       '#a88add',
                'warn':         '#fcc100',
                'info':         '#6887ff',
                'success':      '#6cc788',
                'warning':      '#f77a99',
                'danger':       '#f44455',
                'white':        '#ffffff',
                'light':        '#f1f2f3',
                'dark':         '#2e3e4e',
                'black':        '#2a2b3c'
            },
            setting: {
                theme: {
                    primary: 'primary',
                    accent: 'accent',
                    warn: 'warn'
                },
                folded: false,
                boxed: false,
                container: false,
                themeID: 1,
                bg: ''
            }
        };
        that.getBasicRole = getBasicRole;
        var setting = vm.app.name+'-Setting';
        // save settings to local storage
        if ( angular.isDefined($localStorage[setting]) ) {
            vm.app.setting = $localStorage[setting];
        } else {
            $localStorage[setting] = vm.app.setting;
        }
        // watch changes
        $scope.$watch('app.setting', function(){
            $localStorage[setting] = vm.app.setting;
        }, true);

        getParams('bg') && (vm.app.setting.bg = getParams('bg'));

        vm.setTheme = setTheme;
        setColor();

        function getBasicRole(){
            return $rootScope.currentUser.roles.basic[0]||'seeker';
        }

        function isRecruiter(){
            return vm.currentUser.roles.basic.indexOf('recruiter')>-1
        }
        function setTheme(theme){
            vm.app.setting.theme = theme.theme;
            setColor();
            if(theme.url){
                $timeout(function() {
                    $window.location.href = theme.url;
                }, 100, false);
            }
        };

        function setColor(){
            vm.app.setting.color = {
                primary: getColor(vm.app.setting.theme.primary),
                accent: getColor(vm.app.setting.theme.accent),
                warn: getColor(vm.app.setting.theme.warn)
            };
        };

        function getColor(name){
            return vm.app.color[ name ] ? vm.app.color[ name ] : palette.find(name);
        };

        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
            // goto top
            $location.hash('content');
            $anchorScroll();
            $location.hash('');
            // hide open menu
            $('#aside').modal('hide');
        };

        vm.goBack = function () {
            $window.history.back();
        };

        function isIE() {
            return !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        }

        function isSmart(){
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }
        function isState(state){
            return $state.includes(state);
        }

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        this.currencyFormatting = currencyFormatting;

        function currencyFormatting(value) {
            return "$"+value.toString()+'k';
        }

    }

