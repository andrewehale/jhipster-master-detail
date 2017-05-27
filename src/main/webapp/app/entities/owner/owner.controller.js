(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('OwnerController', OwnerController);

    OwnerController.$inject = ['Owner'];

    function OwnerController(Owner) {

        var vm = this;

        vm.owners = [];

        loadAll();

        function loadAll() {
            Owner.query(function(result) {
                vm.owners = result;
                vm.searchQuery = null;
            });
        }
    }
})();
