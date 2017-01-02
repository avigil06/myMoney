/*jslint node:true */
'use strict';

module.exports = function(sequelize, DataTypes) {
  var transactionTerm  = sequelize.define("Transaction Term", {
    term: DataTypes.STRING,
    type: DataTypes.STRING,
  });

  transactionTerm.belongsTo(sequelize.models.Transaction);

  return transactionTerm;
};
