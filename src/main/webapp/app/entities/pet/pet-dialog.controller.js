(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('PetDialogController', PetDialogController);

    PetDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pet', 'Owner'];

    function PetDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pet, Owner) {
        var vm = this;

        vm.pet = entity;
        vm.clear = clear;
        vm.save = save;
        vm.owners = Owner.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pet.id !== null) {
                Pet.update(vm.pet, onSaveSuccess, onSaveError);
            } else {
                Pet.save(vm.pet, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('masterdetailApp:petUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
