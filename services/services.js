if (nullObjectValidate(segurosServices)) {
    var segurosServices = angular.module('SegurosServices', ['SegurosServicesRest']);
}
segurosServices.service('segurosServices', ['$q', 'segurosServicesRest', function($q, segurosServicesRest) {

    this.invokeService = function(query) {
        var promise = $q.defer();

        var service = {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json;odata=verbose",
            }
        };

        if (query.origen && query.origen == "lab") {
            var url = window.ServicesConfig.getApiUrlLab(query.api, query.service);
        } else {
            var url = window.ServicesConfig.getApiUrl(query.api, query.service);
        }

        //var url = window.ServicesConfig.getApiUrl(query.api, query.service);

        if (!nullObjectValidate(query.urlParams)) {
            query.urlParams.forEach(
                function(param) {
                    url += "/" + param;
                }
            );
        }

        if (query.data) {
            url += "?type=" + query.data.type;
        }

        service.url = url;

        service.responseType = query.responseType;
        service.method = !nullObjectValidate(query.method) ? query.method : "GET";

        if (!nullObjectValidate(query.headers)) {
            service.headers = query.headers;
        }
        if (service.method == "GET") {
            service.params = query.data;
        } else {
            service.data = query.data;
        }

        $.ajax({
            url: url,
            type: "GET",
            async: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(resSeus) {

                segurosServicesRest.invoqueService(service).then(
                    function(result) {
                        promise.resolve(result.data);
                    },
                    function(error) {
                        promise.reject(error);
                    }
                );

            },
            error: function(res) {
                //logOff();
            }
        });
        return promise.promise;
    };

    this.invokeExternalService = function(query) {
        var promise = $q.defer();

        var service = {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json;odata=verbose",
            }
        };

        var url = "";

        if (!nullObjectValidate(query.api)) {
            url = window.ServicesConfig[query.api] + query.service;
        } else {
            url = window.ServicesConfig[query.api].substring(0, window.ServicesConfig[query.api].length - 1);
        }



        if (!nullObjectValidate(query.urlParams)) {
            query.urlParams.forEach(
                function(param) {
                    url += "/" + param;
                }
            );
        }

        service.url = url;
        service.responseType = query.responseType;
        service.method = !nullObjectValidate(query.method) ? query.method : "GET";

        if (!nullObjectValidate(query.headers)) {
            service.headers = query.headers;
        }

        if (service.method == "GET") {
            service.params = query.data;
        } else {
            service.data = query.data;
        }

        segurosServicesRest.invoqueService(service).then(
            function mySucces(response) {
                promise.resolve(response.data);
            },
            function myError(response) {
                return promise.reject(response);
            }
        );

        return promise.promise;
    };


    this.invoqueServiceByPost = function(query) {
        var promise = $q.defer();

        var url = window.ServicesConfig.getApiUrl(query.api, query.service);

        if (!nullObjectValidate(query.urlParams)) {
            query.urlParams.forEach(
                function(param) {
                    url += "/" + param;
                }
            );
        }


        segurosServicesRest.invoqueServiceByPost(url, query.data, query.conf).then(
            function mySucces(response) {
                promise.resolve(response.data);
            },
            function myError(response) {
                return promise.reject(response);
            }
        );

        return promise.promise;
    };


}]);