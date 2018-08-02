angular.module('ngCart')
    .controller('BillingFormCtrl',BillingFormController);
    BillingFormController.$inject=['$scope','$meteor','ngCart','Cards'];
    function BillingFormController($scope,$meteor,ngCart,Cards){
        $scope.paying=false;
        $scope.cardType='visa';
        $scope.handleStripe=function(status,response){
            $scope.paying=true;
            $meteor.call("chargeClient",response.id,$scope.client._id,angular.toJson($scope.cart)).then(function(res){
                $scope.paying=false;
                console.log(response);
            },function(err){

            });
        }
        $scope.cardTypes = Cards.types();
    }