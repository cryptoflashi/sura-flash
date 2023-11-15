if (nullObjectValidate(segurosServicesRest)) {
    var segurosServicesRest = angular.module('SegurosServicesRest', []);
}


segurosServicesRest.factory('segurosServicesRest', ['$templateCache', '$http', function($templateCache, $http) {
    return {

        zeusToken: function() {
            return $http({
                /*
                					headers: { "Content-Type": "application/json" },
                		            method: "POST",
                		            url: "Default.aspx/GetJsonUser",
                		            responseType: 'json',
                		           */

                method: "POST",
                url: "Default.aspx/Testing",
                headers: {
                    "Content-Type": "application/json"
                },
                dataType: 'json'
                    //cache: $templateCache
            });
        },

        invoqueService: function(request) {
            return $http(request);
        },

        invoqueServiceByPost: function(url, data, conf) {
            return $http.post(url, data, conf);
        }
    }
}]);