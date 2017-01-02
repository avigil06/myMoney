/* jslint node:true */
'use strict';

const tools = require('../utilities');

module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('Account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    accountType: {
      type: DataTypes.ENUM(tools.account.types())
    },
    isActive: DataTypes.BOOLEAN
  });

  return account;
};
