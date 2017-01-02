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

const getLast = args => {
  const Transaction = require('../models').Transaction;

  if (!Object.prototype.hasOwnProperty.call(args, 'AccountId')) {
    return falsePromise();
  }

  return Transaction.findOne({where: args, order: [['createdAt', 'DESC']]})
  .then(transaction => {
    return transaction;
  })
  .catch((error) => {
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

const update = (transaction, args) => {
  Object.keys(args).forEach(field => {
    transaction[field] = args[field];
  });

  return transaction.save()
  .then(newTransaction => {
    return newTransaction ? newTransaction : false;
  })
  .catch(() => {
    return false;
  });
};

const remove = transaction => {
  if (transaction === false) {
    return falsePromise();
  }

  return transaction.destroy()
  .then((status) => {
    return true;
  })
  .catch((error) => {
    return false;
  });
};

module.exports = {
  types,
  get,
  getLast,
  create,
  update,
  remove
};
