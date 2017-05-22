'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    createdAt: DataTypes.DATE,
    loginAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};