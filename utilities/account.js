/*  jslint node: true */
'use strict';

const types = () => {
  const resp = [
    'Checking',
    'Savings',
    'Virtual'
  ];

  return resp;
};

const get = args => {
  const Account = require('../models').Account;

  return Account.findOne({where: {
    id: args.id
  }})
  .then(account => {
    return account ? account : false;
  })
  .catch(() => {
    return false;
  });
};

const create = args => {
  const Account = require('../models').Account;

  return Account.create({
    name: args.name,
    accountType: args.account_type,
    isActive: args.is_active
  })
  .then(account => {
    return account;
  })
  .catch(() => {
    return false;
  });
};

const update = (Account, args) => {
  if (Account === false) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false);
      }, 0);
    });
  }

  Object.keys(args).forEach(field => {
    Account[field] = args[field];
  });

  return Account.save()
  .then(updated => {
    return updated;
  })
  .catch(() => {
    return false;
  });
};

module.exports = {
  types,
  get,
  create,
  update
};
