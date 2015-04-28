(function(angular) {
  'use strict';

  angular.module('addressbookApp')
    .service('mongolabAdapter', function() {
      var addressbook = this;


      //------------------------------------------------------------------------//
      // PUBLIC
      //------------------------------------------------------------------------//
      addressbook.all = function() {
        throw new Error('addressbook.all: not implemented');
      };

      addressbook.find = function(id) {
        throw new Error('addressbook.find: not implemented');
      };

      addressbook.destroy = function(id) {
        throw new Error('addressbook.destroy: not implemented');
      };

      addressbook.add = function(entry) {
        throw new Error('addressbook.add: not implemented');
      };

      addressbook.update = function(entry) {
        throw new Error('addressbook.update: not implemented');
      };

      addressbook.setPredefinedList = function(list) {
        _predefinedList = list;
      };

      //------------------------------------------------------------------------//
      // PRIVATE
      //------------------------------------------------------------------------//
      var _predefinedList = [];

      function _init() {
      }

      //------------------------------------------------------------------------//
      // INIT
      //------------------------------------------------------------------------//
      _init();
    });

})(angular);
