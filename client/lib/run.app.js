/*
 * configuration for the run of the angular app
 * */
angular.module('hunters').run(['$rootScope','loginModal','$state','$alert',function ($rootScope,loginModal,$state,ngNotify) {
    /*
     * to have a login modal whenever it is needed
     * */
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        if(_.has(toState,'data')) {
            var requireLogin = toState.data.requireLogin;
            if (requireLogin &&  Meteor.userId() === null) {
                event.preventDefault();
                // get me a login modal!
                loginModal()
                    .then(function () {
                        return $state.go(toState.name, toParams);
                    })
                    .catch(function () {
                        return $state.includes('dashbaord');
                    });
            }
        }
    });



}]);