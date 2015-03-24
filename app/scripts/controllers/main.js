'use strict';

/**
 * @ngdoc function
 * @name addressbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the addressbookApp
 */
angular.module('addressbookApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
