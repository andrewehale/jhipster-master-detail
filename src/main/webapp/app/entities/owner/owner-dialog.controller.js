(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('OwnerDialogController', OwnerDialogController);

    OwnerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Owner', 'Pet'];

    function OwnerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Owner, Pet) {
        var vm = this;

        vm.owner = entity;
        vm.clear = clear;
        vm.save = save;
        vm.pets = Pet.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.owner.id !== null) {
                Owner.update(vm.owner, onSaveSuccess, onSaveError);
            } else {
                Owner.save(vm.owner, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('masterdetailApp:ownerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
