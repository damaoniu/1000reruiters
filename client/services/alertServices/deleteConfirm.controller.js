angular.module('hunters').controller('DeleteConfirmCtrl',['$scope',function($scope){
    $scope.yes=function(){
        $scope.$close(true);
    };
    $scope.no=function(){
        $scope.$dismiss();
    }
}]);