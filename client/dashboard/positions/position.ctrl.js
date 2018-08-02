angular.module('hunters')
    .controller('PositionCtrl',positionEditCtrl);
    positionEditCtrl.$inject=['$scope','$reactive','$meteor','$stateParams'];
    function positionEditCtrl($scope,$reactive,$meteor,$stateParams){
        $reactive(this).attach($scope);

        var vm  = this;
        vm.savePosition = savePosition;
        vm.positionEditing = {};
        initPosition();
        this.helpers({
           //positionEditing:initPosition()
        });
        vm.autorun(function(vm){
        });
        function initPosition(){
            var id = $stateParams.positionId;
            console.log(id);
            if(id){
                vm.positionEditing=$meteor.object(Positions,id,false);
            }else{
             var newPosition = {
                 owner:Meteor.userId(),
                 status:'new',
                 updatedAt:new Date(),
                 createdAt:new Date(),
                 recruiters:[],
                 candidates:[],
                 salary:{
                     min:50,
                     max:100
                 }
                 };
                 Positions.insert(newPosition,function(err,res){
                     vm.positionEditing=$meteor.object(Positions,res,false);
               });
            }
        }
        function savePosition(){
            vm.positionEditing.save();
        }


    }