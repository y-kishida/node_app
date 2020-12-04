'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    pass: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    mail: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Board);
  };
  return User;
};