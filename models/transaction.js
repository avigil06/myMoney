/* jslint node:true */
'use strict';

const tools = require('../utilities');

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('Transaction', {
    payee: DataTypes.STRING,
    transactionType: {
      type: DataTypes.ENUM(tools.transaction.types()),
      validate: {
        isIn: [
          tools.transaction.types()
        ]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    date: DataTypes.DATE
  });

  transaction.belongsTo(sequelize.models.Account);

  return transaction;
};
