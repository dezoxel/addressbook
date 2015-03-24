'use strict';

/**
 * @ngdoc function
 * @name addressbookApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the addressbookApp
 */
angular.module('addressbookApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
