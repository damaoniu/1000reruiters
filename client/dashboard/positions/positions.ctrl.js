angular.module('hunters')
    .controller('PositionsCtrl',positionsCtrl);
    positionsCtrl.$inject=['$scope',"$reactive",'alertService'];

    function positionsCtrl($scope,$reactive,alertService){
        $reactive(this).attach($scope);
        var vm = this;
        vm.section='list';
        vm.removePosition = removePosition;
        vm.positionsChosen=[];
        vm.select=select;
        vm.sorts = [
            {value:'updatedAt',translate:TAPi18n.__('updatedAt')}
        ];
        vm.sort ="updatedAt"
        vm.helpers({
           positions:getPositions,
           positionsCount:getPositionsCount
        });
        vm.subscribe('dashboardPositions',positionsSub);

        function removePosition(){
            alertService.deleteConfirm().then(function(res){
               if(res){
                   //Positions.remove({
                   //    "_id":{$in:vm.positionsChosen}
                   //}
                   vm.positionsChosen.forEach(function(positionId){
                      Positions.remove(positionId);
                   });
               }
            });
        }
        function select(event,positionId){
            if(event.target.checked){
                vm.positionsChosen.push(positionId);
            }else{
             vm.positionsChosen=   _.without(vm.positionsChosen,positionId);
            }
        }
        function getPositions(){
            return Positions.find({},{
                sort:{
                    updatedAt:-1
                }
            });
        }
        function positionsSub(){
            return [
                {

                }
            ]
        }
        function getPositionsCount(){
            return Counts.get('recruiterPositionsNumber');
        }

    }