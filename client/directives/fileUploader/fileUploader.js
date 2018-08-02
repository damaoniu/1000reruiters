/*
* TODO add the meteor object as an scope variable to save or
* */
angular.module('hunters').directive('fileUploader',['$meteor',function($meteor){
    return{
        restrict:'E',
        templateUrl:'client/directives/fileUploader/fileUploader.html',
        scope:{
           multiple:'@',
           pop:'@',
           model:'=',
           subscribe:"@",
           plain:'@',
           replace:'@',
           buttonText:'@',
           onSave:"&",
           pattern:'@',
           crop:'@',
           object:"="

        },
        controller:"FileUploaderCtrl",
        link:function(scope,e,a){
            if(scope.pop)scope.pop=Boolean(scope.pop);
            if(scope.plain)scope.plain= Boolean(scope.plain);
            if(scope.replace)scope.replace= Boolean(scope.replace);
            scope.isMul = (scope.multiple=="true")?true:false;
            scope.buttonText = scope.buttonText||"Add File";
            scope.pattern=scope.pattern ||"'.jpg,.gif,.png,.pdf,.doc,.docx'";
            scope.crop =scope.crop?scope.$eval(scope.crop):false;

        }
    };
}]);