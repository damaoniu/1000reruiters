app.controller('ForgotPassCtrl',forgotPassController);
    forgotPassController.$inject=['$scope','$meteor','$alert'];
    function forgotPassController($scope,$meteor,$alert){
        var vm = $scope;
        vm.sendEmail=function(email){
            $meteor.call('sendResetEmail',vm.email,function(response){
                if(response){
                    $alert({
                        title:TAPi18n.__('app.emailsent'),
                        content:TAPi18n.__('app.emailsent'),
                        type:'success'
                    });
                }else{
                    $alert({
                       title:'failed',
                        content:TAPi18n.__('app.accountnotfound'),
                        type:'warn'
                    });
                }
            });
        }
    }
