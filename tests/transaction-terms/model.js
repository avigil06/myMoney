const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const tools = require('./../../utilities');

chai.use(chaiAsPromised);
const expect = chai.expect; // we are using the "expect" style of Chai

describe('Transaction Term Model Tests', () => {
  describe('Transaction Term Apply', () => {
    it('Apply New Term', () => {
      // Get a transaction
      // Assign 'dine-out' to transaction
      const args = {
        AccountId: 1
      };
      const Transaction = tools.transaction.get(args);
      const transactionWithTerm = Transaction
      .then(transaction => {
        return tools.transactionTerm.apply(transaction, 'food:dine-out');
      })
      .catch(err => {
        console.log(err);
        return false;
      });

      return expect(transactionWithTerm).to.eventually.be.true;
    });
  });

  describe('Transaction Term Remove', () => {
    it('Remove Applied Term', () => {
      const args = {
        AccountId: 1
      };
      const Transaction = tools.transaction.get(args);
      const transactionWithoutTerm = Transaction
      .then(transaction => {
        return tools.transactionTerm.revoke(transaction, 'dine-out');
      })
      .catch(() => {
        return false;
      });

      return expect(transactionWithoutTerm).to.eventually.be.true;
    });
  });
});
