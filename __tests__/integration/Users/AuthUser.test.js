const request = require('supertest');
const cleanDatabase = require('../../util/truncate');

const User = require('../../../src/app/models/users/User');
const factory = require('../../../src/databases/factories/users/UserFactory');

const app = require('../../../src/app');

describe('Authentication', () => {
  beforeEach(async () => cleanDatabase());

  it('shold be able authentication with valid credentials', async () => {
    const { email, password } = await factory.create('UserFactory', {
      password: '123456',
    });
    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.status).toBe(200);
  });

  test('should not be able to authenticate with invalid creadentials', async () => {
    const { email } = await factory.create('UserFactory');
    const response = await request(app)
      .post('/sessions')
      .send({ email, password: '123' });

    expect(response.status).toBe(401);
  });

  test('should return jwt token when authenticate', async () => {
    const { email, password } = await factory.create('UserFactory');

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  test('should be able to access private routes when authenticate', async () => {
    const { id } = await factory.create('UserFactory');
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${User.generateToken(id)}`);

    expect(response.status).toBe(200);
  });

  test('should not be able to access private routes when not authenticate', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(401);
  });

  test('should not be able to access private routes when token is invalid', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer test_false_token`);
    expect(response.status).toBe(401);
  });

  test('should return error if user not found', async () => {
    const { password } = await factory.create('UserFactory');
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'test@test.com', password });

    expect(response.status).toBe(400);
  });
});
