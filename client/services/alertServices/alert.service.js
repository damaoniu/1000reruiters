angular.module('hunters').service('alertService',[
    '$uibModal',
    function($uibModal){
        return {
            deleteConfirm:function(){
                var instance= $uibModal.open({
                    templateUrl: 'client/services/alertServices/deleteConfirm.ng.html',
                    controller: 'DeleteConfirmCtrl'
                });
                return instance.result;
            },
            saveOrDiscard:function(){
                var instance = $uibModal.open({
                    templateUrl:'client/services/alertServices/saveordiscard.ng.html',
                    controller:'SaveOrDiscardCtrl'

                });
                return instance.result;
            }
        };
    }
]);