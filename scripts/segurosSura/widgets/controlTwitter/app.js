var appTwitter = angular.module("twitterApp", ["ngSanitize"]);
appTwitter.controller("twitterController", function($scope, $http, $timeout) {
    var urlBase = window.ServicesConfig.urlBase;
    //var urlBase = "https://lab.segurossura.com.co";
    //  var listNameBenefits = "LinksTwitter";
    //  var urlLinksTweets = urlBase + "/_api/web/lists/GetByTitle('" + listNameBenefits + "')/items?$select=Id,Title&$filter=Publicado eq 1&$top=2";
    //var urlDetailBenefits=urlBase+"/beneficios/lists/"+listNameBenefits+"/post.aspx?id=";
    var urlEmbebedSearch = "https://publish.twitter.com/oembed?lang=es&url=";
    $scope.TweetsArray = new Array();
    $scope.init = function() {
        $scope.getTweets();
    };
    $scope.showErrorMsg = function(json) {
        console.error("fail");
    };
    $scope.openTweet = function(scope) {
        console.log(scope.tweet);
        window.open(scope.tweet.url, '_blank', '');
    };
    $scope.getTweets = function() {
        $http({
            method: "GET",
            url: $scope.urlLinksTweets,
            headers: {
                "accept": "application/json;odata=verbose"
            },
        }).then(function mySucces(response) {
            $scope.getTweetsSuccess(response.data);
        }, function myError(response) {
            console.log(response);
            $scope.showErrorMsg(response.data);
        });
    };
    $scope.getTweetsSuccess = function(json) {
        if (json && json.d && json.d.results) {
            angular.forEach(json.d.results, function(value, key) {
                //this.push(key + ': ' + value);
                $scope.getTweetFromUrl(value);
            });
        }
    };
    $scope.getTweetFromUrl = function(json) {
        if (json.Title) {
            var url = urlEmbebedSearch + json.Title;
            $.ajax({
                url: url,
                dataType: "jsonp",
                success: function(data) {
                    $scope.getTweetFromUrlSuccess(data);
                    console.log(data);
                }
            });
        }
    };
    $scope.getTweetFromUrlSuccess = function(json) {
        if (json) {
            var $div = $('<div>').html(json.html);
            $div.find("a").attr("target", "_blank");
            json.html = $div.html();
            $timeout(function() {
                $scope.TweetsArray.push(json);
            });
        }
    };
    $scope.$watch('typeTweet', function() {
        if ($scope.typeTweet) {
            $scope.urlLinksTweets = urlBase + "/_api/web/lists/GetByTitle('" + $scope.typeTweet + "')/items?$select=Id,Title&$filter=Publicado eq 1&$top=2";
            // console.log($scope.typeTweet); 
            $scope.init();
        }
    });
    $scope.$watch('configInit', function() {
        if ($scope.configInit) {
            $scope.urlLinksTweets = urlBase + "/_api/web/lists/GetByTitle('" + $scope.configInit.typeTweet + "')/items?$select=Id,Title&$filter=Publicado eq 1&$top=" + $scope.configInit.top;
            $scope.init()
        }
    });
    //$scope.init();
});