angular.module('hunters').controller('LoginModalCtrl', ['$scope','$meteor','$rootScope',function ($scope, $meteor,$rootScope) {

    $scope.cancel = $scope.$dismiss;
    $scope.error='';
    $scope.lg={
        email:'',
        password:''
    };
    $scope.submit = function () {
        $meteor.loginWithPassword($scope.lg.email, $scope.lg.password).then(function () {
            var user = Meteor.user();
            $scope.$close(user);
        },function(err){
           $scope.error=err;
        });
    };

}]);
