/* jslint node:true */
'use strict';

const tools = require('../utilities');

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('Transaction', {
    payee: DataTypes.STRING,
    transactionType: DataTypes.ENUM(tools.transaction.types()),
    amount: DataTypes.DECIMAL(10, 2),
    date: {
      type: DataTypes.DATE,
      validate: {
        isNumeric: true,
        min: 0
      }
    }
  });

  transaction.belongsTo(sequelize.models.Account);

  return transaction;
};
