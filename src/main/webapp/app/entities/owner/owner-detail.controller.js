(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('OwnerDetailController', OwnerDetailController);

    OwnerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Owner', 'Pet'];

    function OwnerDetailController($scope, $rootScope, $stateParams, previousState, entity, Owner, Pet) {
        var vm = this;

        vm.owner = entity;
        vm.previousState = previousState.name;

        vm.pets = [];

        loadAll();

        function loadAll() {
            Pet.queryByOwner({id: vm.owner.id}, function(result) {
                vm.pets = result;
                vm.searchQuery = null;
            });
        }

        var unsubscribe = $rootScope.$on('masterdetailApp:ownerUpdate', function(event, result) {
            vm.owner = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
