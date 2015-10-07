console.log("Hello there. I am app.js");

angular.module('kneeper', ['ngCookies']);// dependency injection - Angular has a lot of modules on it in documentation like ngAnimate


angular.module('kneeper')
  .controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

    $scope.welcomeMessage = "Hi there... Keep your knowledge in one place.";
    $scope.newUser = {};
    $scope.logInUser = {};
    $scope.currentUserLibraries;
    $scope.newLibrary = {name: '', links:[{}]};

    $scope.getUsers = function(){
      $http.get('/api/users').then(function(response){
        $scope.users = response.data;
      });
    };
    $scope.getUsers();

    $scope.createUser = function(){
      $http.post('/api/users', $scope.newUser).then(function(response){
        $scope.users.push(response.data);
        $scope.newUser = {};
      });
    };

    $scope.getUser = function(){
      $http({
        url: '/api/users/data',
        method: 'get',
        headers:{
          token: $scope.token
        },
      }).then(function(response){
        $scope.currentUserLibraries = response.libraries;
      });
    }
    $scope.getUser();

      // $scope.removeLink = function(link){
      //   var url = '/api/links/' + link._id;
      //   $http.delete(url).then(function(response){
      //     $scope.getLinks();
      //   });
      //
      // };
      //
      // $scope.getLinks();
      $scope.createLibrary = function(){
        $http({
          url: '/api/libraries',
          method: 'post',
          headers:{
            token: $scope.token
          },
          data: $scope.newLibrary
        }).then(function(response){
          $scope.getUsers();
          $scope.newLibrary = {name: '', items:[{}]};
        });
      };

      $scope.addLink = function(){
        $scope.newLibrary.links.push({});
      };

      $scope.obtainToken = function(){
        $http.post("/api/users/authentication_token", $scope.logInUser).then(function(response){
          $scope.token = response.data.token;
          $cookies.put('token', $scope.token);
          location.reload();
        });
      };

      $scope.logOut = function(){
        $cookies.remove('token');
        $scope.token = $cookies.get('token');
        location.reload();
      };

      $scope.token = $cookies.get('token');


  }]);
