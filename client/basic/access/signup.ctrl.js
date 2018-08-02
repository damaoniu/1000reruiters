app.controller('SignupCtrl',signupController);
    signupController.$inject=['$scope','$meteor','$alert','$state'];
    function signupController($scope,$meteor,$alert,$state){
        var vm = $scope;
        var that =this;
        vm.user={profile:{recruiter:true}};
        vm.signup=function(form,user){
            if(that.signupForm.$invalid){
                $alert({
                    tilte:'Warning',
                    content:TAPi18n.__('fillall'),
                    type:'alert'
                });
                return;
            }
            $meteor.call('newUser',vm.user).then(function(response){
                if(response){
                    if(Roles.userIsInRole(response,['seeker'],'basic')){
                        $state.go('dashbaord');
                    }
                    $state.go('dashbaord.main');
                }
            },function(err){
                $alert({
                    tilte:'Warning',
                    content:err.message,
                    type:'alert'
                });
            });
        };
        vm.chooseRecruiter=function(){
            vm.user.profile.recuiter=true;
            vm.user.profile.seeker=false;
        }
        vm.chooseSeeker=function(){
            vm.user.profile.seeker=true;
            vm.user.profile.recruiter=false;
        }


    }