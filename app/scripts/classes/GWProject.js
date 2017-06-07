/**
 * Created by blixit on 06/06/17.
 */
'use strict';

  var GWProject = function()
  {

    /**
     * properties
     */
    var name_ = '';
    var version_ = [];
    var targets_ = [];
    var properties_ = {};

    /**
     * container
     * @type {{}}
     */
    var self = {};

    //Name
    self.getName = function () {
      return name_;
    };
    self.setName = function (name) {
      name_ = name;
      return self;
    };

    //Version
    self.getVersion = function () {
      return version_;
    };
    self.setVersion = function (major, minor, revision) {
      version_ = [parseInt(major), parseInt(minor), parseInt(revision)];
      return self;
    };

    //Targets
    self.getTargets = function () {
      return targets_;
    };
    self.setTargets = function (targets) {
      targets_ = targets;
      return self;
    };
    self.cleanTargets = function () {
      targets_ = [];
      return self;
    };
    self.addTarget = function (target) {
      if (targets_.indexOf(target) < 0)
        targets_.push(target);
      return self;
    };
    self.removeTarget = function (target) {
      var index = targets_.indexOf(target);
      if (index > -1)
        targets_.splice(index, 1);

      return self;
    };

    //Properties
    self.getProperties = function () {
      return properties_;
    };
    self.setProperties = function (properties) {
      properties_ = properties;
      return self;
    };
    self.cleanProperties = function () {
      properties_ = {};
      return self;
    };
    self.getProperty = function (key) {
      return properties_[key];
    };
    self.setProperty = function (key, value) {
      properties_[key] = value;
      return self;
    };
    self.removeProperty = function (key) {
      if (properties_[key] != undefined)
        delete properties_[key];
      return self;
    };


    return self;
  };