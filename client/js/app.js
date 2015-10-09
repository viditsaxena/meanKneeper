console.log("Hello there. I am app.js");

angular.module('kneeper', ['ngCookies']);// dependency injection - Angular has a lot of modules on it in documentation like ngAnimate


angular.module('kneeper')
  .controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
    console.log("yo!");
    $scope.welcomeMessage = "Hi there... Keep your knowledge in one place.";
    $scope.newUser = {};
    $scope.logInUser = {};
    $scope.currentUserLibraries;
    // $scope.currentUserLinks;
    $scope.newLibrary = {name: '', links:[{}]};
    $scope.newLink = {url: '', comment:''};

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
      console.log("im being called");
      $http({
        url: '/api/users/data',
        method: 'get',
        headers:{
          token: $scope.token
        },
      }).then(function(response){
        // console.log('response', response);
        $scope.currentUserLibraries = response.data.libraries;
      });
    }


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
          console.log('response', response);

          $scope.getUsers();
          $scope.newLibrary = {name: '', links:[{}]};
        });
        location.reload();
      };

      // $scope.addLink = function(library){
      //   var id = library._id;
      //   $http({
      //     url:'/api/libraries/' + id + '/links',
      //     // url:'/api/links',
      //     method: 'post',
      //     headers:{
      //       token:$scope.token
      //       // id:library._id
      //     },
      //     data: $scope.newLink
      //   }).then(function(response){
      //     console.log("Link", response);
      //     $scope.getUser();
      //     $scope.newLink = {url:'', comment:''};
      //   });
      // };

      $scope.obtainToken = function(){
        $http.post("/api/users/authentication_token", $scope.logInUser).then(function(response){
          $scope.token = response.data.token;
          $cookies.put('token', $scope.token);
          $scope.getUser();
          location.reload();
        });
      };

      $scope.logOut = function(){
        $cookies.remove('token');
        $scope.token = $cookies.get('token');
        location.reload();
      };
      $scope.token = $cookies.get('token');
      $scope.getUser();



  }]);
