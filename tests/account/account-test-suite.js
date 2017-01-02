const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const tools = require('./../../utilities');

chai.use(chaiAsPromised);
const expect = chai.expect; // we are using the "expect" style of Chai

describe('AccountTypes', () => {
  it('tools.account.types should return an object', () => {
    const types = tools.account.types();

    expect(typeof types).to.be.equal('object');
  });

  it('tools.account.types should not be empty', () => {
    const types = tools.account.types();

    return expect(types).to.be.not.empty;
  });
});

describe('AccountGet', () => {
  it('ID is Int: tools.account.get should return an object', () => {
    const args = {
      id: 1
    };
    const Account = tools.account.get(args);

    return expect(Account).to.eventually.not.be.false;
  });

  it('ID is String: tools.account.get should return an object', () => {
    const args = {
      id: '1'
    };
    const Account = tools.account.get(args);

    return expect(Account).to.eventually.not.be.false;
  });

  it('ID is Null: tools.account.get should return false', () => {
    const args = {
      id: null
    };
    const Account = tools.account.get(args);

    return expect(Account).to.eventually.be.false;
  });

  it('ID is not found: tools.account.get should return false', () => {
    const args = {
      id: 1000
    };
    const Account = tools.account.get(args);

    return expect(Account).to.eventually.be.false;
  });

  it('ID not present: tools.account.get should return false', () => {
    const args = {
    };
    const Account = tools.account.get(args);

    return expect(Account).to.eventually.be.false;
  });
});

describe('AccountCreate', () => {
  it('All Args: tools.account.create should return an object', () => {
    const args = {
      name: 'Andrew Test',
      account_type: tools.account.types().pop(),
      is_active: true,
    };
    const newAccount = tools.account.create(args);

    return expect(newAccount).to.eventually.not.be.false;
  });

  it('Empty Name: tools.account.create should return false', () => {
    const args = {
      name: '',
      account_type: tools.account.types().pop(),
      is_active: true,
    };
    const newAccount = tools.account.create(args);

    return expect(newAccount).to.eventually.be.false;
  });

  it('No Name: tools.account.create should return false', () => {
    const args = {
      account_type: tools.account.types().pop(),
      is_active: true,
    };
    const newAccount = tools.account.create(args);

    return expect(newAccount).to.eventually.be.false;
  });
});

describe('AccountEdit', () => {
  it('Change Name: tools.account.update should return an object', () => {
    const args = {
      id: 1,
      name: 'Adam Test'
    };
    const Account = tools.account.get(args);

    const updatedAccount = Account.then(account => {
      return tools.account.update(account, args);
    });

    return expect(updatedAccount).to.eventually.not.be.false;
  });

  it('Bad ID: tools.account.update should return false', () => {
    const args = {
      id: 100,
      name: 'Bad Test'
    };
    const Account = tools.account.get(args);

    const updatedAccount = Account.then(account => {
      return tools.account.update(account, args);
    });

    return expect(updatedAccount).to.eventually.be.false;
  });

  it('Bad ENUM: tools.account.update should return false', () => {
    const args = {
      id: 100,
      type: 'not right'
    };
    const Account = tools.account.get(args);

    const updatedAccount = Account.then(account => {
      return tools.account.update(account, args);
    });

    return expect(updatedAccount).to.eventually.be.false;
  });
});
