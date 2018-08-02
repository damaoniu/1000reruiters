angular.module('hunters').controller("ImageGalleryCtrl",["$scope","$meteor","$filter","$timeout",function($scope,$meteor,$filter,$timeout){
    $scope.images= $scope.$meteorCollectionFS(Images,false,Images);
    $scope.remove=function(img){
           $scope.images.remove(img).then(function(err){
               $scope.imageArray= _.without($scope.imageArray,img);
               $timeout(function(){
                   console.log('saving');
                   $scope.onChange({stay:true});
               },0);
           });
    };
    $scope.getImageUrl=function(img){
        var image= Images.findOne({_id: img});
        console.log('image gallery');
        if(image){
            return image.url();
        }
    };
}]);