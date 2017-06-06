'use strict';

/**
 * @ngdoc overview
 * @name galgasWebEditorApp
 * @description
 * # galgasWebEditorApp
 *
 * Main module of the application.
 */
var app = angular
  .module('galgasWebEditorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);
app
  .config(function ($routeProvider, $provide) {

    /**
     * Defining routes
     */
    $routeProvider
      .when('/', {
        name: 'home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/new', {
        name: 'newProject',
        templateUrl: 'views/project/new.html',
        controller: 'newProjectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    /**
     * Decorating $routeProvider with a getRoute function
     */
    $provide.decorator('$route', function ($delegate) {

      $delegate.getRoute = function(name) {
        var result = null;
        angular.forEach($delegate.routes, function(config, route) {
          if (config.name === name) {
            result = '#!'+route;
          }
        });
        return result;
      };

      return $delegate;
    });

  });

app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      scope: { confirmFunction: "&ngConfirmClick" },
      link: function( scope, element, attrs ){
        element.bind( 'click', function( e ){
          // message defaults to "Are you sure?"
          var message = attrs.ngConfirmClickMessage ? attrs.ngConfirmClickMessage : "Are you sure?";
          // confirm() requires jQuery
          if( confirm( message ) ) {
            scope.confirmFunction();
          }
        });
      }
    }
  }
]);

app.run(function($rootScope, $route) {
  $rootScope.views = {
    menus : {
      menu : "views/menus/menu.html"
    },
    footers : {
      footer : "views/footers/footer.html"
    }
  };

  $rootScope.links = {
    menu : {
      'home' : $route.getRoute('home'),
      'new' : $route.getRoute('newProject')
    }
  }

  console.log($rootScope.links);

});


