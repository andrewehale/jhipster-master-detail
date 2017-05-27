(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('OwnerDeleteController',OwnerDeleteController);

    OwnerDeleteController.$inject = ['$uibModalInstance', 'entity', 'Owner'];

    function OwnerDeleteController($uibModalInstance, entity, Owner) {
        var vm = this;

        vm.owner = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Owner.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
