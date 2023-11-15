var appSubscription = angular.module("subscripcionApp", ['vcRecaptcha']);

appSubscription.controller("subscripcionController", function ($scope, $http, $timeout, vcRecaptchaService) {

    var urlSubscription = "";
    // var urlBase="http://lab.segurossura.com.co";
    // var listName="EntradasDeBlog";
    // //var site="novedades";
    // var urlNews = urlBase+"/"+site+"/_api/web/lists/GetByTitle('"+listName+"')/items?$top=3&$orderby=PublishedDate desc";
    // var urlDetail=urlBase+"/"+site+"/lists/"+listName+"/post.aspx?id=";

    $scope.init = function () { };

    $scope.showErrorMsg = function (json) {
        console.error("fail");
    };

    $scope.sendSubscriptionToApi = function () {
        $http({
            method: "POST",
            url: urlSubscription,
            headers: {
                "accept": "application/json;odata=verbose"
            },
        }).then(function mySucces(response) {
            //$scope.getNewsSuccess(response.data);
        }, function myError(response) {
            console.log(response);
            $scope.showErrorMsg(response.data);
        });
    };


    $scope.sendSubscrition = function () {
        var email = $scope.email;
        if (!vcRecaptchaService.getResponse()) {
            console.log("eres un robot?");
        }

        console.log(email);
        $scope.sendSubscriptionToApi();
    };

    $scope.$watch("email", function () {
        $scope.emailValid = $scope.checkValidEmail($scope.email);
    });

    $scope.checkValidEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    $scope.$watch("gRecaptchaResponse", function () {
        //console.log($scope.gRecaptchaResponse);
        $scope.isRobot = true;
        if ($scope.gRecaptchaResponse) {
            $scope.isRobot = false;
        }

    });


    $scope.init();
});
