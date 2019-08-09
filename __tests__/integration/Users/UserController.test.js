/* eslint-disable no-undef */
const request = require('supertest');
const cleanDatabase = require('../../util/truncate');

const User = require('../../../src/app/models/users/User');
const factory = require('../../../src/databases/factories/users/UserFactory');

const app = require('../../../src/app');

describe('UserController Tests', () => {
  beforeEach(async () => cleanDatabase());

  test('should be able create a new user with sequelize - store method', async () => {
    const user = await factory.attrs('UserFactory', {
      password: '123456',
      password_confirm: '123456',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body.user).toHaveProperty('id');
  });

  test('should be able create a new user with mongoose - store method', async () => {
    const user = await factory.attrs('UserFactory', {
      password: '123456',
      password_confirm: '123456',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body.mongo).toHaveProperty('_id');
  });

  it(`should be list the users - index method`, async () => {
    const { id, name, email, created_at, updated_at } = await factory.create(
      'UserFactory'
    );

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${User.generateToken(id)}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        { id, name, email, created_at, updated_at, dataset: null },
      ])
    );
  });

  test('should be a error in Joi validation name - store method', async () => {
    const user = await factory.attrs('UserFactory', {
      name: 'ab',
      password: '123456',
      password_confirm: '123456',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
