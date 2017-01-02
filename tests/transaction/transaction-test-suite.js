const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const tools = require('./../../utilities');

chai.use(chaiAsPromised);
const expect = chai.expect; // we are using the "expect" style of Chai

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
      payee: 'Test Payee',
      transactionType: 'Something',
      amount: 100.25,
      date: new Date()
    };
    const newTransaction = tools.transaction.create(args);

    return expect(newTransaction).to.eventually.be.false;
  });

  it('STRING amount: tools.transaction.create should return false', () => {
    const args = {
      payee: 'Test Payee',
      transactionType: tools.transaction.types().pop(),
      amount: '100.25',
      date: new Date()
    };
    const newTransaction = tools.transaction.create(args);

    return expect(newTransaction).to.eventually.be.false;
  });

  it('NAN amount: tools.transaction.create should return false', () => {
    const args = {
      payee: 'Test Payee',
      transactionType: tools.transaction.types().pop(),
      amount: 'Hi',
      date: new Date()
    };
    const newTransaction = tools.transaction.create(args);

    return expect(newTransaction).to.eventually.be.false;
  });
});
