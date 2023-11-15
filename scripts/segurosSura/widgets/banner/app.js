var appBanner = angular.module("bannerApp", []);
appBanner.controller("bannerController", function($scope, $http, $timeout) {
    var urlBase = "https://lab.segurossura.com.co";
    var listName = "Banner";
    var urlBannerList = urlBase + "/_api/web/lists/GetByTitle('" + listName + "')/items?$select=Id,Url,FileLeafRef&$filter=Publicado eq 1&$top=1";
    $scope.init = function() {
        $scope.getBanners();
    };
    $scope.showErrorMsg = function(json) {
        console.error("fail");
    };
    $scope.getBanners = function() {
        $http({
            method: "GET",
            url: urlBannerList,
            headers: {
                "accept": "application/json;odata=verbose"
            },
        }).then(function mySucces(response) {
            $scope.getBannersSuccess(response.data);
        }, function myError(response) {
            console.log(response);
            $scope.showErrorMsg(response.data);
        });
    };
    $scope.getBannersSuccess = function(json) {
        if (json && json.d && json.d.results) {
            $timeout(function() {
                $scope.banner = json.d.results[0];
                $scope.listName = listName;
            });
        }
    };
    $scope.init();
});