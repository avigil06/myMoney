/* jsling node: true */
'use strict';

const apply = (transaction, term) => {
  return transaction.update({transactionTerm: term})
  .then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
};

const revoke = transaction => {
  return transaction.update({transactionTerm: 'uncategorized'})
  .then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
};

module.exports = {
  apply,
  revoke
};
