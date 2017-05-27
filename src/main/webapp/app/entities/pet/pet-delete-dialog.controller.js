(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('PetDeleteController',PetDeleteController);

    PetDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pet'];

    function PetDeleteController($uibModalInstance, entity, Pet) {
        var vm = this;

        vm.pet = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pet.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
