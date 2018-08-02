angular.module('hunters')
    .controller('SaveOrDiscardCtrl',saveDiscardCtrl);
    saveDiscardCtrl.$inject=['$scope'];
    function saveDiscardCtrl($scope){
        $scope.save=function(){
            $scope.$close(true);
        }
        $scope.discard=function()
        {
            $scope.$close(false);
        }
    }