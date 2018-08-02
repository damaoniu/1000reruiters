angular.module('hunters')
    .factory('itemStorage',ItemStorage)
    .controller('SmallItemCtrl',smallItemCtrl);

    ItemStorage.$inject = ['ngStore'];
    function ItemStorage(ngStore) {
        return ngStore.model('item');
    }

    smallItemCtrl.$inject=['$scope',"$meteor","itemStorage"];
    function smallItemCtrl($scope,$meteor,itemStorage){
        var vm  = $scope;
        vm.model =vm.model||[];
        vm.addItem = addItem;
        vm.editItem = editItem;
        vm.doneEditing = doneEditing;
        vm.revertEditing = revertEditing;
        vm.removeItem = removeItem;
        function addItem() {
            var newItem = vm.newItem;
            if (_.isEmpty(newItem)) {
                return;
            }

            var item = _.extend(newItem,{
                id: itemStorage.nextId()

            });
            vm.model.push( itemStorage.create(item) );
            vm.newItem = '';
            vm.remainingCount++;
            vm.object.save();
        };

        function editItem(item) {
            item.editedItem = true;
            // Clone the original item to restore it on demand.
            vm.originalItem = angular.extend({}, item);
        };

        function doneEditing(item) {
            item.editedItem = false;
            itemStorage.update(item);
            vm.object.save();
        };
        function revertEditing(item) {
            vm.model[vm.model.indexOf(item)] = vm.originalItem;
            vm.doneEditing(vm.originalItem);
        };

        function removeItem(item) {
            vm.remainingCount -= item.completed ? 0 : 1;
            vm.model.splice(vm.model.indexOf(item), 1);
            itemStorage.destroy(item);
            vm.object.save();
        };
    }