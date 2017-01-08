const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const tools = require('./../../utilities');

chai.use(chaiAsPromised);
const expect = chai.expect; // we are using the "expect" style of Chai

describe('Transaction Model Tests', () => {
  describe('TransactionType', () => {
    it('tools.transaction.types should return an object greater than 0', () => {
      const types = tools.transaction.types();

      expect(typeof types).to.be.equal('object');
      expect(types).to.be.not.empty;
    });
  });

  describe('TransactionCreate', () => {
    it('All args: tools.transaction.create should return not false', () => {
      const args = {
        AccountId: 1,
        payee: 'Test Payee',
        transactionType: tools.transaction.types().pop(),
        amount: 100.25,
        date: new Date()
      };
      const newTransaction = tools.transaction.create(args);

      return expect(newTransaction).to.eventually.not.be.false;
    });

    it('Invalid Type: tools.transaction.create should return false', () => {
      const args = {
        AccountId: 1,
        payee: 'Test Payee',
        transactionType: 'Something',
        amount: 100.25,
        date: new Date()
      };
      const newTransaction = tools.transaction.create(args);

      return expect(newTransaction).to.eventually.be.false;
    });

    it('STRING amount: tools.transaction.create should return not false', () => {
      const args = {
        AccountId: 1,
        payee: 'Test Payee',
        transactionType: tools.transaction.types().pop(),
        amount: '100.25',
        date: new Date()
      };
      const newTransaction = tools.transaction.create(args);

      return expect(newTransaction).to.eventually.not.be.false;
    });

    it('NAN amount: tools.transaction.create should return false', () => {
      const args = {
        AccountId: 1,
        payee: 'Test Payee',
        transactionType: tools.transaction.types().pop(),
        amount: 'Hi',
        date: new Date()
      };
      const newTransaction = tools.transaction.create(args);

      return expect(newTransaction).to.eventually.be.false;
    });
  });

  describe('TransactionGet', () => {
    it('First Record', () => {
      const args = {
        AccountId: 1
      };
      const Transaction = tools.transaction.get(args);

      return expect(Transaction).to.eventually.not.be.false;
    });

    it('Out of Range', () => {
      const args = {
        id: 9000
      };
      const Transaction = tools.transaction.get(args);

      return expect(Transaction).to.eventually.be.false;
    });
  });

  describe('TransactionEdit', () => {
    it('Edit Payee', () => {
      const args = {
        payee: 'New Payee'
      };
      const Transaction = tools.transaction.get({AccountId: 1});
      const updatedTransaction = Transaction
      .then(transaction => {
        return tools.transaction.update(transaction, args);
      })
      .catch(() => {
        return false;
      });

      return expect(updatedTransaction).to.eventually.not.be.false;
    });

    it('Account to Account', () => {
      const args = {
        AccountId: 2
      };
      const Transaction = tools.transaction.get({AccountId: 1});
      const updatedTransaction = Transaction
      .then(transaction => {
        return tools.transaction.update(transaction, args);
      })
      .catch(() => {
        return false;
      });

      return expect(updatedTransaction).to.eventually.not.be.false;
    });

    it('New ID out of Range', () => {
      const args = {
        id: 1,
        AccountId: 9000
      };
      const Transaction = tools.transaction.get({id: 1});
      const updatedTransaction = Transaction
      .then(transaction => {
        return tools.transaction.update(transaction, args);
      })
      .catch(() => {
        return false;
      });

      return expect(updatedTransaction).to.eventually.be.false;
    });
  });

  describe('TransactionRemove', () => {
    it('Found Record', () => {
      const args = {
        AccountId: 1
      };
      const Transaction = tools.transaction.getLast(args);
      const noTransaction = Transaction
      .then(transaction => {
        return tools.transaction.remove(transaction);
      })
      .catch(() => {
        return false;
      });

      return expect(noTransaction).to.eventually.be.true;
    });

    it('Out of Range', () => {
      const args = {
        id: 9000
      };
      const Transaction = tools.transaction.get(args);
      const noTransaction = Transaction
      .then(transaction => {
        return transaction ? tools.transaction.remove(transaction) : false;
      })
      .catch(() => {
        return false;
      });

      return expect(noTransaction).to.eventually.be.false;
    });
  });
});
