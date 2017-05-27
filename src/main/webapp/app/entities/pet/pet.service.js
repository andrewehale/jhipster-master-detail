(function() {
    'use strict';
    angular
        .module('masterdetailApp')
        .factory('Pet', Pet);

    Pet.$inject = ['$resource'];

    function Pet ($resource) {
        var resourceUrl =  'api/pets/:id';

        return $resource(resourceUrl, {}, {
            'queryByOwner': {
                url: 'api/pets/owners/:id',
                method: 'GET',
                isArray: true
            },
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
