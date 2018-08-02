angular.module('hunters')
    .controller('PaginationCtrl',[
    "$scope","$meteor","$window","alertService",
    function($scope,$meteor,$window,alertService){
        $scope.perPage=$scope.perPage||10;
        $scope.page=1;
        $scope.parent = $scope.$parent;
        $meteor.autorun($scope,function(){
            $scope.$meteorSubscribe($scope.subscription,{
                limit: parseInt($scope.getReactively('perPage')),
                skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort:{
                    updatedAt:-1
                }
            },$scope.$parent.currentUser._id,$scope.getReactively('search')).then(function(servicesHandler){
                $scope.itemsCount = $scope.$meteorObject(Counts,$scope.subscription+"Number",false);
                $scope.collection = $scope.$meteorCollection(function(){
                    //find the collection by using the $window variable
                    var collection = $scope.isUser?Meteor.users:$window[capitalizeFirst($scope.subscription)];
                    var exclusion = $scope.isUser?{_id:{$ne:$scope.$parent.currentUser._id}}:{};
                    return collection.find(exclusion,{
                        sort:{
                            createdAt:-1
                        }
                    });
                });

            });
        });

        $scope.pageChanged = function(newPage) {
            $scope.page = newPage;
        };
        $scope.edit=function(Object,big,edit,item){
            console.log('editint');
            //need to call on the $parent scope to access the main controller on it
            $scope.$parent.main.operateItem(Object,big,edit,item);
        };
        //do not need to delegate this to the mainController just do it here
        $scope.remove=function(item, Object){
            alertService.deleteConfirm().then(function(result){
                    $scope.collection.remove(item);
            });

        };
        $scope.getCfsUrl= function(fsobject, store){
            if(fsObject){
                if(store){
                    return fsObject.url({store:store});
                }
                return fsObject.url();
            }
        };

}]);