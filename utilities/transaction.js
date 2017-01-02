/* jsling node: true */
'use strict';

const falsePromise = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(false);
    }, 0);
  });
};

const types = () => {
  return [
    'income',
    'expense',
    'transfer'
  ];
};

const get = args => {
  const Transaction = require('../models').Transaction;

  if (!Object.prototype.hasOwnProperty.call(args, 'id')) {
    return falsePromise();
  }

  return Transaction.findOne({where: args})
  .then(transaction => {
    return transaction ? transaction : false;
  })
  .catch(() => {
    return false;
  });
};

const create = args => {
  const Transaction = require('../models').Transaction;

  if (!Object.prototype.hasOwnProperty.call(args, 'AccountId')) {
    return falsePromise();
  }

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
  get,
  create
};
