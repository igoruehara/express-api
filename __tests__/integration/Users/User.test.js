/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const cleanDatabase = require('../../util/truncate');
const factory = require('../../../src/databases/factories/users/UserFactory');

describe('User Model', () => {
  beforeEach(async () => cleanDatabase());

  it(`should able to register a new user`, async () => {
    const user = await factory.create('UserFactory', { password: '123456' });
    expect(user).toHaveProperty('id');
  });

  it(`should be able create password hash`, async () => {
    const user = await factory.create('UserFactory', { password: '123456' });
    const compareHash = await bcrypt.compare('123456', user.password_hash);
    expect(compareHash).toBe(true);
  });
});
