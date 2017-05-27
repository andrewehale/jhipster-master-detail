(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .controller('PetDetailController', PetDetailController);

    PetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pet', 'Owner'];

    function PetDetailController($scope, $rootScope, $stateParams, previousState, entity, Pet, Owner) {
        var vm = this;

        vm.pet = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('masterdetailApp:petUpdate', function(event, result) {
            vm.pet = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
