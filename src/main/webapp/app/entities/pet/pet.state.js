(function() {
    'use strict';

    angular
        .module('masterdetailApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pet', {
            parent: 'entity',
            url: '/pet',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'masterdetailApp.pet.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pet/pets.html',
                    controller: 'PetController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pet');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('pet-detail', {
            parent: 'pet',
            url: '/pet/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'masterdetailApp.pet.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pet/pet-detail.html',
                    controller: 'PetDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pet');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Pet', function($stateParams, Pet) {
                    return Pet.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pet',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pet-detail.edit', {
            parent: 'pet-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-dialog.html',
                    controller: 'PetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pet', function(Pet) {
                            return Pet.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pet.new', {
            parent: 'pet',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-dialog.html',
                    controller: 'PetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                species: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pet', null, { reload: 'pet' });
                }, function() {
                    $state.go('pet');
                });
            }]
        })
        .state('pet.edit', {
            parent: 'pet',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-dialog.html',
                    controller: 'PetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pet', function(Pet) {
                            return Pet.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pet', null, { reload: 'pet' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pet.delete', {
            parent: 'pet',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pet/pet-delete-dialog.html',
                    controller: 'PetDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pet', function(Pet) {
                            return Pet.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pet', null, { reload: 'pet' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
