(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('PetController', PetController);

    PetController.$inject = ['Pet'];

    function PetController(Pet) {

        var vm = this;

        vm.pets = [];

        loadAll();

        function loadAll() {
            Pet.query(function(result) {
                vm.pets = result;
                vm.searchQuery = null;
            });
        }
    }
})();
