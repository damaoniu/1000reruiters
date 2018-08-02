angular.module('hunters').service('loginModal', ['$uibModal','$rootScope',function ($uibModal, $rootScope) {

    return function() {
        var instance = $uibModal.open({
            templateUrl: 'client/services/loginModal/loginModalTemplate.html',
            controller: 'LoginModalCtrl',
            controllerAs: 'lmCt'
        })
        return instance.result.then(function(user){
            $rootScope.currentUser = user;
            return user;
        });
    };

}]);