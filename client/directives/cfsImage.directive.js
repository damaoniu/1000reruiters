angular.module('hunters').directive('cfsImage',["$timeout","collectionFsService",function($timeout,collectionFsService){
    return {
        restrict:'E',
        scope:{
            imgId:"=",
            store:'@',
            class:"@"
        },
        replace:true,
        template:"<img class='{{class}}' ng-src='{{url}}'/>",
        link:function(scope,element,attrs){
            //TODO add a loader to initiate this until the loading is finished
            scope.url="";
            function setBack(src) {
                    /*
                    * @ 2 seconds is a save delay, waiting for better ways
                    * */
                    //file uploaded to s3 is not instant so a timer to wait for the
                    $timeout(function(){
                        if (src) {
                            scope.url = collectionFsService.getImageUrl(src);
                            console.log(src);
                            console.log(scope.url);
                        }
                        else if(scope.file){
                            scope.url=scope.file;
                        }else{
                            //this is because the ng-src won't update when src is "" empty
                            scope.url ="//:0";
                        }
                    },2000);

            }
            //This is to put the image at the end of the cycle
            setBack(scope.imgId);
            //this makes sure the image background resets after the real time update
            scope.$watch('imgId',function(n,o){
                    setBack(n);
            });
        }
    };
}]);