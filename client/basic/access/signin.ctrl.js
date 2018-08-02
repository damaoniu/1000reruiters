app.controller('SigninCtrl',signinController);
 signinController.$inject=['$scope','$meteor','$alert','$state'];
 function signinController($scope,$meteor,$alert,$state){
     var vm = $scope;
     var that = this;
     that.linkedInSignin=function(){

     }
     that.googleSignin=function(){
         alert('aha');
         $meteor.loginWithGoolge();
     }
     that.signin=function(form,user){
        $meteor.loginWithPassword(user.email,user.password).then(
            function(){
                $state.go('dashboard.main');
            },
            function(err){
                $alert({
                    title: TAPi18n.__('app.loginError'),
                    content: err.message,
                    type:'warning'
                });

            }
        );
     }
 }