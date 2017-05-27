(function() {
    'use strict';
    angular
        .module('masterdetailApp')
        .factory('Owner', Owner);

    Owner.$inject = ['$resource'];

    function Owner ($resource) {
        var resourceUrl =  'api/owners/:id';

        return $resource(resourceUrl, {}, {
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
