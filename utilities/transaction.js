/* jsling node: true */
'use strict';

const types = () => {
  return [
    'income',
    'expense',
    'transfer'
  ];
};

const create = args => {
  const Transaction = require('../models').Transaction;

  return Transaction.create(args)
  .then(transaction => {
    return transaction ? transaction : false;
  })
  .catch(() => {
    return false;
  });
};

module.exports = {
  types,
  create
};
