console.log("Hello there. I am app.js");

angular.module('kneeper', []);// dependency injection - Angular has a lot of modules on it in documentation like ngAnimate


angular.module('kneeper')
  .controller('LinksController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

    $scope.welcomeMessage = "Hi there... Keep your knowledge in one place.";
    $scope.newLink = {};
    $scope.customUrl = $sce.trustAsResourceUrl('http://www.cnn.com');

    $scope.links = []; // To store all the links from the API request. To start off it will be an empty array.

    $scope.getLinks = function(){
    $http.get('/api/links').then(function(response){//API call and then do a callback function with response to store response.
      $scope.links = response.data;
    });
  };

    $scope.createLink = function(){
      // when there is a submit, post to this url, with stuff withing $scope.newLink and then do a callback
      $http.post('/api/links', $scope.newLink).then(function(response){
        $scope.links.push(response.data);
        $scope.newLink = {};
      });
    };

      $scope.removeLink = function(link){
        var url = '/api/links/' + link._id;
        $http.delete(url).then(function(response){
          $scope.getLinks();
        });

      };

      $scope.getLinks();


  }]);
